
import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  View,
  Text,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import Header  from './app/components/Header/Header';
import TodaysMishnah from './app/components/TodaysMishnah/TodaysMishnah';
import Settings from './app/components/Settings/Settings';
import Footer  from './app/components/Footer/Footer';

import { observer } from "mobx-react";
import { observable } from 'mobx';

@observer
export default class App extends React.Component {
 
  
  constructor(props){
    super(props);
    this.getStoredSetting(); 
  }

  @observable showSettings: boolean = false;
  @observable startDate: string = "2019-08-17"; //The default date for my MishnahYomi group
  @observable isHebrew: boolean = false;

  getStoredSetting: () => void = () => {
    AsyncStorage.getItem('startDate').then((startDate) => {
      if(startDate){
        this.startDate = startDate;
      }
    });
    AsyncStorage.getItem('isHebrew').then((isHebrew) => {
      if(isHebrew){
        this.isHebrew = isHebrew === '1';
      }
    });

  };

  toggleSettings:() => void = () => { 
    this.showSettings = !this.showSettings;
  };

  setDate:(startDate:string) => void = (startDate) => {
    this.startDate = startDate;
    this.showSettings = false;
    AsyncStorage.setItem('startDate',startDate);
  }

  setLanguage: (isHebrew:boolean) => void = (isHebrew) => {
    this.isHebrew = isHebrew;
    this.showSettings = false;
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
                <Header isHebrew={this.isHebrew} />
                {/* <View><Text>{this.isBeingObserved ? `Cool I'm being observed` : `SHHH..`}</Text></View> */}
                <View>
                  <View style={styles.sectionContainer}>
                    {!this.showSettings ?
                      <TodaysMishnah 
                        isHebrew={this.isHebrew}
                        startDate={this.startDate}/>:
                      <Settings 
                        isHebrew={this.isHebrew}
                        setLanguage={this.setLanguage}
                        startDate={this.startDate} 
                        setDate={this.setDate} />   
                    }
                  </View>    
                </View>
                <Footer showSettings={this.showSettings} toggleSettings={this.toggleSettings}/>
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
