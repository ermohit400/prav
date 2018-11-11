import React from 'react';
import {
  Button,
  Icon,
} from "native-base";;

export default (props) => (
	<Button
      iconLeft
      transparent
      onPress={() => props.navigation.navigate("DrawerOpen") }
    >
      <Icon style={{marginLeft:0}}name="menu" />
    </Button>
)


