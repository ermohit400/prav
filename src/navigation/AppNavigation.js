import React from 'react'
import { Text, Animated, Easing } from 'react-native'
import { createStackNavigator, createDrawerNavigator } from 'react-navigation'

import DrawerContainer from '../containers/DrawerContainer'
import Authenticate from "../containers/authenticate";
import ForgottenPasswordScreen from '../containers/forgotten_password'
import Login from "../containers/login";
import Home from "../containers/home";
import About from "../containers/about";
import Contact from "../containers/contact";
import Profile from "../containers/profile";
import MarkFinished from "../containers/mark_finished";
import BookingScreen from "../containers/booking";
import Settings from "../containers/settings";
import SignupScreen from "../containers/signup";

// https://github.com/react-community/react-navigation/issues/1254
const noTransitionConfig = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0
  }
})

// drawer stack
const DrawerStack = createDrawerNavigator({
  homeScreen: { screen: Home },
  bookingScreen: { screen: BookingScreen},
  settingsScreen: { screen: Settings},
  aboutScreen: {screen: About},
  contactScreen: {screen: Contact},
  profileScreen: {screen: Profile},
  markFinishedScreen: { screen: MarkFinished}
}, {
  gesturesEnabled: true,
  contentComponent: (props) => <DrawerContainer {...props} />
})

const DrawerNavigation = createStackNavigator({
  DrawerStack: { screen: DrawerStack }
}, {headerMode: 'none'})

// login stack
const LoginStack = createStackNavigator({
  authenticateScreen: { screen: Authenticate },
  forgotpasswordScreen: { screen: ForgottenPasswordScreen },
  loginScreen: { screen: Login },
  signupScreen: { screen: SignupScreen},
}, {headerMode: 'none'})

// Manifest of possible screens
const PrimaryNav = createStackNavigator({
  loginStack: { screen: LoginStack },
  homeStack: { screen: DrawerNavigation }
}, {
  headerMode: 'none',
  title: 'PocketRent',
  initialRouteName: 'loginStack',
  transitionConfig: noTransitionConfig
})

export default PrimaryNav
