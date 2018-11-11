import React from 'react';
import {
  Notifications,
} from 'expo';
import {
  View,
} from 'react-native';
import {  
  Toast 
} from 'native-base';

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import registerForPushNotificationsAsync from '../api/registerForPushNotificationsAsync';
import {
  fecthBookingNotifications,
} from "../actions/bookings";

class Notification extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      notification: {},
    };
    const {dispatch} = props;
    this.actions = bindActionCreators(
      { fecthBookingNotifications,} , dispatch
    ) 

  }

  componentWillMount() {
    registerForPushNotificationsAsync();

    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = (notification) => {
    (async () => {
      this.actions.fecthBookingNotifications()
      .then(res => {
        console.log(res);
        this.setState({
          isLoaded: true,
         })
      })
      .catch(error => {
       const messages = _.get(error, 'message')
       console.log( messages);
       this.setState({
        isLoaded: true,
       })
      });
    })();
    this.setState({notification: notification});
    console.log("Notification::", this.state.notification )
    if(notification.data && notification.data.type == "booking_notification"){
      const message = 'New booking from ' + notification.data.booking_notification.booking_name
      Toast.show({
        text: message,
        position: 'bottom',
        type: 'success',
        buttonText: 'View',
        duration: 6000,
        buttonPress: ()=> {
          this.props.navigation.navigate('homeScreen');
          this.props.dispatch({ type: 'SWITCH_SEGMENT_AVAILABLE_JOBS', data: 'home_page' });
          console.log("Closed")
        }
      });
    }

  };

  render() {
    return (
      <View>
  
      </View>
    );
  }
}

export default connect(
    state => ({
        current_user: state.current_user,
    })
)(Notification);