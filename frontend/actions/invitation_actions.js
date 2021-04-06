import * as APIUtil from "../util/invitation_api_util"
import {receiveErrors} from "./error_actions"
export const RECEIVE_INVITES = "RECEIVE_INVITES";
export const RECEIVE_INVITE = "RECEIVE_INVITE";
export const DELETE_INVITE = "DELETE_INVITE";

export const receiveInvites = (invites) => ({
   type: RECEIVE_INVITES,
   invites
})

export const receiveInvite = (invite) => ({
   type: RECEIVE_INVITE,
   invite
})

export const deleteInvite = ({id}) => ({
   type: DELETE_INVITE,
   id
})

export const fetchInvites = () => (dispatch) => (
   APIUtil.fetchInvites()
      .then( invites => dispatch(receiveInvites(invites)))
      .fail( error => dispatch(receiveErrors(error)))
)
export const fetchInvite = (id) => (dispatch) => (
   APIUtil.fetchInvite(id)
      .then( invites => dispatch(receiveInvite(invites)))
      .fail( error => dispatch(receiveErrors(error)))
)
export const createInvite = (id) => (dispatch) => (
   APIUtil.createInvite(id)
)

export const destroyInvite = (id) => (dispatch) => (
   APIUtil.deleteInvite(id)
      .then( id => dispatch(deleteInvite(id)))
      .fail( error => dispatch(receiveErrors(error)))
)