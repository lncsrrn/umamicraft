import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

const Splash = ([navigation]) => {

    useEffect(()=>{
        setTimeout(()=>{
        navigation.navigate('Home');
        },2000)
    })
  return (
    <View style={{image: "./assets/logo-1.png",backgroundColor:"white", flex:1, justifyContent:"center", alignItems:"center"}}>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({})