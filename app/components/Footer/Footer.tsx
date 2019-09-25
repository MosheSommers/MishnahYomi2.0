

import React from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Image
} from 'react-native';

interface IFooterProps {
    toggleSettings:()=>void,
    showSettings:boolean
}

export default class Footer extends React.Component<IFooterProps>{
 
  render(){
    return (
      <View style={styles.footer}>
        <TouchableWithoutFeedback onPress={this.props.toggleSettings}>            
          <Image
            style={{width: 66, height: 58, alignSelf:'flex-end',opacity:this.props.showSettings? 0.5 : 1}}
            source={{uri:'https://img.icons8.com/color/48/000000/settings.png' }}
         /> 
        </TouchableWithoutFeedback>  
      </View>
    );
  }
}

const styles = StyleSheet.create({
    footer:{
        flex: 1,
        alignSelf:"flex-end",
        marginBottom:0
    }
  });
