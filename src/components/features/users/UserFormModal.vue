<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
    <form
      class="w-full max-w-lg rounded-lg border border-base-300 bg-base-100 p-5 shadow-lg"
      @submit.prevent="emit('save', localForm)"
    >
      <div class="flex items-center justify-between">
        <h2 class="text-lg font-semibold text-primary">
          {{ isEdit ? 'Edit user' : 'Add user' }}
        </h2>
        <button
          class="cursor-pointer text-secondary hover:text-base-content"
          type="button"
          @click="emit('close')"
        >
          ✕
        </button>
      </div>

      <div class="mt-4 grid gap-3 sm:grid-cols-2">
        <label class="text-xs text-secondary">
          First name
          <input
            ref="firstNameRef"
            v-model="localForm.firstName"
            type="text"
            class="mt-1 h-9 w-full rounded-md border border-base-300 bg-base-100 px-2 text-sm text-base-content"
            required
          />
        </label>
        <label class="text-xs text-secondary">
          Last name
          <input
            v-model="localForm.lastName"
            type="text"
            class="mt-1 h-9 w-full rounded-md border border-base-300 bg-base-100 px-2 text-sm text-base-content"
            required
          />
        </label>
        <label class="text-xs text-secondary">
          Username
          <input
            v-model="localForm.username"
            type="text"
            class="mt-1 h-9 w-full rounded-md border border-base-300 bg-base-100 px-2 text-sm text-base-content"
            required
          />
        </label>
        <label class="text-xs text-secondary">
          Email
          <input
            v-model="localForm.email"
            type="email"
            class="mt-1 h-9 w-full rounded-md border border-base-300 bg-base-100 px-2 text-sm text-base-content"
            required
          />
        </label>
        <label class="text-xs text-secondary">
          Phone
          <input
            v-model="localForm.phone"
            type="text"
            class="mt-1 h-9 w-full rounded-md border border-base-300 bg-base-100 px-2 text-sm text-base-content"
            required
          />
        </label>
        <label class="text-xs text-secondary">
          Birth date
          <input
            v-model="localForm.birthDate"
            type="date"
            :max="todayDate"
            class="mt-1 h-9 w-full rounded-md border border-base-300 bg-base-100 px-2 text-sm text-base-content"
            required
          />
        </label>
        <label class="text-xs text-secondary">
          Gender
          <select
            v-model="localForm.gender"
            class="mt-1 h-9 w-full rounded-md border border-base-300 bg-base-100 px-2 text-sm text-base-content"
            required
          >
            <option v-for="option in genderOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </label>
        <label class="text-xs text-secondary">
          Role
          <select
            v-model="localForm.role"
            class="mt-1 h-9 w-full rounded-md border border-base-300 bg-base-100 px-2 text-sm text-base-content"
            required
          >
            <option v-for="option in roleOptions" :key="option.value" :value="option.value">
              {{ option.label }}
            </option>
          </select>
        </label>
      </div>

      <div class="mt-5 flex justify-end gap-2">
        <button
          class="h-9 cursor-pointer rounded-md border border-base-300 px-3 text-sm font-semibold text-secondary"
          type="button"
          @click="emit('close')"
        >
          Cancel
        </button>
        <button
          class="h-9 cursor-pointer rounded-md bg-primary px-4 text-sm font-semibold text-base-100"
          type="submit"
        >
          {{ isEdit ? 'Save changes' : 'Add user' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { nextTick, onMounted, ref, watch } from 'vue'
import { GENDER_OPTIONS, ROLE_OPTIONS } from '@/constants/users'
import { normalizeDate } from '@/utils/dateUtils'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false,
  },
  formData: {
    type: Object,
    default: () => ({}),
  },
  isEdit: {
    type: Boolean,
    default: false,
  },
})

const emit = defineEmits(['close', 'save'])

const localForm = ref({ ...props.formData })
const firstNameRef = ref(null)
const roleOptions = ROLE_OPTIONS
const genderOptions = GENDER_OPTIONS
const todayDate = new Date().toISOString().split('T')[0]

watch(
  () => props.formData,
  (value) => {
    localForm.value = { ...value, birthDate: normalizeDate(value.birthDate) }
  },
  { deep: true, immediate: true },
)

onMounted(async () => {
  await nextTick()
  if (firstNameRef.value) firstNameRef.value.focus()
})
</script>
