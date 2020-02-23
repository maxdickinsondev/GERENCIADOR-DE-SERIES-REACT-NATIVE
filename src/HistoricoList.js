import React, { Componen } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Favoritos from './Favoritos';

const StackNavigator = createStackNavigator({
    Favoritos:{
        screen:Favoritos,
        navigationOptions:{
            title:'Informações'
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