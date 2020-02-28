import React, { Component } from 'react';
import { View, Text, TextInput, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import firebase from './FirebaseConnection';

console.disableYellowBox = true;

export default class Login extends Component{

    constructor(props){
      super(props);
      this.state = {
          nome:'',
          email:'',
          senha:'',
          foto:''
      };

      firebase.auth().signOut();

      firebase.auth().onAuthStateChanged((user) => {
        if (user){
          console.log('entrei');
          firebase.database().ref('usuarios').child(user.uid).on('value', (snapshot) => {
            let state = this.state;

            snapshot.forEach((childItem) => {

              if (childItem.val().foto == null && childItem.val().nome == null){
                this.state.foto = '';
                this.state.nome = '';
              }
              this.state.nome = childItem.val().nome;
              this.state.foto = childItem.val().foto;
            });

            this.setState(state);
          })
        }
      });

      this.cadastrar = this.cadastrar.bind(this);
    }

    cadastrar(){

        if (this.state.email != '' && this.state.senha != ''){

            firebase.auth().onAuthStateChanged((user) => {
                if (user){
                    firebase.database().ref('usuarios').child(user.uid).set({
                        nome:this.state.nome,
                        foto:this.state.foto
                    });

                    this.props.navigation.goBack();
                }
            });

            firebase.auth().createUserWithEmailAndPassword(
                this.state.email, 
                this.state.senha
            ).catch((error) =>{
                if (error.code == 'auth/weak-password'){
                    alert('Senha inválida! Digite pelo menos 6 caracteres...');
                }else if (error.code == 'auth/email-already-in-use'){
                    alert('Email já cadastrado! Por favor, entre com outro email...');
                }
                alert(error.code);
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
                        placeholder='Nome' 
                        onChangeText={(text) => this.setState({nome:text})}
                    />

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
                
                <TouchableOpacity onPress={this.cadastrar} style={styles.botaoCadastrar}>
                  <Text style={styles.textoBotao}>Cadastrar</Text>
                </TouchableOpacity>

                <Text style={styles.programador}>Developer by: @Max_Dickinson_</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    body:{
        flex:1,
        padding:50,
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
      marginTop:40
    },
    botaoCadastrar:{
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
      fontStyle:'italic'
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
    },
    programador:{
        marginTop:40,
        fontStyle:'italic',
        color:'#ffffff'
    }
});