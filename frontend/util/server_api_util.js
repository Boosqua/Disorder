
export const fetchServers = (userId) => (
   $.ajax({
      url: `/api/users/${userId}/servers`
   })
)

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

export const deleteServers = (userId, serverId) => (
   $.ajax({
      url: `/api/users/${userId}/servers/${serverId}`,
      method: 'DELETE'
   })
)