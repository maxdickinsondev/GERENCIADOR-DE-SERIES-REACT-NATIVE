import React, { Componen } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from './src/Login';
import Cadastro from './src/Cadastro';
import Tab from './src/TabNavigator';

const StackNavigator = createStackNavigator({
    Login:{
        screen:Login,
        navigationOptions:{
            title:'SeriesMax'
        }
    },
    Cadastro:{
        screen:Cadastro
    },
    Tab:{
        screen:Tab
    }
}, {
    defaultNavigationOptions:{
      header:null,
        headerStyle:{
            backgroundColor:'#6a5acd',
            height:100
        },
        headerTintColor:'#ffffff',
        headerTitleAlign:'center'
    }
});

export default createAppContainer(StackNavigator);