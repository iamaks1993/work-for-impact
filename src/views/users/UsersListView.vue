<template>
  <section class="mx-auto flex w-full max-w-5xl flex-col gap-4 px-4 py-6 sm:px-6 lg:px-8">
    <header class="flex flex-col gap-1.5">
      <h1 class="text-xl font-semibold text-primary sm:text-2xl">Users</h1>
    </header>
    <UsersList />
  </section>
</template>

<script setup>
import UsersList from '@/components/features/users/UsersList.vue'
</script>
