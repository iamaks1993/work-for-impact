<template>
  <div class="flex flex-wrap items-center justify-between gap-4 border-b border-base-300 px-4 py-3">
    <div>
      <p class="text-base font-semibold text-base-content">Users list</p>
    </div>
    <div class="flex flex-wrap items-center gap-2">
      <input
        v-model="localSearch"
        type="search"
        placeholder="Search users..."
        class="h-10 w-64 rounded-md border border-base-300 bg-base-100 px-3 text-sm text-base-content placeholder:text-secondary focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
      />
      <select
        v-model="localRole"
        class="h-10 rounded-md border border-base-300 bg-base-100 px-2 text-sm text-base-content focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
      >
        <option value="">All roles</option>
        <option value="admin">Admin</option>
        <option value="moderator">Moderator</option>
        <option value="user">User</option>
      </select>
      <select
        v-model="localGender"
        class="h-10 rounded-md border border-base-300 bg-base-100 px-2 text-sm text-base-content focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/30"
      >
        <option value="">All genders</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
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

const emit = defineEmits(['update:searchTerm', 'update:selectedRole', 'update:selectedGender'])

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
