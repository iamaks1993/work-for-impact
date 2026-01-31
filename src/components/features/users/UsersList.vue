<template>
  <div class="flex flex-col gap-3">
    <div class="w-full overflow-hidden rounded-md border border-base-300 bg-base-100 shadow-sm">
      <UsersToolbar
        v-model:searchTerm="searchTerm"
        v-model:selectedRole="selectedRole"
        v-model:selectedGender="selectedGender"
        @create="openCreate"
      />
      <UsersTable
        :users="usersStore.users"
        :loading="usersStore.loading"
        :error="usersStore.error"
        :sort-key="sortKey"
        :sort-dir="sortDir"
        :updated-id="updatedId"
        @sort="handleSort"
        @delete="handleDelete"
        @edit="openEdit"
      />
      <div class="border-t border-base-300 px-3 py-1">
        <UiPagination v-model:page="page" :total="usersStore.total" :page-size="pageSize" />
      </div>
    </div>

    <UserFormModal
      v-if="isModalOpen"
      :form-data="formData"
      :is-edit="Boolean(editingUserId)"
      @close="closeModal"
      @save="saveUser"
    />
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import UserFormModal from '@/components/features/users/UserFormModal.vue'
import UsersTable from '@/components/features/users/UsersTable.vue'
import UsersToolbar from '@/components/features/users/UsersToolbar.vue'
import UiPagination from '@/components/ui/UiPagination.vue'
import { useUsersStore } from '@/stores/users'
import { calculateAge } from '@/utils/dateUtils'

const pageSize = 10
const page = ref(1)
const searchTerm = ref('')
const selectedRole = ref('')
const selectedGender = ref('')
const sortKey = ref('id')
const sortDir = ref('asc')
const usersStore = useUsersStore()
const skip = computed(() => (page.value - 1) * pageSize)
const pendingSearch = ref(false)

const fetchPage = async () => {
  await usersStore.fetchUsers({
    limit: pageSize,
    skip: skip.value,
    q: searchTerm.value.trim(),
    sortBy: sortKey.value,
    order: sortDir.value,
  })
  usersStore.applyFilters({
    role: selectedRole.value,
    gender: selectedGender.value,
  })
}

onMounted(fetchPage)

watch(page, () => {
  if (!pendingSearch.value) fetchPage()
})

let debounceId = 0
watch(searchTerm, () => {
  pendingSearch.value = true
  page.value = 1
  window.clearTimeout(debounceId)
  debounceId = window.setTimeout(() => {
    fetchPage()
    pendingSearch.value = false
  }, 300)
})

watch([selectedRole, selectedGender], () => {
  const role = selectedRole.value
  const gender = selectedGender.value
  if (!role && !gender) {
    fetchPage()
    return
  }
  usersStore.applyFilters({ role, gender })
})

const handleSort = (key) => {
  if (sortKey.value === key) {
    sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc'
  } else {
    sortKey.value = key
    sortDir.value = 'asc'
  }
  page.value = 1
  fetchPage()
}

const handleDelete = (user) => {
  const confirmed = window.confirm(`Delete ${user.firstName} ${user.lastName}?`)
  if (!confirmed) return
  usersStore.deleteUser(user.id)
}

const isModalOpen = ref(false)
const editingUserId = ref(null)
const updatedId = ref(null)
const formFields = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  phone: '',
  gender: 'female',
  role: 'user',
  birthDate: '',
  image: 'https://dummyjson.com/icon/abc123/150',
}
const formData = ref(formFields)

const openCreate = () => {
  editingUserId.value = null
  formData.value = {
    ...formFields,
  }
  isModalOpen.value = true
}

const openEdit = (user) => {
  editingUserId.value = user.id
  formData.value = {
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    username: user.username || '',
    email: user.email || '',
    phone: user.phone || '',
    gender: user.gender || 'female',
    role: user.role || 'user',
    birthDate: user.birthDate || '',
    image: user.image,
  }
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
}

const saveUser = (data) => {
  const computedAge = data.birthDate ? calculateAge(data.birthDate) : 0
  const nextId = usersStore.apiTotal + 1
  const payload = {
    id: editingUserId.value ?? nextId,
    ...data,
    age: computedAge,
    company: { title: 'New hire', name: 'Independent' },
    address: {
      address: 'N/A',
      city: 'N/A',
      state: 'N/A',
      coordinates: { lat: 0, lng: 0 },
    },
    hair: { color: 'N/A', type: 'N/A' },
    bank: { cardType: 'N/A', cardNumber: 'N/A', cardExpire: 'N/A' },
    crypto: { wallet: 'N/A' },
    ip: '0.0.0.0',
    macAddress: '00:00:00:00:00:00',
    university: 'N/A',
    weight: 0,
    height: 0,
    bloodGroup: 'N/A',
    eyeColor: 'N/A',
  }

  if (editingUserId.value) {
    usersStore.updateUser(payload)
    updatedId.value = payload.id
    window.clearTimeout(updatedTimeout)
    updatedTimeout = window.setTimeout(() => {
      updatedId.value = null
    }, 800)
  } else {
    usersStore.addUser(payload)
  }
  closeModal()
}

let updatedTimeout = 0
</script>
