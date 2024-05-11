import { StyleSheet, Text, View, Pressable } from 'react-native'
import React from 'react'
import { FontFamily } from '../../GlobalStyles'

const ReusableButton = ({ onPress, text }) => {
    return (
        <Pressable onPress={onPress} style={styles.container}>
            <Text style={styles.text}>{text}</Text>
        </Pressable>
    )
}

export default ReusableButton

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#841D06",
        width: "100%",
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        paddingHorizontal: 16,
    },
    text: {
        color: 'white',
        fontSize: 16,
        fontFamily: FontFamily.hiraKakuStdNW8
    },
})