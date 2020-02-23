import React, { Componen } from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import HomeList from './HomeList';
import SeriesEdit from './SeriesEdit';
import Editar from './Editar';

const StackNavigator = createStackNavigator({
    HomeList:{
        screen:HomeList,
        navigationOptions:{
            title:'SeriesMax'
        }
    },
    SeriesEdit:{
        screen:SeriesEdit
    },
    Editar:{
        screen:Editar
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