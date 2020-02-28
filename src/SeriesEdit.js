import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, Picker, AsyncStorage } from 'react-native';

import * as ImagePicker from 'expo-image-picker';
import firebase from './FirebaseConnection';

export default class HomeList extends Component{

    static navigationOptions = {
        title:'Adicionar série'
    };

    constructor(props){
        super(props);
        this.state = {
            text:'',
            img:null,
            indexTemp:0,
            indexEpi:0,
            tempArray:[
                '1','2','3','4','5','6','7','8','9','10','11','12','13','14','15'
            ],
            episArray:[
                '1','2','3','4','5','6','7','8','9','10','11','12','13','14','15','16','17','18','19',
                '20','21','22','23'
            ]
        };

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

        let uid = firebase.auth().currentUser.uid;    

        let series = firebase.database().ref('series');
        let chave = series.push().key;

        let historico = firebase.database().ref('historico');
        let keyHistorico = historico.push().key;        

        series.child(uid).child(chave).set({
            titulo:this.state.text,
            temporada:this.state.tempArray[this.state.indexTemp],
            episodio:this.state.episArray[this.state.indexEpi],
            img:this.state.img
        });

        historico.child(uid).child(keyHistorico).set({
            titulo:this.state.text,
            temporada:this.state.tempArray[this.state.indexTemp],
            episodio:this.state.episArray[this.state.indexEpi],
            img:this.state.img
        });

        alert('Nova série cadastrada com sucesso!');
        this.props.navigation.goBack();
    }

    render(){

        let indexTemporada = this.state.tempArray.map((v, k) => {
            return <Picker.Item key={k} value={k} label={v} />
        });

        let indexEpisodio = this.state.episArray.map((v, k) => {
            return <Picker.Item key={k} value={k} label={v} />
        });

        return(
            <View style={styles.body}> 
                <Text style={styles.texto}> Nome </Text>                
                <TextInput style={styles.textInput} placeholder='Digite o nome da série' onChangeText={(text) => this.setState({text:text})}/>
            
                <Text style={styles.texto}> Temporada </Text>
                <Picker style={styles.picker} mode='dropdown' selectedValue={this.state.indexTemp} onValueChange={(itemValue, itemIndex) => this.setState({indexTemp:itemValue})}>
                    {indexTemporada}
                </Picker>

                <Text style={styles.texto}> Episódio </Text>
                <Picker style={styles.picker} mode='dropdown' selectedValue={this.state.indexEpi} onValueChange={(itemValue, itemIndex) => this.setState({indexEpi:itemValue})}>
                    {indexEpisodio}
                </Picker>

                <View style={styles.viewButtons}>
                    <View style={styles.linhaBotao}>
                        <TouchableOpacity onPress={this.pickerImage} style={[styles.imagemBotao, {marginLeft:50}]}>
                            <Image source={require('../images/s.png')} style={styles.imagemBotao}/>
                        </TouchableOpacity>
                        <Text style={styles.textButton}> Escolha uma imagem </Text>
                    </View>

                    <View style={styles.linhaBotao}>
                        <TouchableOpacity onPress={this.salvar} style={styles.imagemBotao}>
                            <Image source={require('../images/salvar.png')} style={styles.imagemBotao}/>
                        </TouchableOpacity>
                        <Text style={styles.textButton}> Salvar informações</Text>
                    </View>
                    
                </View>

                
            </View>
        );
    }
}

const styles = StyleSheet.create({
    body:{
        flex:1,
        backgroundColor:'#2B2929',
        flexDirection:'column'
    },
    textInput:{
        margin:10,
        padding:10,
        borderWidth:0.5,
        borderColor:'#ffffff',
        borderRadius:10,
        fontStyle:'italic',
        justifyContent:'center',
        color:'#ffffff',
        height:40
    },
    texto:{
        marginTop:10,
        margin:10,
        fontSize:16,
        color:'#ffffff'
    },
    imagemBotao:{
        width:50,
        height:50,
        marginLeft:5
    },
    picker:{
        marginLeft:10,
        marginRight:10,
        color:'#ffffff'
    },
    linhaBotao:{
       flexDirection:'column'
    },
    textImagem:{
        marginTop:20,
        marginBottom:20, 
        margin:10, 
        fontSize:16, 
        color:'#ffffff'
    },
    viewButtons:{
        flexDirection:'row',
        justifyContent:'space-around',
        marginTop:30
    },
    textButton:{
        color:'#ffffff',
        marginTop:10,
        textAlign:'center'
    }
});