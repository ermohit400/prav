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
  Spinner,
} from "native-base";
import { View,RefreshControl, TouchableOpacity } from 'react-native';
import moment from 'moment';
import Autolink from 'react-native-autolink';
import { bindActionCreators } from "redux";
import {fecthBookings, fecthMoreBookings} from "../../actions/bookings";
import { Entypo as EntypoIcon } from '@expo/vector-icons';
import styles from './styles';

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
};
class BookingsScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
      isRefreshing: false,
      error: '',
      loadMore: false,
    };
    const {dispatch} = props;
    this.markfinished = this.markfinished.bind(this)
    this.loadMore = this.loadMore.bind(this)
    this.actions = bindActionCreators(
      { fecthBookings, fecthMoreBookings} , dispatch
    ) 
  }
  componentDidMount(){
    (async () => {
      this.actions.fecthBookings()
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


 markfinished(booking){
  // on Button press APi not available
  Toast.show({
        text: 'text',
        position: 'bottom',
        type: 'success',
        buttonText: 'OK',
        duration: 6000,
        onClose: ()=> {
          //this.props.navigation.navigate('homeScreen');
          //this.props.dispatch({ type: 'SWITCH_SEGMENT_AVAILABLE_JOBS', data: 'home_page' });
          //console.log("Closed")
        }
      });
  }

  refreshList(){
    (async () => {
      console.log('refreshStrted::')
      this.setState({isRefreshing: true});
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

  loadMore(){
    if( this.props.bookings.length && this.state.loadMore == false){
      const nextPage = (this.props.bookings.length / _.get(this.props, 'bookings_meta.pagination.per_page') ) + 1
      if(nextPage <= _.get(this.props, 'bookings_meta.pagination.total_pages')){
        (async () => {
           this.setState({
            loadMore: true,
           })
            this.actions.fecthMoreBookings({queries: {page: nextPage}})
            .then(res => {
              console.log(res);
              this.setState({
                loadMore: false,
               })
            })
            .catch(error => {
             const messages = _.get(error, 'message')
             console.log( messages);
             this.setState({
              loadMore: false,
             })
            });
          })();
      }
    }
  }

  renderBookingStatus(booking){
    if( ['cancelled'].indexOf(booking.state) > 0 ){
      return(
        <TouchableOpacity onPress={ ()=> this.onCheckPressHandler(booking.humanize_status) }>
          <EntypoIcon name="info-with-circle" size={30} style={{color: 'red'}}  />
        </TouchableOpacity>
      )
    }else if (['admin_assigned', 'mechanic_accepted'].indexOf(booking.state) > -1 ){
      return(
        <TouchableOpacity onPress={ ()=> this.onCheckPressHandler(booking.humanize_status) } >
          <EntypoIcon name="info-with-circle" size={30} style={{ color: 'green'}}   />
        </TouchableOpacity>
      )
    }else if (['finished'].indexOf(booking.state) > -1 ){
      return(
        <TouchableOpacity onPress={ ()=> this.onCheckPressHandler(booking.humanize_status) } >
          <EntypoIcon name="info-with-circle" size={30} style={{ color: 'orange'}}   />
        </TouchableOpacity>
      )
    }else if ( ['reconfirmation_needed'].indexOf(booking.state) > -1 ){
      return(
        <TouchableOpacity onPress={ ()=> this.onCheckPressHandler(booking.humanize_status) } >
          <EntypoIcon name="info-with-circle" size={30} style={{ color: '#0000ff'}}   />
        </TouchableOpacity>
      )
    }else{
      return(
        <TouchableOpacity onPress={ ()=> this.onCheckPressHandler(booking.humanize_status)} >
          <EntypoIcon name="info-with-circle" size={30} style={{ color: '#4e4e4e'}}   />
        </TouchableOpacity>
      )
    }
  }

  refreshControl(){
    return(
      <RefreshControl refreshing={this.state.isRefreshing}
        onRefresh={this.refreshList.bind(this)}
        tintColor="#ff0000"
        title="Loading..."
        titleColor="#00ff00"
        colors={['#ff0000', '#00ff00', '#0000ff']}      />
    )
  }

  renderFinishStatus(booking){
    if(booking.can_marked_as_finished){
      return(
        <CardItem style={styles.cardItemMarkFinish} >
            <View style={{flex: 1, flexWrap: "wrap", marginLeft: 5, alignItems: 'center', justifyContent: 'center' }}>
              <Button
                onPress={ ()=> this.markfinished(booking) }
                iconLeft small rounded  success style={{marginLeft: 5, alignSelf: 'center'}}>
                <Icon name='md-checkmark' />
                <Text> Mark Finished </Text>
              </Button>  
            </View>
        </CardItem>
      )
    }
  }



  render() {
    const bookings = this.props.bookings
    return (
      <Content   
      refreshControl={this.refreshControl()}
      onScroll={({nativeEvent}) => {
        if (isCloseToBottom(nativeEvent)) {
          console.log('end triggered'),
          this.loadMore()
        }
      }}
          scrollEventThrottle={200}
      >
      { bookings && bookings.length > 0 ?
        <View>
          <List
          
          dataArray={bookings}
          renderRow={data => {
            const humanize_booking_time = data.humanize_booking_time
            
            return (
              <Card>
                <CardItem style={styles.cardItem} >
                    <Left>
                      <Text style={{ marginLeft: 0 }} onLongPress={ ()=> Toast.show({
                            position: "bottom",
                            text: "Booking Name",
                            buttonText: "Okay",
                            duration: 3000
                        })} > {data.name}  </Text>
                    </Left>
                    <Right>
                      <Text onLongPress={ ()=> Toast.show({
                            position: "bottom",
                            text: "Vechicle Make / Model",
                            buttonText: "Okay",
                            duration: 3000
                        })}> { data.vechicle_registration} </Text> 
                    </Right>                        
                </CardItem>
                <CardItem style={styles.cardItem} >
                    <Left>
                       <Text  style={{ marginLeft: 0 }} onLongPress={ ()=> Toast.show({
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
                        })}> {data.city.name } ({data.city.post_code})</Text>
                    </Right>
                </CardItem>
                <CardItem style={styles.cardItem} >
                    <Left style={{flex: 8, flexWrap: "wrap", marginLeft: 5 }}>
                      <Autolink  selectable email={true} text={data.email } />
                      <Text> / </Text>
                      <Autolink phone={true} text={data.contact_number } />  
                    </Left>
                    <Right style={{flex: 1 }}>
                       {this.renderBookingStatus(data)}
                    </Right>
                </CardItem>
                {this.renderFinishStatus(data)}
              </Card>
            );
          }}
          /> 
          { this.state.loadMore && <Spinner style={{}}/> }
        </View> :
        <Card>
          <CardItem>
            <Body>
              <Text> No bookings available  </Text>
            </Body>
          </CardItem>
        </Card>
      }
      </Content>
    );
  }

}


export default BookingsScreen
