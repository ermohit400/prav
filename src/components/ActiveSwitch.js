import React, { Component } from 'react';
import { Switch, Toast } from 'native-base';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Spinner } from 'native-base'
import * as userActions from "../actions/user";

class ActiveSwitch extends React.Component {
 constructor(props) {
    super(props);
    this.state = {
      isProcessing: false
    }
    this.onValueChange = this.onValueChange.bind(this);
  }

 onValueChange(){
  (async () => {
    this.setState({
      isProcessing: true,
    })
    console.log( 'info', this.props.current_user.info )
    const {humanize_availability_status} = this.props.current_user.info
    var message
    if(!humanize_availability_status || humanize_availability_status == 'inactive'){
      this.props.switchAvailability('active')
      .then(res => {
        message = 'You can now receive bookings'
        Toast.show({
          text: message,
          type: 'success',
          position: 'bottom',
          buttonText: 'Okay',
          onClose: ()=> {
            console.log("Closed")
          }
        })
        this.setState({
          isProcessing: false,
        })
      })
      .catch(error => {
       const messages = _.get(error, 'message')
       console.log( messages);
       this.setState({
        isProcessing: false,
       });
        
      });
    }

    if(humanize_availability_status == 'active') {
      this.props.switchAvailability('inactive').then(res => {
        message = 'Receiving jobs are turned off'
        Toast.show({
          text: message,
          type: 'danger',
          position: 'bottom',
          buttonText: 'Okay',
          onClose: ()=> {
            console.log("Closed")
          }
        })
        this.setState({
          isProcessing: false,
        })
      })
      .catch(error => {
       const messages = _.get(error, 'message')
       console.log( messages);
       this.setState({
        isProcessing: false,
       });
      })
    }
    
  })();
 }
 render(){
  const {humanize_availability_status} = this.props.current_user.info
  if(this.state.isProcessing){
    return(
      <Spinner style={{height: 10}}/>
    )
  }else{  
    return(
      <Switch 
        value={ humanize_availability_status == 'active' } 
        onValueChange={ ()=> this.onValueChange() }
        />
    )
  }
 }
}

export default connect(
    state => ({
        current_user: state.current_user,
    }),
    dispatch => bindActionCreators(userActions, dispatch)
)(ActiveSwitch);
