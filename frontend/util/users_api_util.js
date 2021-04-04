export const fetchUsers = () => (
   $.ajax({
      url: `/api/users`
   })
)

export const fetchUser = userId => (
   $.ajax({
      url: `/api/users/${userId}`
   })
)
export const deleteUser = (userId)  => (
   $.ajax({
      url: `/api/users/${userId}`, 
      method: "DELETE"
   })
)
export const updateUser = (user) =>(
   $.ajax({
      url: `/api/users/${user.id}`,
      type: "PATCH",
      data: {user},
   }))
export const updateUserPhoto = (userId, user) =>(
   $.ajax({
      url: `/api/users/${userId}`,
      type: "PATCH",
      data: user,
      contentType: false,
      processData: false
   })
)