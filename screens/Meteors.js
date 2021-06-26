import React, { Component } from 'react';
import { Text, View,Alert,ImageBackground } from 'react-native';
import axios from "axios";
export default class MeteorScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
            meteors:{}
        }
    }
    getMeteor =()=>{
        axios.get("https://api.nasa.gov/neo/rest/v1/feed?api_key=nzIRof98KUaEOcPz4BJPBjqxHHX6eB0EjarbxV5U")
        .then(response=>{
            this.setState({meteors:response.data.near_earth_object})
        })
        .catch(error=>{
            alert(error.message)
        })
    }
    componentDidMount(){this.getMeteor()}
    render() {
        if (Object.keys(this.state.meteors).length === 0) {
            return (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}>
                    <Text>Loading</Text>
                </View>
            )
        } else {
            let meteor_arr = Object.keys(this.state.meteors)
            .map(meteor_date => { return this.state.meteors[meteor_date] }) 
            let meteors = [].concat.apply([], meteor_arr); 
            meteors.forEach(function (element) {
                 let diameter = (element.estimated_diameter.kilometers.estimated_diameter_min + 
                    element.estimated_diameter.kilometers.estimated_diameter_max) / 2
                     let threatScore = (diameter / element.close_approach_data[0].miss_distance.kilometers) * 1000000000 
                     element.threat_score = threatScore; });
            return (
                <View style={styles.container}>
                <SafeAreaView style={styles.droidSafeArea} />
                <ImageBackground source={require('./assets/meteor_speed1.gif')} style={styles.backgroundImage}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.titleText}>Meteors</Text>
                    </View> 
                    </ImageBackground>

                    </View>
            )
    }
}}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    titleContainer: {
        flex: 0.1,
        justifyContent: "center",
        alignItems: "center"
    },
    titleText: {
        fontSize: 30,
        fontWeight: "bold",
        color: "white"
    },
    mapContainer: {
        flex: 0.7
    },
    map: {
        width: "100%",
        height: "100%"
    },
    info:{
        flex:0.2,
        backgroundColor:'white',
        marginTop:-10,
        padding:30,
        borderTopLeftRadius:30,
        borderTopRightRadius:30
    },
    infoText:{
        fontSize:20,
        color:'black',
        fontWeight:'bold'
    }
})

