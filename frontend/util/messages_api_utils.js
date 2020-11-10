export const fetchMessages = (userId) => (
   $.ajax({
      url: `api/users/${userId}/messages`
   })
)
export const fetchMessage = (channelId, messageId) => (
   $.ajax({
      url: `api/channels/${channelId}/messages/${messageId}`
   })
)
export const createMessage = (channelId, message) => (
   $.ajax({
      url: `api/channels/${channelId}/messages`,
      method: 'POST',
      data: { message }
   })
)