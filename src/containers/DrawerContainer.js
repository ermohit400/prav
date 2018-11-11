import React from "react";
import { AppRegistry, Image, StatusBar, ImageBackground, TouchableOpacity } from "react-native";
import { NavigationActions } from 'react-navigation'
import {
  Button,
  Text,
  Container,
  List,
  ListItem,
  Content,
  Icon,
  Body,
  Left,
  Thumbnail
} from "native-base";


import ActiveSwitch from '../components/ActiveSwitch';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as userActions from "../actions/user";

const routes = [
{
  name: "Dashboard",
  onPress: (p)=> {
    p.navigation.navigate('homeScreen')
  }
}, 
{
  name: "Settings",
  onPress: (p)=> {
    p.navigation.navigate('settingsScreen')
  }
},
{
  name: "About",
  onPress: (p)=> {
    p.navigation.navigate('aboutScreen')
  }
},
{
  name: "Contact Us",
  onPress: (p)=> {
    p.navigation.navigate('contactScreen')
  }
},

{
  name: "Logout",
  icon_name: "log-out",
  onPress: (p)=> {
    p.logoutUser().then(res => {
      console.log(res)
      const actionToDispatch = NavigationActions.reset({
        index: 0,
        key: null,  // black magic
        actions: [NavigationActions.navigate({ routeName: 'loginStack' })]
      })
      p.navigation.dispatch(actionToDispatch)
    })
  }
}
];
class DrawerContainer extends React.Component {

  render() {
    const { navigation, current_user_info } = this.props
    return (
      <Container>
        <Content>
          <ImageBackground
            source={{uri: current_user_info.background_image }}
            style={{
              height: 120,
              alignSelf: "stretch",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
          <TouchableOpacity onPress={ ()=> this.props.navigation.navigate('profileScreen') }>
              <Thumbnail
                style={{marginTop: 25 }}
                source={{
                  uri: current_user_info.detail_image_url
                }}
              />
              <Text style={{color: "#fff"}} > {current_user_info.full_name} </Text>
          </TouchableOpacity>
          </ImageBackground>
            <ListItem >
              <Body>
                  <Text>Availability</Text>
              </Body>
              <ActiveSwitch />
            </ListItem>
          <List
            icon
            dataArray={routes}
            renderRow={data => {
              return (
                <ListItem
                  button
                  onPress={() => data.onPress(this.props) }
                >
                
                { data.icon_name &&
                  <Icon fontSize='12' name={data.icon_name} />
                }
                
                <Body>
                  <Text>{data.name}</Text>
                </Body>
                </ListItem>
              );
            }}
          />
        </Content>
      </Container>
    )
  }
}

export default connect(
    state => ({
        current_user_info: state.current_user.info
    }),
    dispatch => bindActionCreators(userActions, dispatch)
)(DrawerContainer);