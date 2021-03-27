
export function fetchServers(userId) {
   return $.ajax({
      url: `/api/users/${userId}/servers`
   })
}

export const fetchServer = (userId, serverId) => (
   $.ajax({
      url: `/api/users/${userId}/servers/${serverId}`
   })
)

export const createServer = (userId, server) => (
   $.ajax({
      url: `/api/users/${userId}/servers/`,
      method: 'POST',
      data: { server }
   })
)

export const updateServer = (userId, server) => (
   $.ajax({
      url: `/api/users/${userId}/servers/${server.id}`,
      method: 'PATCH',
      data: { server }
   })
)

export const deleteServer = (userId, serverId) => (
   $.ajax({
      url: `/api/users/${userId}/servers/${serverId}`,
      method: 'DELETE'
   })
)
export const createServerMember = (server_member) => (
   $.ajax({
      url: '/api/server_members',
      method: 'POST',
      data: { server_member }
   })
)
export const deleteServerMember = (server_member) => (
   $.ajax({
      url: '/api/server_members/1',
      method: 'DELETE',
      data: { server_member }
   })
)