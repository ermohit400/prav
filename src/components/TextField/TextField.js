import React from 'react';
import { Item, Label, Input } from 'native-base';
import styles from './styles';

export default (props) => (
  <Item floatingLabel >
    <Label style={props.labelStyle} >{props.name}</Label>
    <Input
      {...props}
      autoCapitalize="none"
      style={props.style ? props.style : props.big ? styles.big : styles.small}
      maxLength={props.big ? 140 : 30}
      multiline={props.big}
      numberOfLines={props.big ? 5 : 1}
    />
  </Item>
)
