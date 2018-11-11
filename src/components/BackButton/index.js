import React from 'react';
import {
  Button,
  Icon,
} from "native-base";;

export default (props) => (
	<Button
	      transparent
	      onPress={() => props.navigation.goBack() }
	    >
	      <Icon name="md-arrow-round-back" />
	</Button>
)