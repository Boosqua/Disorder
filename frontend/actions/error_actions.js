export const RECEIVE_ERRORS = "RECEIVE_ERRORS";
export const CLEAR_ERRORS = "CLEAR_ERRORS";
export const receiveErrors = (error) => ({
   type: RECEIVE_ERRORS,
   error,
   errors: error
})
export const clearErrors = () => ({
   type: CLEAR_ERRORS
})
