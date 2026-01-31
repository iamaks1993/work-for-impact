<template>
  <div class="overflow-x-auto">
    <table class="min-w-full border-separate border-spacing-0">
      <thead
        class="bg-base-200 text-left text-sm font-semibold uppercase tracking-wide text-secondary"
      >
        <tr>
          <th v-for="column in columns" :key="column.key" class="whitespace-nowrap px-4 py-2.5">
            <button
              v-if="column.sortable"
              class="inline-flex uppercase items-center gap-1"
              type="button"
              @click="emitSort(column.sortKey)"
            >
              {{ column.label }}
              <span v-if="sortKey === column.sortKey">{{ sortDir === 'asc' ? '▲' : '▼' }}</span>
            </button>
            <span v-else>{{ column.label }}</span>
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-base-300 text-base text-base-content">
        <tr v-if="loading">
          <td class="px-4 py-6 text-center text-secondary" colspan="10">Loading users...</td>
        </tr>
        <tr v-else-if="error">
          <td class="px-4 py-6 text-center text-secondary" colspan="10">{{ error }}</td>
        </tr>
        <tr v-else-if="users.length === 0">
          <td class="px-4 py-6 text-center text-secondary" colspan="10">No users loaded yet.</td>
        </tr>
        <tr v-else v-for="user in users" :key="user.id">
          <td class="whitespace-nowrap px-4 py-3 text-sm font-semibold text-secondary">
            #{{ user.id }}
          </td>
          <td class="px-4 py-3">
            <div class="h-9 w-9 overflow-hidden rounded-full border border-base-300 bg-base-200">
              <img
                class="h-full w-full object-cover"
                :src="user.image"
                :alt="`${user.firstName} ${user.lastName}`"
                loading="lazy"
              />
            </div>
          </td>
          <td class="whitespace-nowrap px-4 py-3">
            <RouterLink
              class="text-base font-semibold underline text-base-content transition hover:text-primary"
              :to="{ name: 'user-detail', params: { id: user.id } }"
            >
              {{ user.firstName }} {{ user.lastName }}
            </RouterLink>
          </td>
          <td class="whitespace-nowrap px-4 py-3">
            <span
              class="inline-flex items-center rounded-full bg-base-200 px-2.5 py-1 text-xs font-semibold text-secondary capitalize"
            >
              {{ user.role || 'User' }}
            </span>
          </td>
          <td class="whitespace-nowrap px-4 py-3 text-sm text-secondary">
            {{ user.birthDate }}
          </td>
          <td class="whitespace-nowrap px-4 py-3 text-sm text-secondary">
            {{ user.age }}
          </td>
          <td class="whitespace-nowrap px-4 py-3 text-sm text-secondary capitalize">
            {{ user.gender }}
          </td>
          <td class="whitespace-nowrap px-4 py-3 text-sm text-secondary">
            {{ user.email }}
          </td>
          <td class="whitespace-nowrap px-4 py-3 text-sm text-secondary">
            {{ user.phone }}
          </td>
          <td class="whitespace-nowrap px-4 py-3 text-sm">
            <button
              class="text-sm font-semibold text-red-600 hover:text-red-700"
              type="button"
              @click="emitDelete(user)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
defineProps({
  users: {
    type: Array,
    default: () => [],
  },
  loading: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: '',
  },
  sortKey: {
    type: String,
    default: '',
  },
  sortDir: {
    type: String,
    default: 'asc',
  },
})

const emit = defineEmits(['sort', 'delete'])

const emitSort = (key) => {
  emit('sort', key)
}

const emitDelete = (user) => {
  emit('delete', user)
}

const columns = [
  { key: 'id', label: 'ID', sortable: true, sortKey: 'id' },
  { key: 'profile', label: 'Profile' },
  { key: 'name', label: 'Name', sortable: true, sortKey: 'firstName' },
  { key: 'role', label: 'Role', sortable: true, sortKey: 'role' },
  { key: 'birthDate', label: 'Birth date', sortable: true, sortKey: 'birthDate' },
  { key: 'age', label: 'Age', sortable: true, sortKey: 'age' },
  { key: 'gender', label: 'Gender', sortable: true, sortKey: 'gender' },
  { key: 'email', label: 'Email', sortable: true, sortKey: 'email' },
  { key: 'phone', label: 'Phone', sortable: true, sortKey: 'phone' },
  { key: 'actions', label: 'Actions' },
]
</script>
