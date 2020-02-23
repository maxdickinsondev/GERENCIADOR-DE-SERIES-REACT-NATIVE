import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default class Favoritos extends Component{
    
    render(){
        return(
            <View style={styles.body}>
                <Text style={styles.title}> Quem sou eu? </Text>
                <Image style={styles.image} source={require('../images/perfil.jpeg')}/>
                <Text style={styles.texto}> Apaixonado por programação, procuro estudar mais e mais a
                    cada dia para resolver problemas e programar soluções nas tecnologias mais atuais
                    do mercado.
                </Text>
                <Text style={styles.programador}> @Max_Dickinson_ </Text>
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
    title:{
        fontSize:20,
        color:'#ffffff',
        fontWeight:'bold',
        textAlign:'center',
        marginTop:20,
        marginBottom:20
    },
    texto:{
        marginTop:20,
        fontSize:16,
        color:'#ffffff',
        textAlign:'center'
    },
    image:{
        width:200,
        height:200,
        borderRadius:100
    },
    programador:{
        marginTop:10,
        fontSize:18,
        color:'#ffffff',
        fontWeight:'bold',
        fontStyle:'italic',
        textAlign:'center'
    }
});