import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import firebaseApp from '.././firebase'; // Import the Firebase app instance
import { FontFamily } from '../GlobalStyles';
import ReusableButton from './components/ReusableButton';
import ReusableTextField from './components/ReusableTextField';
import { SafeAreaView } from 'react-native-safe-area-context';

// Define the type for the stack navigator's parameters
type RootStackParamList = {
  Register: undefined;
  Home: undefined;
  ForgotPass: undefined; // Define the ForgotPassword screen
};

// Define the navigation prop type for Login and Register component
type RegisterNavigationProp = NavigationProp<RootStackParamList, 'Register'>;
type LoginNavigationProp = NavigationProp<RootStackParamList, 'Home'>;
type ForgotPassNavigationProp = NavigationProp<RootStackParamList, 'ForgotPass'>;

// Define the authentication
const auth = getAuth(firebaseApp);

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccessful, setLoginSuccessful] = useState(false);

  const navigation = useNavigation<RegisterNavigationProp>();
  const navigation2 = useNavigation<LoginNavigationProp>();
  const navigation3 = useNavigation<ForgotPassNavigationProp>();

  // Go to Register Screen
  const handleRegister = () => {
    navigation.navigate('Register');
  };

  const validateForm = () => {
    let isValid = true;

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email format');
      isValid = false;
    } else {
      setEmailError('');
    }
    return isValid;
  };

  // Handle Login Button Function
  const handleLogin = async () => {
    if (validateForm()) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        // Login Successful Alert
        Alert.alert('Login Successful', 'User registered successfully!');
        setLoginSuccessful(true);
      } catch (error) {
        // Handle login errors
        Alert.alert('Login Unsuccessful', 'Invalid email or password!');
        console.error(error);
      }
    }
  };

  const handleForgotPassword = () => {
    navigation3.navigate('ForgotPass');
  };

  useEffect(() => {
    // useEffect will be called after the component is mounted
    // If login was successful, navigate to the Home screen
    if (email && password && loginSuccessful) {
      // Navigate to the Home screen after successful login
      navigation2.navigate('Home');
    }
  }, [email, password, loginSuccessful, navigation2]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contWrapper}>
        <View style={styles.logoCont}>
          <Image
            style={styles.logoIcon}
            source={require("../assets/logo.png")}
          />

        </View>
        <View style={styles.loginCont}>

          <Text style={styles.header}>Log In</Text>

          <View style={styles.inputCont}>
            {/* Email Input */}
            <ReusableTextField placeholder="Email" value={email} setValue={setEmail} secureTextEntry={false} />

            {/* Password Input */}
            <ReusableTextField placeholder="Password" value={password} setValue={setPassword} secureTextEntry={true} />

            <View style={styles.newCont}>
              <TouchableOpacity style={{ alignItems: 'center' }} onPress={handleForgotPassword}>
                <Text style={styles.forgotPassword}>Forgot Password?</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Login Button */}
          <ReusableButton text="Log In" onPress={handleLogin} />

          {/* Or login with... text */}
          <View style={styles.divCont}>
            <Text style={styles.orLoginWithText}>OR LOG IN WITH</Text>
          </View>

          {/* Google, Facebook, and Twitter socmedCont */}
          <View style={styles.socmedCont}>
            <View style={styles.socmedButton}>
              <Image source={require('../assets/google.png')} style={styles.imageicon} />
              <Text style={styles.socmedText}>Google</Text>
            </View>
            <View style={styles.socmedButton}>
              <Image source={require('../assets/facebook.png')} style={styles.imageicon} />
              <Text style={styles.socmedText}>Facebook</Text>
            </View>
            <View style={styles.socmedButton}>
              <Image source={require('../assets/twitter.png')} style={styles.imageicon} />
              <Text style={styles.socmedText}>Twitter</Text>
            </View>
          </View>

          {/* Forgot Password */}


          {/* Register */}
          <View style={styles.registerText}>
            <Text style={styles.registerTextInner}>Don't have an account yet?</Text>
            <Text style={[styles.registerTextInner, { color: '#841D06' }]} onPress={handleRegister}> Register</Text>
          </View>

        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  newCont: {
    display: 'flex',
    flexDirection: 'row-reverse',
    width: "100%"
  },
  inputCont: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  header: {
    fontSize: 24,
    color: '#841D06',
    fontFamily: FontFamily.hiraKakuStdNW8,
  },
  contWrapper: {
    width: "100%",
    height: 932,
    display: 'flex',
    flexDirection: 'column',
  },
  logoIcon: {
    height: 56,
    width: 56
  },
  logoCont: {
    width: "100%",
    height: 161,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 35
  },
  loginCont: {
    width: "100%",
    height: 736,
    gap: 24,
    backgroundColor: 'white',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    paddingVertical: 36,
    paddingHorizontal: 48,
  },
  container: {
    backgroundColor: "#841D06",
  },
  socmedText: {
  },
  socmedCont: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 12
  },
  socmedButton: {
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    width: "100%",
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: 'rgba(132, 29, 6, 0.6)',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageicon: {
    width: 30,
    height: 30
  },
  divCont: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orLoginWithText: {
    marginHorizontal: 8,
    color: 'lightgrey'
  },
  forgotPassword: {
    fontSize: 12,
    color: '#841D06',
  },
  registerText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  registerTextInner: {
    color: 'black',
  }
});

export default LoginPage;
