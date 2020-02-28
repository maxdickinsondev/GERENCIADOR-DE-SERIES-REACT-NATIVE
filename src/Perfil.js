import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import firebase from './FirebaseConnection';

export default class Perfil extends Component{

    constructor(props){
        super(props);
        this.state = {
            nome:'',
            img:null
        };

        firebase.auth().onAuthStateChanged((user) => {
            if (user){
                firebase.database().ref('usuarios').child(user.uid).on('value', (snapshot) => {
                    

                    snapshot.forEach((childItem) => {
                        if (childItem.val().nome == null){
                            this.state.nome = '';
                        }
                        this.state.nome = snapshot.val().nome;
                        this.state.img = snapshot.val().foto
                    });
                    
                    this.setState(this.state);
                });
            }
        }); 

        this.salvar = this.salvar.bind(this);
    }

    pickerImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1
        });

        if (!result.cancelled){
            this.setState({img:result});
        }

        alert('Imagem selecionada com sucesso!');
    }

    salvar(){

        firebase.auth().onAuthStateChanged((user) => {
            if (user){
                firebase.database().ref('usuarios').child(user.uid).set({
                    foto:this.state.img,
                    nome:this.state.nome
                });

                alert('Perfil atualizado com sucesso!');
            }
        }); 
    }

    render(){
        return(
            <View style={styles.body}>
                <Text style={styles.message}>Bem vindo ao SeriesMax!</Text>
                <Image 
                    source={this.state.img ? this.state.img : require('../images/photo_perfil.png')} 
                    style={styles.image} 
                />

                <Text style={styles.textoNome}> {this.state.nome} </Text>

                <View style={styles.areaBotao}>
                    <TouchableOpacity onPress={this.pickerImage} style={styles.botaoLogar}>
                        <Text style={styles.textoBotao}>Atualizar foto</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.salvar} style={styles.botaoLogar}>
                        <Text style={styles.textoBotao}>Salvar dados</Text>
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
        marginBottom:10,
        borderRadius:60
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
      },
      textoNome:{
          fontSize:18,
          color:'#ffffff',
          marginBottom:30
      }
});