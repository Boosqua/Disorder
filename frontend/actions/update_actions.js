export const RECEIVE_UPDATE = "RECEIVE_UPDATE";
export const REMOVE_UPDATE = "REMOVE_UPDATE";

export const receiveUpdate = update => ({
   type: RECEIVE_UPDATE,
   update: update
});

export const removeUpdate = () => ({
   type: REMOVE_UPDATE
});