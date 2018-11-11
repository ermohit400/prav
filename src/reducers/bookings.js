import { initialState } from './initial';

export default (state = initialState.bookings, action) => {
  switch (action.type) {
    case 'GET_BOOKINGS':
      return {
        ...state,
        all: action.data.bookings,
        bookings_meta: action.data.meta
      };
    case 'MORE_BOOKINGS':
      return {
        ...state,
        all: [...state.all, ...action.data.bookings],
        bookings_meta: action.data.meta
      };
    case 'GET_BOOKING_NOTIFICATIONS':
      return {
        ...state,
        notifications: action.data.booking_notifications,
      }; 
    case 'ACCEPT_BOOKING':
      return { 
       ...state, 
       notifications: state.notifications.map(
           (booking_notification, i ) => booking_notification.booking_slug === action.data.booking_slug ? action.data
                                   : booking_notification
       )
    }
    case 'REJECT_BOOKING':
      return { 
       ...state, 
       notifications: state.notifications.map(
           (booking_notification, i ) => booking_notification.booking_slug === action.data.booking_slug ? action.data
                                   : booking_notification
       )
    }
    default:
      return state;
  }
};