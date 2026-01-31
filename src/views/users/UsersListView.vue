<template>
  <section class="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-6 sm:px-6 lg:px-10">
    <header class="flex flex-col gap-1.5">
      <h1 class="text-2xl font-semibold text-primary sm:text-3xl">Users</h1>
    </header>
    <UsersList />
  </section>
</template>

<script setup>
import UsersList from '@/components/features/users/UsersList.vue'
</script>
