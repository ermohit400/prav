import React from 'react';
import {
  Tabs,
  Tab,
  Button,
  Text,
  Container,
  Body,
  Content,
  Header,
  Title,
  Left,
  Icon,
  Right,
  TabHeading,
  Segment,
} from "native-base";
import Notifications from "../../components/notifications";
import Bookings from "../../components/bookings"
import { View } from 'react-native';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";;
import { Entypo } from '@expo/vector-icons';
import styles from './styles';
import MenuButton from "../../components/MenuButton"
class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      segment: 'bookings',
      isLoaded: false,
      isRefreshing: false,
      error: '',
    };  

  }

  setSegment(val){
    if(val == 'notification'){
      this.props.dispatch({ type: 'SWITCH_SEGMENT_AVAILABLE_JOBS', data: 'home_page' })
    }else if (val == 'bookings'){
      this.props.dispatch({ type: 'SWITCH_SEGMENT_ACTIVE_JOBS', data: 'home_page' })
    }
  }

  isNotificationSegmentActive(){
    return this.props.settings.segment == 'notification'
  }
  isBookingSegmentActive(){
    return this.props.settings.segment == 'bookings'
  }

  renderSelectedSegment(){
    if(this.isNotificationSegmentActive()){
      return(
        <Notifications
          navigation={this.props.navigation} 
          dispatch={this.props.dispatch } 
          current_user={this.props.current_user } 
          notifications={ this.props.notifications } />
      )
    }else if(this.isBookingSegmentActive()){
      return(
        <Bookings
          navigation={this.props.navigation} 
          dispatch={this.props.dispatch } 
          current_user={this.props.current_user } 
          bookings={this.props.bookings } 
          bookings_meta={this.props.bookings_meta}/>
      )
    }
  }

  render() {
    return (
      <Container>
        <Header hasSegment>
          <MenuButton navigation={this.props.navigation} />
          <Body >
            <Segment>
              <Button first active={this.isBookingSegmentActive()} onPress={ ()=> this.setSegment('bookings') }>
                <Entypo style={this.isBookingSegmentActive() ?  styles.activeIcon : styles.deactiveIcon } name='calendar'  />
                <Text style={styles.headingText} > My Jobs </Text>
              </Button>
              <Button  last active={this.isNotificationSegmentActive()} onPress={ ()=> this.setSegment('notification') }>
                <Entypo style={this.isNotificationSegmentActive() ?  styles.activeIcon : styles.deactiveIcon }  name='bell' />
                <Text style={styles.headingText} > Available Jobs </Text>
              </Button>
            </Segment>
          </Body>
        </Header>
        { this.renderSelectedSegment() }
      </Container>
    );
  }


}


export default connect(
    state => ({
        current_user: state.current_user,
        bookings: state.bookings.all,
        bookings_meta: state.bookings.bookings_meta,
        notifications: state.bookings.notifications,
        settings: state.settings
    })
)(HomeScreen);
