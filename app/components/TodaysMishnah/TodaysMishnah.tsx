import React from 'react';
import {Text, StyleSheet, View} from 'react-native';
import { mishnahData } from './mishnahData';
import  gematriya  from 'gematriya';

interface ITodaysMishnahProps{
    startDate:string,
    isHebrew:boolean
}
export default class TodaysMishnah extends React.Component<ITodaysMishnahProps>{
    
  getNumberOfDays:() => number = () => {
    const today = new Date();
    const startingDay = new Date(this.props.startDate);
    return Math.floor((today.getTime() - startingDay.getTime()) / (1000 * 3600 * 24));
  }

  getTodaysMishnah:() => JSX.Element = () => {
    const days = this.getNumberOfDays();
    const upto = days * 2;//Last mishna learned
    const masechtosSize = mishnahData[31]; //Amount of mishnayos in each Masechta
    const masechtos = mishnahData[0]; //Masechta names
    const masechtosEnglish = mishnahData[33];
    let mishnayosCounter = 0;
    let i = 1;
    while (mishnayosCounter + parseInt(masechtosSize[i])  < upto){
      mishnayosCounter = mishnayosCounter + parseInt(masechtosSize[i]);
      i = i + 1;
    };
    //If if upto is one more than masechta size that menas we're split over tow masechtos
    const splitMasechta = mishnayosCounter + parseInt(masechtosSize[i])  === (upto + 1);
    // i now equals the index of the Masechta we're currently learning
    let perek = 1;
    while(mishnayosCounter + parseInt(mishnahData[perek][i]) <= upto){
      mishnayosCounter = mishnayosCounter + parseInt(mishnahData[perek][i]);
      perek += 1;
    }

    //Current mishna is (the one after) mishnayos we learned minus the amount upto this perek 
    const mishna = upto - mishnayosCounter + 1;
    const isSplit = parseInt(mishnahData[perek][i])  < mishna + 1; 
    const mishnaFrom = (this.props.isHebrew) ?
       `מסכת ${masechtos[i]}  פרק ${gematriya(perek, {geresh: false})} משנה ${gematriya(mishna,  {geresh: false})} - `:
       `Maseches ${masechtosEnglish[i]}  Perek ${perek} Mishna ${mishna} - `;
    const mishnaTo = (this.props.isHebrew) ? 
    `${
      (!isSplit) ? //Not split just do next mishna
      gematriya(mishna + 1,  {geresh: false}) : 
      (!splitMasechta) ? //Same masechta next perek mishna 1 / Next masechta perek 1 mishna 1
        `פרק ${gematriya(perek + 1, {geresh: false})} משנה ${gematriya(1,  {geresh: false})}` :
        `מסכת ${masechtos[i + 1]} פרק ${gematriya(1,  {geresh: false})} משנה ${gematriya(1, {geresh: false})}`
    }`:
      `${(!isSplit) ? //Not split just do next mishna
      mishna + 1 : 
      (!splitMasechta) ? //Same masechta next perek mishna 1 / Next masechta perek 1 mishna 1
        `Perek ${perek + 1} Mishna 1` :
        `Maseches ${masechtosEnglish[i + 1]} Perek 1 Mishna 1`
      }`;

    return  <>
              <Text>{mishnaFrom}</Text>
              <Text>{mishnaTo}</Text>
            </>;
  }

  render(){
    return (
      <View style={styles.todaysMishnah}><Text style={styles.text}>{this.getTodaysMishnah()}</Text></View>
    );
  }
}

const styles = StyleSheet.create({
  todaysMishnah:{
    textAlign: 'center', 
    fontWeight: 'bold',
    fontSize: 25,
    height:200,
    marginLeft: 30
  },

    text: {
      color: '#000',
      alignSelf:'center',
      fontWeight: 'bold',
      fontSize: 25,
      height:200,textAlign:"center"
    },


 
});
