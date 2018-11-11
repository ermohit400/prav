import React, { Component } from "react";
import { Provider } from "react-redux";
import ReduxNavigation from './navigation/ReduxNavigation'
import getStore from "./store";
import getTheme from './theme/components';
import material from './theme/variables/material';
import { StyleProvider } from 'native-base';
const store = getStore();

export default class PocketRent extends React.Component {
	componentWillMount() {
  	}
	
	render() {
		return(
	        <Provider store={store}>
	        	<StyleProvider style={getTheme(material)} >
	            	<ReduxNavigation />
	            </StyleProvider>
	        </Provider>
		)
    }

}
