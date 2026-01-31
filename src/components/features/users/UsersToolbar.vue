<template>
  <div
    class="flex flex-col gap-3 border-b border-base-300 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
  >
    <div>
      <p class="text-base font-semibold text-base-content">Users list</p>
    </div>
    <div class="w-full sm:w-auto">
      <div class="grid grid-cols-2 gap-2 sm:flex sm:items-center sm:gap-2">
        <input
          v-model="localSearch"
          type="search"
          placeholder="Search users..."
          class="col-span-2 h-10 w-full sm:col-span-1 sm:w-64 rounded-md border border-base-300 bg-base-100 px-3 text-sm text-base-content placeholder:text-secondary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
        />
        <select
          v-model="localRole"
          class="h-10 w-full rounded-md border border-base-300 bg-base-100 px-2 text-sm text-base-content focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
        >
          <option value="">All roles</option>
          <option value="admin">Admin</option>
          <option value="moderator">Moderator</option>
          <option value="user">User</option>
        </select>
        <select
          v-model="localGender"
          class="h-10 w-full rounded-md border border-base-300 bg-base-100 px-2 text-sm text-base-content focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
        >
          <option value="">All genders</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <button
          class="col-span-2 h-10 w-full cursor-pointer rounded-md bg-primary px-4 text-sm font-semibold text-base-100 transition hover:opacity-90 sm:col-span-1 sm:w-auto sm:min-w-[120px]"
          type="button"
          @click="emit('create')"
        >
          Add user
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  searchTerm: {
    type: String,
    default: '',
  },
  selectedRole: {
    type: String,
    default: '',
  },
  selectedGender: {
    type: String,
    default: '',
  },
})

const emit = defineEmits([
  'update:searchTerm',
  'update:selectedRole',
  'update:selectedGender',
  'create',
])

const localSearch = computed({
  get: () => props.searchTerm,
  set: (value) => emit('update:searchTerm', value),
})

const localRole = computed({
  get: () => props.selectedRole,
  set: (value) => emit('update:selectedRole', value),
})

const localGender = computed({
  get: () => props.selectedGender,
  set: (value) => emit('update:selectedGender', value),
})
</script>
