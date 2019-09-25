
import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import Header  from './app/components/Header/Header';
import TodaysMishnah from './app/components/TodaysMishnah/TodaysMishnah';
import Settings from './app/components/Settings/Settings';
import Footer  from './app/components/Footer/Footer';

interface IAppProps{
  showSettings:boolean
}

interface IAppState{
  showSettings:boolean,
  startDate:string, 
  isHebrew:boolean
}

export default class App extends React.Component<IAppProps, IAppState> {
  constructor(props){
    super(props);
    this.state = { 
      showSettings:false,
      startDate:"2019-08-17", //The default date for my MishnahYomi group
      isHebrew:true
    };
    this.getStoredSetting(); 
  }

  getStoredSetting: () => void = () => {
    AsyncStorage.getItem('startDate').then((startDate) => {
      if(startDate){
        this.setState({
          showSettings:this.state.showSettings,
          startDate
        });
      }
    });
    AsyncStorage.getItem('isHebrew').then((isHebrew) => {
      if(isHebrew){
        this.setState({
          showSettings:this.state.showSettings,
          startDate:this.state.startDate,
          isHebrew:isHebrew === '1'
        });
      }
    });

  };

  toggleSettings:() => void = () => { 
    this.setState({
      showSettings:!this.state.showSettings
    });
  };

  setDate:(startDate:string) => void = (startDate) => {
    this.setState({startDate, showSettings:false});
    AsyncStorage.setItem('startDate',startDate);
  }

  setLanguage: (isHebrew:boolean) => void = (isHebrew) => {
    this.setState({isHebrew: isHebrew, showSettings:false});
    AsyncStorage.setItem('isHebrew', isHebrew ? '1' : '0');
  }

  render(){
    return (
      <View style={{flex:1}}>
        <ImageBackground
          accessibilityRole={'image'}
          source={require('./mishnahbackground.jpg')}
          style={styles.background}
          imageStyle={styles.logo}>   
                <Header isHebrew={this.state.isHebrew} />
                <View>
                  <View style={styles.sectionContainer}>
                    {!this.state.showSettings ?
                      <TodaysMishnah 
                        isHebrew={this.state.isHebrew}
                        startDate={this.state.startDate}/>:
                      <Settings 
                        isHebrew={this.state.isHebrew}
                        setLanguage={this.setLanguage}
                        startDate={this.state.startDate} 
                        setDate={this.setDate} />   
                    }
                  </View>    
                </View>
                <Footer showSettings={this.state.showSettings} toggleSettings={this.toggleSettings}/>
        </ImageBackground>
      </View>
      
    );
  }

};

const styles = StyleSheet.create({
  sectionContainer: {
    paddingTop: 96,
    paddingBottom:96
  },
  logo: {
    opacity: 0.2,
    overflow: 'visible',
    resizeMode: 'cover',
    marginLeft: -128,
    marginBottom: -192,
  },
  
  background: {
    paddingBottom: 96,
    paddingTop: 96,
    paddingHorizontal: 32,
  }
});
