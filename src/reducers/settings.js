import { initialState } from './initial';

export default (state = initialState.settings, action) => {
  switch (action.type) {
    case 'SWITCH_SEGMENT_ACTIVE_JOBS':
      return {
        ...state,
        segment: 'bookings'
      };
    case 'SWITCH_SEGMENT_AVAILABLE_JOBS':
      return {
        ...state,
        segment: 'notification'
      };
    default:
      return state;
  }
};
