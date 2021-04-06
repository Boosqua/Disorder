export const fetchInvites = () =>
  $.ajax({
    url: `api/server_invitations`,
  });
export const fetchInvite = (id) =>
  $.ajax({
    url: `api/server_invitations/${id}`,
  });
export const createInvite = (server_invitation) =>
  $.ajax({
    url: `api/server_invitations`,
    method: "POST",
    data: { server_invitation },
  });
export const deleteInvite = (id) =>
  $.ajax({
    url: `api/server_invitations/${id}`,
    method: "DELETE",
  });
