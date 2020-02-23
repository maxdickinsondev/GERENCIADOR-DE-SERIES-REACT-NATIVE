import React, { Component } from 'react';
import { View, Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';

import Series from './src/Home';
import Historico from './src/HistoricoList';
import Hist from './src/HistoricoStack';

console.disableYellowBox = true;

const TabNavigator = createMaterialTopTabNavigator({
  Séries:{
    screen:Series,
    navigationOptions:{
      tabBarIcon:({focused, tintColor}) => {
        if (focused){
          return (
            <Image source={require('./images/computer_blue.png')} style={{width:26, height:26}}/>
          )
        }else{
          return(
            <Image source={require('./images/computer_white.png')} style={{width:26, height:26}}/>
          )
        }
      }
    }
  },
  Histórico:{
    screen:Hist,
    navigationOptions:{
      tabBarIcon:({focused, tintColor}) => {
        if (focused){
            return(
                <Image source={require('./images/historico_color.png')} style={{width:26, height:26}}/>
            )
        }else{
            return(
                <Image source={require('./images/historico_black.png')} style={{width:26, height:26}}/>
            )
        }
      } 
    }
  },
  Desenvolvedor:{
    screen:Historico,
    navigationOptions:{
      tabBarIcon:({focused, tintColor}) => {
        if (focused){
            return(
                <Image source={require('./images/developer_color.png')} style={{width:26, height:26}}/>
            )
        }else{
            return(
                <Image source={require('./images/developer_white.png')} style={{width:26, height:26}}/>
            )
        }
   } 
    }
  }
}, {
  tabBarOptions:{
    upperCaseLabel:false,
    showIcon:true,
    tabStyle:{
      backgroundColor:'#6a5acd'
    }
  },
  tabBarPosition:'bottom'
});

export default createAppContainer(TabNavigator);

