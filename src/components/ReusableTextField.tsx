import { StyleSheet, Text, View, TextInput } from 'react-native'
import React from 'react'

const ReusableTextField = ({value, setValue, placeholder, secureTextEntry}) => {
    return (
        <View style={styles.container}>
            <TextInput
                value={value}
                onChangeText={setValue}
                placeholder={placeholder}
                style={styles.input}
                secureTextEntry={secureTextEntry}
            />
        </View>
    )
}

export default ReusableTextField

const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: 'white',
        borderColor: 'lightgray',
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    input: {
        fontSize: 16,
    },
})