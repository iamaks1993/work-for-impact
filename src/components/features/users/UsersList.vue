<template>
  <div class="flex flex-col gap-3">
    <div class="w-full overflow-hidden rounded-lg border border-base-300 bg-base-100 shadow-sm">
      <div class="overflow-x-auto">
        <table class="min-w-full border-separate border-spacing-0">
          <thead
            class="bg-base-200 text-left text-[11px] font-semibold uppercase tracking-wide text-secondary"
          >
            <tr>
              <th class="whitespace-nowrap px-3 py-2">ID</th>
              <th class="whitespace-nowrap px-3 py-2">Profile</th>
              <th class="whitespace-nowrap px-3 py-2">Name</th>
              <th class="whitespace-nowrap px-3 py-2">Role</th>
              <th class="whitespace-nowrap px-3 py-2">Birth date</th>
              <th class="whitespace-nowrap px-3 py-2">Age</th>
              <th class="whitespace-nowrap px-3 py-2">Gender</th>
              <th class="whitespace-nowrap px-3 py-2">Email</th>
              <th class="whitespace-nowrap px-3 py-2">Phone</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-base-300 text-sm text-base-content">
            <tr>
              <td class="px-3 py-6 text-center text-secondary" colspan="9">
                No users loaded yet.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="border-t border-base-300 px-3 py-2">
        <Pagination v-model:page="page" :total="totalUsers" :page-size="pageSize" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Pagination from '@/components/ui/Pagination.vue'

const pageSize = 10
const totalUsers = 97
const page = ref(1)
</script>
