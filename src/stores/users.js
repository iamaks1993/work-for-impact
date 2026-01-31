import { defineStore } from 'pinia'
import { fetchUserById, fetchUsers as fetchUsersApi } from '@/services/usersApi'

export const useUsersStore = defineStore('users', {
  state: () => ({
    users: [],
    allUsers: [],
    total: 0,
    apiTotal: 0,
    limit: 10,
    skip: 0,
    loading: false,
    error: null,
    userDetail: null,
    loadingDetail: false,
    errorDetail: null,
  }),
  actions: {
    async fetchUsers({
      limit = this.limit,
      skip = this.skip,
      q = '',
      sortBy = '',
      order = 'asc',
    } = {}) {
      this.loading = true
      this.error = null

      try {
        const data = await fetchUsersApi({ limit, skip, q, sortBy, order })
        const users = data.users ?? []
        this.allUsers = users
        this.users = users
        this.apiTotal = data.total ?? users.length ?? 0
        this.total = this.apiTotal
        this.limit = data.limit ?? limit
        this.skip = data.skip ?? skip
      } catch (err) {
        this.error = err instanceof Error ? err.message : 'Failed to fetch users.'
      } finally {
        this.loading = false
      }
    },
    applyFilters({ role = '', gender = '' } = {}) {
      let filtered = [...this.allUsers]

      if (!role && !gender) {
        this.users = filtered
        this.total = this.apiTotal
        return
      }

      if (role) {
        filtered = filtered.filter((user) => (user.role || '').toLowerCase() === role.toLowerCase())
      }

      if (gender) {
        filtered = filtered.filter(
          (user) => (user.gender || '').toLowerCase() === gender.toLowerCase(),
        )
      }

      this.users = filtered
      this.total = filtered.length
    },
    deleteUser(id) {
      const beforeCount = this.allUsers.length
      this.allUsers = this.allUsers.filter((user) => user.id !== id)
      this.users = this.users.filter((user) => user.id !== id)

      if (this.apiTotal > 0 && this.allUsers.length !== beforeCount) {
        this.apiTotal -= 1
        this.total = Math.max(this.total - 1, 0)
      }
    },
    addUser(user) {
      this.allUsers = [user, ...this.allUsers]
      this.users = [user, ...this.users]
      this.apiTotal += 1
      this.total += 1
    },
    updateUser(updatedUser) {
      this.allUsers = this.allUsers.map((user) => (user.id === updatedUser.id ? updatedUser : user))
      this.users = this.users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    },
    async fetchUserDetail(id) {
      this.loadingDetail = true
      this.errorDetail = null
      try {
        this.userDetail = await fetchUserById(id)
      } catch (err) {
        this.errorDetail = err instanceof Error ? err.message : 'Failed to fetch user.'
      } finally {
        this.loadingDetail = false
      }
    },
    clearUserDetail() {
      this.userDetail = null
      this.errorDetail = null
    },
  },
})
