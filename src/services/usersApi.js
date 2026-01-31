const BASE_URL = 'https://dummyjson.com'

export async function fetchUsers({ limit = 10, skip = 0, q = '', sortBy = '', order = 'asc' } = {}) {
  const params = new URLSearchParams({ limit: String(limit), skip: String(skip) })
  const path = q ? '/users/search' : '/users'
  if (q) params.set('q', q)
  if (sortBy) {
    params.set('sortBy', sortBy)
    params.set('order', order)
  }
  const response = await fetch(`${BASE_URL}${path}?${params.toString()}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch users (${response.status})`)
  }

  return response.json()
}

export async function fetchUserById(id) {
  const response = await fetch(`${BASE_URL}/users/${id}`)

  if (!response.ok) {
    throw new Error(`Failed to fetch user (${response.status})`)
  }

  return response.json()
}
