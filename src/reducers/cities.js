import { initialState } from './initial';

export default (state = initialState.cities, action) => {
  switch (action.type) {
    case 'GET_CITIES':
      return {
        ...state,
        all: action.data,
      };
    default:
      return state;
  }
};
