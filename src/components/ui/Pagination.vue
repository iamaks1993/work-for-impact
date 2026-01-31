<template>
  <div class="flex w-full flex-wrap items-center justify-between gap-1.5 text-[11px] text-secondary">
    <p class="text-[11px] font-medium text-secondary">
      Showing
      <span class="font-semibold text-base-content">{{ rangeStart }}</span>
      to
      <span class="font-semibold text-base-content">{{ rangeEnd }}</span>
      of
      <span class="font-semibold text-base-content">{{ total }}</span>
      results
    </p>

    <nav class="flex items-center gap-0.5 rounded-md border border-base-300 bg-base-100 p-0.5">
      <button
        class="inline-flex h-6 w-6 items-center justify-center rounded-md text-secondary transition hover:bg-base-200 hover:text-base-content disabled:cursor-not-allowed disabled:opacity-50"
        type="button"
        :disabled="page <= 1"
        @click="emit('update:page', page - 1)"
        aria-label="Previous page"
      >
        <span aria-hidden="true">‹</span>
      </button>

      <template v-for="item in pageItems" :key="`page-${item}`">
        <span
          v-if="item === '…'"
          class="inline-flex h-6 min-w-6 items-center justify-center rounded-md px-1 text-secondary opacity-70"
        >
          …
        </span>
        <button
          v-else
          class="inline-flex h-6 min-w-6 items-center justify-center rounded-md px-1 text-[10px] font-semibold transition"
          :class="
            item === page
              ? 'bg-primary text-base-100 shadow-sm'
              : 'text-secondary hover:bg-base-200 hover:text-base-content'
          "
          type="button"
          @click="emit('update:page', item)"
        >
          {{ item }}
        </button>
      </template>

      <button
        class="inline-flex h-6 w-6 items-center justify-center rounded-md text-secondary transition hover:bg-base-200 hover:text-base-content disabled:cursor-not-allowed disabled:opacity-50"
        type="button"
        :disabled="page >= totalPages"
        @click="emit('update:page', page + 1)"
        aria-label="Next page"
      >
        <span aria-hidden="true">›</span>
      </button>
    </nav>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  page: {
    type: Number,
    default: 1,
  },
  total: {
    type: Number,
    default: 0,
  },
  pageSize: {
    type: Number,
    default: 10,
  },
  maxButtons: {
    type: Number,
    default: 7,
  },
})

const emit = defineEmits(['update:page'])

const totalPages = computed(() => Math.max(1, Math.ceil(props.total / props.pageSize)))

const rangeStart = computed(() => {
  if (props.total === 0) return 0
  return (props.page - 1) * props.pageSize + 1
})

const rangeEnd = computed(() => Math.min(props.page * props.pageSize, props.total))

const pageItems = computed(() => {
  const total = totalPages.value
  const max = Math.max(5, props.maxButtons)
  const current = Math.min(Math.max(props.page, 1), total)

  if (total <= max) {
    return Array.from({ length: total }, (_, index) => index + 1)
  }

  const items = []
  const windowSize = max - 2
  let start = Math.max(2, current - Math.floor(windowSize / 2))
  let end = Math.min(total - 1, start + windowSize - 1)

  if (end - start < windowSize - 1) {
    start = Math.max(2, end - windowSize + 1)
  }

  items.push(1)

  if (start > 2) items.push('…')

  for (let i = start; i <= end; i += 1) {
    items.push(i)
  }

  if (end < total - 1) items.push('…')

  items.push(total)

  return items
})

</script>
