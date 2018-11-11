import React from 'react';
import {
  Button,
  Text,
  Container,
  Card,
  CardItem,
  Body,
  Content,
  Header,
  Title,
  Left,
  Icon,
  Right,
  List,
  ListItem,
  CheckBox,
  Thumbnail,
  Toast,
} from "native-base";
import { View,RefreshControl, TouchableOpacity } from 'react-native';
import moment from 'moment';
import Autolink from 'react-native-autolink';
import ActiveSwitch from '../../components/ActiveSwitch'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  fecthBookingNotifications,
  fecthBookings,
  acceptBooking,
  rejectBooking,
} from "../../actions/bookings";
import { Entypo as EntypoIcon } from '@expo/vector-icons';
import styles from './styles';
class Notifications extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      isRefreshing: false,
      error: '',
    };
    const {dispatch} = props;
    this.actions = bindActionCreators(
      { fecthBookingNotifications, acceptBooking, rejectBooking, fecthBookings} , dispatch
    )
    this.refreshList = this.refreshList.bind(this); 
    this.refreshListInBackground = this.refreshListInBackground.bind(this);

  }
  
  componentDidMount(){
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
  }

  onCheckPressHandler(notification_state){
    var message = 
    message = 'This bookings is: ' + notification_state
    Toast.show({
      text: message,
      position: 'bottom',
      buttonText: 'Okay'
    })
  }

  acceptBooking(notification){
    this.actions.acceptBooking(notification.id)
    .then(res => {
      console.log(res);
        Toast.show({
          text: 'Accepted',
          position: 'bottom',
          buttonText: 'Okay'
        })
      this.refreshListInBackground()
    })
    .catch(error => {
     const messages = _.get(error, 'response.data.message')
      console.log( error);
        Toast.show({
          text: messages,
          type: 'danger',
          position: 'bottom',
          buttonText: 'Okay'
        })
    })
    
  }

  rejectBooking(notification){
    this.actions.rejectBooking(notification.id)
    .then(res => {
      console.log(res);
      this.refreshListInBackground()
      Toast.show({
        text: 'Rejected',
        position: 'bottom',
        buttonText: 'Okay'
      })
    })
    .catch(error => {
     const messages = _.get(error, 'response.data.message')
       console.log( messages);
       Toast.show({
          text: messages,
          type: 'danger',
          position: 'bottom',
          buttonText: 'Okay'
        })
    })
    
  }


  refreshList(){
    (async () => {
      console.log('refreshStrted::', this.actions)
      this.setState({isRefreshing: true});
      this.actions.fecthBookingNotifications()
      .then(res => {
        console.log(res);
        this.setState({
          isRefreshing: false,
         })
      })
      .catch(error => {
       const messages = _.get(error, 'message')
       console.log( messages);
       this.setState({
        isRefreshing: false,
       })
      })
    })();
  }

  refreshListInBackground(){
    (async () => {
      console.log('refreshStrted::', this.actions)
      this.actions.fecthBookingNotifications()
      .then(res => {
      })
      .catch(error => {
       const messages = _.get(error, 'message')
       console.log( messages);
      })
      this.actions.fecthBookings()
      .then(res => {
        console.log(res);
        this.setState({
          isRefreshing: false,
         })
      })
      .catch(error => {
       const messages = _.get(error, 'message')
       console.log( messages);
       this.setState({
        isRefreshing: false,
       })
      })
    })();
  }

  renderActions(notification){
    if(!notification.status){
      return(
        <View  style={{ flexDirection: 'row'}}>
          {notification.humanize_status != "accepted" &&
            <View>
              <Button 
                onPress={ ()=> this.acceptBooking(notification) }
                iconLeft small rounded  success style={{marginLeft: 5}}>
                <Icon name='md-checkmark' />
                <Text> Accept </Text>
              </Button>
            </View>
          }
          { notification.humanize_status != "rejected" &&
            <View>
              <Button 
                onPress={ ()=> this.rejectBooking(notification) }
                iconLeft small rounded  bordered danger style={{marginLeft: 5}}>
                <Icon name='md-close' />
                <Text> Decline </Text>
              </Button>
            </View>
        }
        </View>
      )
    }
    
    
  }

  renderBookingStatus(notification){
    if(notification.humanize_status == 'accepted'){
      return(
        <TouchableOpacity onPress={ ()=> this.onCheckPressHandler(notification.booking_humanize_status) }>
          <EntypoIcon name="info-with-circle" size={30} style={{color: 'green'}}  />
        </TouchableOpacity>
      )
    }else if (notification.humanize_status == 'rejected'){
      return(
        <TouchableOpacity onPress={ ()=> this.onCheckPressHandler(notification.booking_humanize_status) } >
          <EntypoIcon name="info-with-circle" size={30} style={{ color: 'red'}}   />
        </TouchableOpacity>
      )
    }else{
      return(
        <TouchableOpacity onPress={ ()=> this.onCheckPressHandler(notification.booking_humanize_status)} >
          <EntypoIcon name="info-with-circle" size={30} style={{ color: '#4e4e4e'}}   />
        </TouchableOpacity>
      )
    }
  }

  refreshControl(){
    return(
      <RefreshControl 
        refreshing={this.state.isRefreshing}
        onRefresh={ ()=> this.refreshList() }
        tintColor="#ff0000"
        title="Loading..."
        titleColor="#00ff00"
        colors={['#ff0000', '#00ff00', '#0000ff']}
      />
    )
  }

  render() {
    console.log('this.props', this.props)
    const booking_notifications = this.props.notifications
    return (
      <Content   
      refreshControl={this.refreshControl()}
      >
      { booking_notifications && booking_notifications.length > 0 ?
        <List
          
          dataArray={booking_notifications}
          renderRow={data => {
            const humanize_booking_time = data.booking_humanize_booking_time
            
            return (
                <Card>
                  <CardItem style={styles.cardItem}>
                      <Left>
                        <Text onLongPress={ ()=> Toast.show({
                              position: "bottom",
                              text: "Booking Name",
                              buttonText: "Okay",
                              duration: 3000
                          })} > {data.booking_name}  </Text>
                      </Left>
                      <Right>
                        <Text onLongPress={ ()=> Toast.show({
                              position: "bottom",
                              text: "Vechicle Make / Model",
                              buttonText: "Okay",
                              duration: 3000
                          })}> { data.booking_vechicle_registration} </Text> 
                      </Right>                        
                  </CardItem>
                  <CardItem style={styles.cardItem}>
                      <Left>
                         <Text  onLongPress={ ()=> Toast.show({
                              position: "bottom",
                              text: "Booking Date and Time",
                              buttonText: "Okay",
                              duration: 3000
                          })}> {humanize_booking_time} </Text>
                      </Left>
                      <Right>
                        <Text   onLongPress={ ()=> Toast.show({
                              position: "bottom",
                              text: "Booking Place",
                              buttonText: "Okay",
                              duration: 3000
                          })}> {data.booking_city.name } ({data.booking_city.post_code})</Text>
                      </Right>
                  </CardItem>
                  <CardItem style={styles.cardItem}>
                      <Body>
                         {this.renderActions(data)}
                      </Body>
                      {this.renderBookingStatus(data)}
                  </CardItem>
                </Card>
            );
          }}
          /> :
        <Card>
          <CardItem>
            <Body>
              <Text> No available jobs currently </Text>
            </Body>
          </CardItem>
        </Card>
      }
      </Content>
    );
  }

}


export default Notifications
