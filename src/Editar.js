import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Picker, AsyncStorage } from 'react-native';

import firebase from './FirebaseConnection';

export default class Editar extends Component{

    static navigationOptions = {
        title:'Editar série'
    };

    constructor(props){
        super(props);
        this.state = {
            text:'',
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

        this.remover = this.remover.bind(this);
        this.alterar = this.alterar.bind(this);
    }

    remover(){
    
        let seriesKey = this.props.navigation.getParam('item').key;
        let uid = firebase.auth().currentUser.uid;

        firebase.database().ref('series').child(uid).child(seriesKey).remove();

        alert('Série removida com sucesso!');
        this.props.navigation.goBack();
    }

    alterar(){

        let serieKey = this.props.navigation.getParam('item').key;
        let uid = firebase.auth().currentUser.uid;

        let historico = firebase.database().ref('historico');
        let keyHistorico = historico.push().key; 

        firebase.database().ref('series').child(uid).child(serieKey).set({
            titulo:this.state.text,
            temporada:this.state.tempArray[this.state.indexTemp],
            episodio:this.state.episArray[this.state.indexEpi],
            img:this.props.navigation.getParam('item').img
        });

        historico.child(uid).child(keyHistorico).set({
            titulo:this.state.text,
            temporada:this.state.tempArray[this.state.indexTemp],
            episodio:this.state.episArray[this.state.indexEpi],
            img:this.props.navigation.getParam('item').img
        });

        alert('Série atualizada com sucesso!');

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
                <TextInput style={styles.textInput} placeholder={this.props.navigation.getParam('item').titulo} onChangeText={(text) => this.setState({text:text})}/>

                <Text style={styles.texto}> Temporada </Text>
                    <Picker style={styles.picker} mode='dropdown' selectedValue={this.state.indexTemp} onValueChange={(itemValue, itemIndex) => this.setState({indexTemp:itemValue})}>
                        {indexTemporada}
                    </Picker>

                <Text style={styles.texto}> Episódio </Text>
                    <Picker style={styles.picker} mode='dropdown' selectedValue={this.state.indexEpi} onValueChange={(itemValue, itemIndex) => this.setState({indexEpi:itemValue})}>
                        {indexEpisodio}
                    </Picker>

                <View style={styles.viewButtons}>
                    <TouchableOpacity onPress={this.alterar} style={styles.botaoAtualizar}>
                        <Text style={styles.textButton}> Alterar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.remover} style={styles.botaoRemover}>
                        <Text style={styles.textButton}> Remover</Text>
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
    botaoAtualizar:{
        width:130,
        height:40,
        borderWidth:0.5,
        borderColor:'#ffffff',
        borderRadius:10,
        marginLeft:5,
        alignItems:'center',
        backgroundColor:'#6FCE73'
    },
    botaoRemover:{
        width:130,
        height:40,
        borderWidth:0.5,
        borderColor:'#ffffff',
        borderRadius:10,
        marginLeft:5,
        alignItems:'center',
        backgroundColor:'#C40606'
    },
    picker:{
        marginLeft:10,
        marginRight:10,
        color:'#ffffff'
    },
    viewButtons:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:40,
        margin:30
    },
    textButton:{
        color:'#ffffff',
        fontWeight:'bold',
        fontSize:16,
        marginTop:10,
        textAlign:'center'
    }
});