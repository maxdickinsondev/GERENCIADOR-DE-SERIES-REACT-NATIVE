import React, { Component } from 'react';
import { View, Text, TextInput, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import firebase from './FirebaseConnection';

console.disableYellowBox = true;

export default class Login extends Component{

    constructor(props){
      super(props);
      this.state = {
        email:'',
        senha:''
      };

      firebase.auth().signOut();

      this.cadastrar = this.cadastrar.bind(this);
      this.logar = this.logar.bind(this);
    }

    cadastrar(){
      this.props.navigation.navigate('Cadastro');
    }

    logar(){

      if (this.state.email != '' && this.state.senha != ''){
        firebase.auth().onAuthStateChanged((user) => {
          if (user){
            this.props.navigation.navigate('Tab');
          }
        });

        firebase.auth().signInWithEmailAndPassword(
          this.state.email, 
          this.state.senha
          ).catch((error) => {
            if (error.code == 'auth/wrong-password'){
              alert('Senha inválida!');
            }else if (error.code == 'auth/invalid-email'){
              alert('Email inválido!');
            }
            else{
              alert('Email ou senha inválidos!');
            }
          });
      }
    }

    render(){
        return(
            <View style={styles.body}>
                <Image source={require('../images/logo.png')} style={styles.image} />
                <Text style={styles.nameApp}>SeriesMax</Text>

                <View style={styles.areaInput}>
                  <TextInput 
                    style={styles.input} 
                    placeholder='Email' 
                    onChangeText={(text) => this.setState({email:text})}
                  />

                  <TextInput 
                    style={styles.input} 
                    placeholder='Password'
                    secureTextEntry={true} 
                    onChangeText={(text) => this.setState({senha:text})}
                  />
                </View>
                
                <TouchableOpacity onPress={this.logar} style={styles.botaoLogar}>
                  <Text style={styles.textoBotao}>Logar</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={this.cadastrar}>
                  <Text style={styles.botaoRegistrar}>Registre-se aqui!</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    body:{
        flex:1,
        padding:70,
        backgroundColor:'#6a5acd',
        alignItems:'center'
    },
    image:{
      width:160,
      height:100
    },
    input:{
      height:40,
      width:300,
      margin:10,
      borderWidth:1,
      padding:10,
      paddingRight:20,
      borderRadius:20,
      borderColor:'#ffffff',
      backgroundColor:'#ffffff'
    },
    areaInput:{
      flexDirection:'column',
      marginTop:50
    },
    botaoLogar:{
      height:40,
      width:300,
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
    botaoRegistrar:{
      color:'#ffffff',
      fontStyle:'italic',
      marginTop:10
    },
    nameApp:{
      fontSize:24,
      color:'#ffffff',
      textAlign:'center'
    },
    logoInputEmail:{
      width:26,
      height:26
    },
    logoInputPass:{
      width:26,
      height:26
    }
});