import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import firebase from './FirebaseConnection';

export default class Perfil extends Component{

    constructor(props){
        super(props);
        this.state = {

        };
    }

    render(){
        return(
            <View style={styles.body}>
                <Text style={styles.message}>Bem vindo ao SeriesMax!</Text>
                <Image source={require('../images/photo_perfil.png')} style={styles.image} />

                <View style={styles.areaBotao}>
                    <TouchableOpacity onPress={() => {}} style={styles.botaoLogar}>
                        <Text style={styles.textoBotao}>Atualizar foto</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {}} style={styles.botaoLogar}>
                        <Text style={styles.textoBotao}>Mudar nome</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    body:{
        flex:1,
        backgroundColor:'#2B2929',
        alignItems:'center'
    },
    image:{
        width:120,
        height:120,
        marginTop:20,
        marginBottom:20
    },
    message:{
        fontSize:18,
        color:'#ffffff',
        marginTop:20,
        marginBottom:30
    },
    botaoLogar:{
        height:40,
        width:120,
        margin:10,
        marginTop:20,
        marginBottom:20,
        borderRadius:20,
        borderColor:'#ffffff',
        backgroundColor:'#483d8b'
      },
      textoBotao:{
        color:'#ffffff',
        textAlign:'center',
        padding:9
      },
      areaBotao:{
          flexDirection:'row'
      }
});