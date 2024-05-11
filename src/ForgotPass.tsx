import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import firebaseApp from '.././firebase'; // Import the Firebase app instance
import ReusableTextField from './components/ReusableTextField';
import ReusableButton from './components/ReusableButton';
import { FontFamily } from '../GlobalStyles';


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
    <View>
      <View style={styles.header}>
        <Icon
          name='chevron-left'
          size={32}
          style={styles.back}
          onPress={() => navigation.navigate('Login')}
        />
        <Text style={styles.headerText}>Forgot Password</Text>
      </View>
      <View style={styles.container}>


        <View style={styles.textCont}>
          <Text style={styles.p}>Enter your email below to reset your password.</Text>
        </View>

        {/* Email Input */}
        <ReusableTextField
          value={email}
          onChangeText={setEmail}
          placeholder="Email"
        />

        <Text style={[styles.errorText, !emailError && { display: 'none' }]}>
          {emailError}
        </Text>

        {/* Reset Password Button */}
        <ReusableButton
          onPress={handleResetPassword}
          text="Reset Passsword"
        />

      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  p: {
    textAlign: 'center'
  },
  textCont: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  back: {
    color: "#841D06"
  },
  headerText: {
    fontFamily: FontFamily.hiraKakuStdNW8,
    fontSize: 16,
    color: "#841D06"
  },
  header: {
    paddingTop: 80,
    paddingHorizontal: 36,
    display: 'flex',
    flexDirection: 'row',
    gap: 40,
    alignItems: 'center',
    backgroundColor: 'white',
  },
  container: {
    display: 'flex',
    width: "100%",
    height: 932,
    flexDirection: 'column',
    paddingHorizontal: 36,
    backgroundColor: 'white',
    paddingTop: 80,
    gap: 16
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  }
});

export default ForgotPasswordPage;
