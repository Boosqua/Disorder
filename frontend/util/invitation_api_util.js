export const fetchInvites = () =>
  $.ajax({
    url: `api/server_invitations`,
  });
export const fetchInvite = (id) =>
  $.ajax({
    url: `api/server_invitations/${id}`,
  });
export const createInvite = (invite) =>
  $.ajax({
    url: `api/server_invitations`,
    method: "POST",
    data: {invite}
  });
export const deleteInvite = (id) =>
  $.ajax({
    url: `api/server_invitations/${id}`,
    method: "DELETE"
  });
