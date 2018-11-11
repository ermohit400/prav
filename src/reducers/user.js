import { initialState } from './initial';

export default (state = initialState.current_user, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        info: action.data,
      };
    case 'LOGOUT':
      return state;
    case 'CURRENT_USER':
      return {
        ...state,
        info: action.data,
      };
    case 'CHANGE_PROFILE':
      return {
        ...state,
        info: action.data,
      };
    case 'USER_AVAILIBILITY_CHANGED':
      let {humanize_availability_status} = action.data
      return {
        ...state,
        info: Object.assign({},state.info, {humanize_availability_status: humanize_availability_status}),
      };
    case 'ADD_CITY':
      return {
        ...state,
        info: Object.assign({},state.info, {cities: action.data.cities}),
      };
    case 'REMOVE_CITY':
      return {
        ...state,
        info: Object.assign({},state.info, {cities:  action.data.cities}),
      };
    default:
      return state;
  }
};
