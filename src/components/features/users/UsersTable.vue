<template>
  <div class="overflow-x-auto">
    <table class="min-w-full border-separate border-spacing-0">
      <thead
        class="bg-base-200 text-left text-sm font-semibold uppercase tracking-wide text-secondary"
      >
        <tr>
          <th class="whitespace-nowrap px-4 py-2.5">ID</th>
          <th class="whitespace-nowrap px-4 py-2.5">Profile</th>
          <th class="whitespace-nowrap px-4 py-2.5">Name</th>
          <th class="whitespace-nowrap px-4 py-2.5">Role</th>
          <th class="whitespace-nowrap px-4 py-2.5">Birth date</th>
          <th class="whitespace-nowrap px-4 py-2.5">Age</th>
          <th class="whitespace-nowrap px-4 py-2.5">Gender</th>
          <th class="whitespace-nowrap px-4 py-2.5">Email</th>
          <th class="whitespace-nowrap px-4 py-2.5">Phone</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-base-300 text-base text-base-content">
        <tr v-if="loading">
          <td class="px-4 py-6 text-center text-secondary" colspan="9">Loading users...</td>
        </tr>
        <tr v-else-if="error">
          <td class="px-4 py-6 text-center text-secondary" colspan="9">{{ error }}</td>
        </tr>
        <tr v-else-if="users.length === 0">
          <td class="px-4 py-6 text-center text-secondary" colspan="9">No users loaded yet.</td>
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
            <p class="text-base font-semibold text-base-content">
              {{ user.firstName }} {{ user.lastName }}
            </p>
            <p class="text-sm text-secondary">@{{ user.username }}</p>
          </td>
          <td class="whitespace-nowrap px-4 py-3">
            <span
              class="inline-flex items-center rounded-full bg-base-200 px-2.5 py-1 text-xs font-semibold text-secondary"
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
          <td class="whitespace-nowrap px-4 py-3 text-sm text-secondary">
            {{ user.gender }}
          </td>
          <td class="whitespace-nowrap px-4 py-3 text-sm text-secondary">
            {{ user.email }}
          </td>
          <td class="whitespace-nowrap px-4 py-3 text-sm text-secondary">
            {{ user.phone }}
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
})
</script>
