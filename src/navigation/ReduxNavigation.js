import React from 'react'
import * as ReactNavigation from 'react-navigation'
import { connect } from 'react-redux'
import AppNavigation from './AppNavigation'
import { Root } from "native-base";
import Notification from '../components/Notification'
// here is our redux-aware our smart component
function ReduxNavigation (props) {
  const { dispatch, nav } = props

  return(
  	<Root>
      <Notification/>
  		<AppNavigation/>
  	</Root>
  )
}

const mapStateToProps = state => ({ nav: state.nav })
export default connect(mapStateToProps)(ReduxNavigation)
