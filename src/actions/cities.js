import axios from '../utils/api';
 
import apiConfig from '../config/api';
import storage from '../utils/storage';

// Constants
const GET_CITIES = 'GET_CITIES';
const ADD_CITY = 'ADD_CITY';
const REMOVE_CITY = 'REMOVE_CITY';


// Action Creators
const get_cities = cities => ({ type: GET_CITIES, GET_CITIES });

export const fetchCities = payloads => dispatch => {
  return axios.get('/v1/cities',  {
  }).then(res => {
      if(res.status == 200){
        dispatch({ type: GET_CITIES, data: res.data })
        return res
      } else {
        return res
      }
    })
}

export const removeCity = city => dispatch => {
  return axios.post('/v1/cities/:id/remove',  { params: {id: city}
  }).then(res => {
      if(res.status == 200){
        dispatch({ type: REMOVE_CITY, data: res.data })
        return res
      } else {
        return res
      }
    })
}

export const addCity = city => dispatch => {
  return axios.post('/v1/cities/:id/add',  { params: {id: city}
  }).then(res => {
      if(res.status == 200){
        dispatch({ type: ADD_CITY , data: res.data })
        return res
      } else {
        return res
      }
    })
}



