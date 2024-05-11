import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, StyleSheet, Image, Alert, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Color, FontFamily } from "../GlobalStyles";
import Icon from 'react-native-vector-icons/FontAwesome';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc } from "firebase/firestore";
import firebaseApp from '.././firebase'; // Import the Firebase app instance
import ReusableTextField from './components/ReusableTextField';
import ReusableButton from './components/ReusableButton';

// Define the type for the stack navigator's parameters
type RootStackParamList = {
  Login: undefined;
};

// Define the navigation prop type for Register component
type LoginNavigationProp = NavigationProp<RootStackParamList, 'Login'>;

// Define the authentication
const auth = getAuth(firebaseApp);

// Define the firestore
const db = getFirestore(firebaseApp);

const RegisterPage: React.FC = () => {
  const navigation = useNavigation<LoginNavigationProp>();

  // Go to Login Screen
  const handleLogin = () => {
    navigation.navigate('Login');
  };

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [registrationSuccessful, setRegistrationSuccessful] = useState(false);

  const validateForm = () => {
    let isValid = true;

    if (!name) {
      setNameError('Name is required');
      isValid = false;
    } else {
      setNameError('');
    }

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Invalid email format');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!username) {
      setUsernameError('Username is required');
      isValid = false;
    } else {
      setUsernameError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/.test(password)) {
      setPasswordError(
        'Password must include at least one lowercase letter, one uppercase letter, one number, and be at least 8 characters long'
      );
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (!confirmPassword) {
      setConfirmPasswordError('Confirm Password is required');
      isValid = false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }

    return isValid;
  };

  // Handle Sign Up Button Function
  // Handle Sign Up Button Function
  const handleSignUp = async () => {
    if (validateForm()) {
      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        // Store additional information in Firestore
        await setDoc(doc(db, "users", user.uid), {
          name: name,
          email: email, // Make sure to include email
          username: username,
          password: password, // Storing passwords in plaintext is not recommended
        });

        // If the additional information is stored successfully:
        Alert.alert('Registration Successful', 'User registered successfully!');
        setRegistrationSuccessful(true);

        // Optionally, navigate to the login screen or another relevant screen
        navigation.navigate('Login');

      } catch (error) {
        // Handle both registration and Firestore errors
        console.error(error);
        // You may want to display a different message based on the error type
        Alert.alert('Registration Unsuccessful', 'There was an error during the registration process.');
      }
    }
  };

  useEffect(() => {
    // useEffect will be called after the component is mounted
    // If registration was successful, navigate to the Login screen
    if (registrationSuccessful) {
      // Navigate to the login screen after successful registration
      navigation.navigate('Login');
    }
  }, [registrationSuccessful, navigation]);

  return (
    <View>

      <View style={styles.header}>
        <Icon
          name='chevron-left'
          size={32}
          style={styles.back}
          onPress={() => navigation.navigate('Login')}
        />
        <Text style={styles.headerText}>Sign Up</Text>
      </View>

      <View style={styles.container}>

        <View style={styles.inputCont}>
          <ReusableTextField placeholder="Name" value={name} setValue={setName} secureTextEntry={false} />
          <Text style={[styles.errorText, !nameError && { display: 'none' }]}>
            {nameError}
          </Text>
          <ReusableTextField placeholder="Email" value={email} setValue={setEmail} secureTextEntry={false} />
          <Text style={[styles.errorText, !emailError && { display: 'none' }]}>
            {emailError}
          </Text>
          <ReusableTextField placeholder="Username" value={username} setValue={setUsername} secureTextEntry={false} />
          <Text style={[styles.errorText, !usernameError && { display: 'none' }]}>
            {usernameError}
          </Text>
          <ReusableTextField placeholder="Password" value={password} setValue={setPassword} secureTextEntry={true} />
          <Text style={[styles.errorText, !passwordError && { display: 'none' }]}>
            {passwordError}
          </Text>
          <ReusableTextField placeholder="Confirm Password" value={confirmPassword} setValue={setConfirmPassword} secureTextEntry={true} />
          <Text style={[styles.errorText, !confirmPasswordError && { display: 'none' }]}>
            {confirmPasswordError}
          </Text>
        </View>

        <ReusableButton text="Sign Up" onPress={handleSignUp} />

        <View style={styles.termsCont}>
          <Text style={styles.p}>By pressing "Sign Up", you agree to our</Text>
          <Text style={styles.p2}>Terms & Conditions</Text>
        </View>

        <View style={styles.divCont}>
          <Text style={styles.orLoginWithText}>OR SIGN UP WITH</Text>
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

        <View style={styles.registerText}>
          <Text style={styles.registerTextInner}>Don't have an account yet?</Text>
          <Text style={[styles.registerTextInner, { color: '#841D06' }]} onPress={handleLogin}> Register</Text>
        </View>

      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
  p: {
    fontSize: 12,
  },
  p2: {
    fontSize: 12,
    color: "#841D06"
  },
  termsCont: {
    width: "100%",
    alignItems: 'center'
  },
  inputCont: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
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
    justifyContent: 'center'
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
    paddingTop: 24,
    gap: 24
  },
});

export default RegisterPage;
