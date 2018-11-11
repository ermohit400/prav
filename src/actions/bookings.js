import axios from '../utils/api';
 
import apiConfig from '../config/api';
import storage from '../utils/storage';

// Constants
const GET_BOOKINGS = 'GET_BOOKINGS';
const ACCEPT_BOOKING = 'ACCEPT_BOOKING';
const REJECT_BOOKING = 'REJECT_BOOKING';
const MORE_BOOKINGS = 'MORE_BOOKINGS';
// Action Creators
const get_bookings = bookings => ({ type: GET_BOOKINGS, GET_BOOKINGS });

export const fecthBookings = payloads => dispatch => {
  return axios.get('/v1/bookings',  {
  }).then(res => {
      if(res.status == 200){
        dispatch({ type: GET_BOOKINGS, data: res.data })
        return res
      } else {
        return res
      }
    })
}

export const fecthMoreBookings = payloads => dispatch => {
  return axios.get('/v1/bookings', payloads).then(res => {
      if(res.status == 200){
        dispatch({ type: MORE_BOOKINGS, data: res.data })
        return res
      } else {
        return res
      }
    })
}

// Constants
const GET_BOOKING_NOTIFICATIONS = 'GET_BOOKING_NOTIFICATIONS';


const get_booking_notifications = bookings => ({ type: GET_BOOKING_NOTIFICATIONS, GET_BOOKING_NOTIFICATIONS });

export const fecthBookingNotifications = payloads => dispatch => {
  return axios.get('/v1/bookings/notifications',  {
  }).then(res => {
      if(res.status == 200){
        dispatch({ type: GET_BOOKING_NOTIFICATIONS, data: res.data })
        return res
      } else {
        return res
      }
    })
}

export const acceptBooking = notification_id => dispatch => {
  return axios.post('/v1/bookings/accept_reject',  { queries: {status: 'accept', notification_id: notification_id}
  }).then(res => {
      if(res.status == 200){
        dispatch({ type: ACCEPT_BOOKING, data: res.data.booking_notification })
        return res
      } else {
        return res
      }
    })
}

export const markFinishBooking = payloads => dispatch => {
  return axios.post('/v1/bookings/:booking_id/mark_finished', payloads).then(res => {
      if(res.status == 200){
        dispatch({ type: 'MARK_FINISHED', data: res.data })
        return res
      } else {
        return res
      }
    })
}

export const rejectBooking = notification_id => dispatch => {
  return axios.post('/v1/bookings/accept_reject',  { queries: {status: 'reject', notification_id: notification_id}
  }).then(res => {
      if(res.status == 200){
        dispatch({ type: REJECT_BOOKING, data: res.data.booking_notification })
        return res
      } else {
        return res
      }
    })
}
