/**
 * 
 */
import { combineReducers } from "redux";
import user from './user';
import bookings from './bookings';
import cities from './cities';
import settings from './settings';



export default function getRootReducer(navReducer) {
    return combineReducers({
        nav: navReducer,
        current_user: user,
        bookings: bookings,
        cities: cities,
        settings: settings,
    });
}
