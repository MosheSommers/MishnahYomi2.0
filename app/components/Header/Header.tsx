import React from 'react';
import {
  Text, 
  View,
  StyleSheet,
} from 'react-native';

interface IHeaderProps{
    isHebrew:boolean
}
export default class Header extends React.Component<IHeaderProps>{
 
  render(){
    return (
      <View style={styles.header}>
        <Text style={styles.text}>{this.props.isHebrew ?  `משנה יומי` : `Mishnah Yomi` }</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
    header:{
      flex:1,
      justifyContent: "center",
    },
    text: {
      fontSize: 40,
      fontWeight: '600',
      color: '#000',
      alignSelf:'center'
    }
  });
