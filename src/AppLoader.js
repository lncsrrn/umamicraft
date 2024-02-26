import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

import LottieView from 'lottie-react-native'

const AppLoader = () => {
  return (
    <View style={[ StyleSheet.absoluteFillObject, styles.container]}>
        <LottieView source={require('./assets/loading-animation.json')} autoPlay loop/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F3D9A4'

    }
})

export default AppLoader

const styles = StyleSheet.create({})