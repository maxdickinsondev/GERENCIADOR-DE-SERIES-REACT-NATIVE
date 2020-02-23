import React, { Componen } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import Historico from './Historico';

const StackNavigator = createStackNavigator({
    Historico:{
        screen:Historico,
        navigationOptions:{
            title:'Histórico'
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