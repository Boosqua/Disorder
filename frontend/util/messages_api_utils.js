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
export const createMessage = (channelId, message) =>
   $.ajax({
      url: `api/channels/${channelId}/messages`,
      method: "POST",
      data: message,
      contentType: false,
      processData: false,
   }).fail( message => console.log(message));

export const updateMessage = (messageId, message) => (
   $.ajax({
      url: `api/messages/${messageId}`,
      method: `PATCH`,
      data: {message}
   })
)

export const deleteMessage = message => (
   $.ajax({
      url: `api/messages/${message.id}`,
      method: 'DELETE'
   })
)