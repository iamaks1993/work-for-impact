<template>
  <section class="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-6 sm:px-6 lg:px-10">
    <header class="flex items-center justify-between gap-3">
      <div>
        <h1 class="text-2xl font-semibold text-primary sm:text-3xl">User detail</h1>
      </div>
      <RouterLink class="text-sm font-semibold text-primary hover:underline" to="/">
        &larr; Back to users
      </RouterLink>
    </header>

    <div v-if="usersStore.loadingDetail" class="rounded-lg border border-base-300 bg-base-100 p-6">
      <p class="text-secondary">Loading user details...</p>
    </div>

    <div
      v-else-if="usersStore.errorDetail"
      class="rounded-lg border border-base-300 bg-base-100 p-6"
    >
      <p class="text-secondary">{{ usersStore.errorDetail }}</p>
    </div>

    <div v-else-if="!user" class="rounded-lg border border-base-300 bg-base-100 p-6">
      <p class="text-secondary">User not found.</p>
    </div>

    <div v-else class="flex flex-col gap-4">
      <section class="rounded-lg border border-base-300 bg-base-100 p-5">
        <div class="flex flex-wrap items-center gap-5">
          <div class="h-20 w-20 overflow-hidden rounded-full border border-base-300 bg-base-200">
            <img
              class="h-full w-full object-cover"
              :src="user.image"
              :alt="`${user.firstName} ${user.lastName}`"
            />
          </div>
          <div class="space-y-1">
            <h2 class="text-xl font-semibold text-base-content">
              {{ user.firstName }} {{ user.lastName }}
            </h2>
            <p class="text-sm text-secondary">@{{ user.username }}</p>
            <p class="text-sm text-secondary">{{ user.company?.title }}</p>
          </div>
        </div>
      </section>

      <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <section
          v-for="section in detailSections"
          :key="section.title"
          class="rounded-lg border border-base-300 bg-base-100 p-5"
        >
          <h3 class="text-base font-semibold text-base-content">{{ section.title }}</h3>
          <div class="mt-3 grid gap-2 text-sm text-secondary">
            <p v-for="item in section.items" :key="item.label" class="flex flex-wrap gap-1">
              <span class="font-semibold text-base-content">{{ item.label }}:</span>
              <span class="break-all text-secondary">{{ item.value }}</span>
            </p>
          </div>
        </section>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed, onMounted, onUnmounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useUsersStore } from '@/stores/users'

const route = useRoute()
const usersStore = useUsersStore()
const user = computed(() => usersStore.userDetail)
const detailSections = computed(() => {
  if (!user.value) return []
  const current = user.value

  return [
    {
      title: 'Personal stats',
      items: [
        { label: 'Height', value: `${current.height} cm` },
        { label: 'Weight', value: `${current.weight} kg` },
        { label: 'Blood group', value: current.bloodGroup },
        { label: 'Eye color', value: current.eyeColor },
        { label: 'Hair', value: `${current.hair?.color} / ${current.hair?.type}` },
      ],
    },
    {
      title: 'Location',
      items: [
        { label: 'Address', value: current.address?.address },
        { label: 'City', value: current.address?.city },
        { label: 'State', value: current.address?.state },
        {
          label: 'Coordinates',
          value: `${current.address?.coordinates?.lat}, ${current.address?.coordinates?.lng}`,
        },
      ],
    },
    {
      title: 'Employment & education',
      items: [
        { label: 'Company', value: current.company?.name },
        { label: 'Department', value: current.company?.department },
        {
          label: 'Office address',
          value: `${current.company?.address?.address}, ${current.company?.address?.city} ${current.company?.address?.state}`,
        },
        { label: 'University', value: current.university },
      ],
    },
    {
      title: 'Finance & tech',
      items: [
        { label: 'Card', value: `${current.bank?.cardType} • ${current.bank?.cardNumber}` },
        { label: 'Card expire', value: current.bank?.cardExpire },
        { label: 'Crypto wallet', value: current.crypto?.wallet },
        { label: 'IP address', value: current.ip },
        { label: 'MAC address', value: current.macAddress },
      ],
    },
  ]
})

const loadUser = () => {
  const id = Number(route.params.id)
  if (Number.isNaN(id)) return
  usersStore.fetchUserDetail(id)
}

onMounted(loadUser)
onUnmounted(() => {
  usersStore.clearUserDetail()
})
</script>
