export const fetchUsers = () => (
   $.ajax({
      url: `/api/users`
   })
)

export const fetchUser = userId => (
   $.ajax({
      url: `/api/${userId}`
   })
)

export const updateUser = (user) =>(
   $.ajax({
      url: `/api/users/${user.id}`,
      type: "PATCH",
      data: {user},
   }))