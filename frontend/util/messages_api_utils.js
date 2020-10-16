export const fetchMessages = channelId => (
   $.ajax({
      url: `api/channels/${channelId}/messages`
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