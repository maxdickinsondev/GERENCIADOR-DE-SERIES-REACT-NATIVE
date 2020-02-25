import React, { Componen } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Login from './Login';
import Cadastro from './Cadastro';
import Tab from './TabNavigator';

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
        headerStyle:{
            backgroundColor:'#6a5acd',
            height:100
        },
        headerTintColor:'#ffffff',
        headerTitleAlign:'center'
    }
});

export default createAppContainer(StackNavigator);