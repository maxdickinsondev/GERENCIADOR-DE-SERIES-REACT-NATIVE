import React, { Componen } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Perfil from './Perfil'; 

const StackNavigator = createStackNavigator({
    Perfil:{
        screen:Perfil,
        navigationOptions:{
            title:'Perfil'
        }
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