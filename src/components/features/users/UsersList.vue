<template>
  <div class="flex flex-col gap-3">
    <div class="w-full overflow-hidden rounded-md border border-base-300 bg-base-100 shadow-sm">
      <UsersToolbar
        v-model:searchTerm="searchTerm"
        v-model:selectedRole="selectedRole"
        v-model:selectedGender="selectedGender"
      />
      <UsersTable
        :users="usersStore.users"
        :loading="usersStore.loading"
        :error="usersStore.error"
        :sort-key="sortKey"
        :sort-dir="sortDir"
        @sort="handleSort"
      />
      <div class="border-t border-base-300 px-3 py-1">
        <UiPagination v-model:page="page" :total="usersStore.total" :page-size="pageSize" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import UsersTable from '@/components/features/users/UsersTable.vue'
import UsersToolbar from '@/components/features/users/UsersToolbar.vue'
import UiPagination from '@/components/ui/UiPagination.vue'
import { useUsersStore } from '@/stores/users'

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
  fetchPage()
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
</script>
