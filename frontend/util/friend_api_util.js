export const fetchFriends = () =>(
  $.ajax({
    url: `api/friends/`,
   })
)
export const createFriend = (friendAId, friendBId) => (
   $.ajax({
    url: `api/friends/`,
    method: "POST",
    data: { friend_a_id: friendAId, friend_b_id: friendBId }
   })
)

export const deleteFriend = (id) => (
   $.ajax ({
      url: `api/friends/${id}`,
      method: 'DELETE'
   })
)
export const fetchFriendRequests = () =>(
  $.ajax({
    url: `api/friend_requests/`,
   })
)
export const createFriendRequest = (friendAId, friendBId) =>
  $.ajax({
    url: `api/friend_requests/`,
    method: "POST",
    data: { requestor_id: friendAId, receiver_id: friendBId },
  });

export const deleteFriendRequest = (id) => 
  $.ajax({
    url: `api/friend_requests/${id}`,
    method: "DELETE",
  });


