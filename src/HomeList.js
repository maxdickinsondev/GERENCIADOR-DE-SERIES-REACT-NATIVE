import React, { Component } from 'react';
import { withNavigationFocus } from 'react-navigation';
import { View, Text, StyleSheet, FlatList, Image, TouchableHighlight } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import firebase from './FirebaseConnection';

 class HomeList extends Component{

    static navigationOptions = {
        tabBarIcon:() => (
         <Image source={require('../images/plus.png')} style={{width:26, height:26}}/>
     )
    };

    constructor(props){
        super(props);
        this.state = {
            lista:[]
        };

        firebase.auth().onAuthStateChanged((user) => {
            if (user){
                
                firebase.database().ref('series').child(user.uid).on('value', (snapshot) => {
                    let state = this.state;
                    state.lista = [];
                
                    snapshot.forEach((childItem) => {
                    state.lista.push({
                        key:childItem.key,
                        titulo:childItem.val().titulo,
                        temporada:childItem.val().temporada,
                        episodio:childItem.val().episodio,
                        img:childItem.val().img
                        });
                    });
        
                    
                    console.log(this.state.lista);
                    this.setState(state);
                });
            }
        });

        

        console.log(this.state.lista);
        this.clicou = this.clicou.bind(this);
    }

    clicou(){
        this.props.navigation.navigate('SeriesEdit')
    }

    render(){

        return(
            <View style={styles.body}>
               
                <FlatList 
                    data={this.state.lista}                 
                    renderItem={({item}) => <ListaSerie data={item} navegar={this.props.navigation} />}
                />

                <View style={styles.positioButton}>
                    <TouchableOpacity onPress={this.clicou} style={styles.botaoImage}>
                        <Image source={require('../images/add.png')} style={styles.addSerie}/>
                    </TouchableOpacity>
                </View>

                
            </View>
        );
    }
}

class ListaSerie extends Component{

    constructor(props){
        super(props);
        this.state = {};

        this.editar = this.editar.bind(this);
    }

    editar(){
        this.props.navegar.navigate('Editar', {item:this.props.data});
    }

    render(){
        return(
            <TouchableHighlight underlayColor='#434040' style={styles.seriesItem} onPress={this.editar}>
                <View style={styles.seriesInfo}>
                    <Image source={this.props.data.img} style={styles.image}/>
                    <View>
                        <Text style={styles.titleSerie}> {this.props.data.titulo} </Text>
                        
                        <View style={styles.tempInfo}>
                            <Text style={styles.textTemp}> {this.props.data.temporada} </Text>
                            <Text style={styles.textTemp}> x </Text>
                            <Text style={styles.textEpisodio}> {this.props.data.episodio} </Text>
                        </View>

                    </View>
                </View>
            </TouchableHighlight>
        );
    }
}

const styles = StyleSheet.create({
    body:{
        flex:1,
        backgroundColor:'#2B2929'
    },
    seriesItem:{
        height:100,
        marginTop:20,
        justifyContent:'center'
    },
    image:{
        width:65,
        height:100,
        margin:10
    },
    seriesInfo:{
        flexDirection:'row',
        alignItems:'center'
    },
    titleSerie:{
        fontSize:18,
        fontWeight:'bold',
        color:'#ffffff'
    },
    addSerie:{
        width:50,
        height:50,
        borderRadius:25
    },
    botaoImage:{
        alignItems:'flex-end',
        marginRight:20,
        marginBottom:15
    },
    tempInfo:{
        flexDirection:'row'
    },
    textEpisodio:{
        fontSize:14,
        color:'#ffffff'
    },
    textTemp:{
        fontSize:14,
        color:'#ffffff'
    },
    positioButton:{
        position:'absolute',
        bottom:15,
        right:10
    }
});

export default withNavigationFocus(HomeList);