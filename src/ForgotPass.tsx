import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import firebaseApp from '.././firebase'; // Import the Firebase app instance


// Define the type for the stack navigator's parameters
type RootStackParamList = {
    Login: undefined;
  };
  
  // Define the navigation prop type for Register component
  type LoginNavigationProp = NavigationProp<RootStackParamList, 'Login'>;

// Define the authentication
const auth = getAuth(firebaseApp);

const ForgotPasswordPage: React.FC = () => {
  const navigation = useNavigation<LoginNavigationProp>();

  // State variables
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  // Function to handle resetting password
  const handleResetPassword = async () => {
    try {
      // Check if email is provided
      if (!email) {
        setEmailError('Email is required');
        return;
      }

      // Send password reset email
      await sendPasswordResetEmail(auth, email);

      // Show success message
      Alert.alert('Password Reset Email Sent', 'An email containing instructions to reset your password has been sent to your email address.');

      // Navigate to login screen
      navigation.navigate('Login');
    } catch (error) {
      // Handle error
      console.error(error);
      Alert.alert('Password Reset Failed', 'There was an error while attempting to reset your password. Please try again later.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Text style={styles.forgotPassword}>Forgot Password?</Text>
      </View>

      {/* Email Input */}
      <View style={styles.input}>
        <Icon name="envelope" style={styles.icon} />
        <TextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
          style={styles.textinput}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>
      <Text style={[styles.errorText, !emailError && { display: 'none' }]}>
        {emailError}
      </Text>

      {/* Reset Password Button */}
      <View style={{ alignItems: 'center' }}>
        <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
          <Text style={styles.buttontext}>Reset Password</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    padding: 20
  },
  forgotPassword: {
    fontSize: 24,
    color: '#333',
    marginBottom: 20
  },
  input: {
    flexDirection: 'row',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    alignItems: 'center'
  },
  icon: {
    marginLeft: 10,
    fontSize: 20,
    color: '#555'
  },
  textinput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    paddingVertical: 10
  },
  button: {
    padding: 15,
    width: '70%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: '#841D06',
    marginTop: 20
  },
  buttontext: {
    color: '#fff',
    fontSize: 18
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 5
  }
});

export default ForgotPasswordPage;
