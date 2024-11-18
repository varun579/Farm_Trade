import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import Icons from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Fontisto';
import Feather from 'react-native-vector-icons/Feather';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import styles from '../Styles/styles';

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleEmail = (text) => {
    setEmail(text);
    setEmailError(text.length === 0 ? 'Email is required' : '');
  };

  const handlePassword = (text) => {
    setPassword(text);
    setPasswordError(text.length === 0 ? 'Password is required' : '');
  };

  const handleSubmit = () => {
    let valid = true;

    if (!email) {
      setEmailError('Email is required');
      valid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    }

    if (valid) {
      const userData = {
        email: email,
        password: password,
      };

      axios.post("http://192.168.1.244:5000/login-user", userData)
        .then((res) => {
          setEmail('');
          setPassword('');
          console.log(res.data);

          if (res.data.status === 'ok') {
            AsyncStorage.setItem("token", res.data.data);
            AsyncStorage.setItem('isLoggedIn', JSON.stringify(true));
            Alert.alert('Logged In Successfully');
            if (res.data.userType === 'User') {
              navigation.navigate('TabNav');
            } else {
              navigation.navigate('FarmTab');
            }
          } else {
            Alert.alert(res.data.data);
          }
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setEmail('');
      setPassword('');
      setShowPassword(false);
      setEmailError('')
      setPasswordError('')
    }, [])
  );

  return (
    <View style={{ marginTop: 30, marginHorizontal: 10 }}>
      <View style={styles.headcontianer}>
        <Text style={{ color: 'black', fontSize: 39, fontWeight: 'bold' }}>Farm<Text style={{ color: '#32cd32', fontSize: 39, fontWeight: 'bold' }}>Trade</Text></Text>
        <Text style={{ fontSize: 17, marginTop: 15 }}>Please enter your e-mail address</Text>
        <Text style={{ fontSize: 17 }}>and password</Text>
      </View>

      <View style={styles.body}>
        <View style={styles.action}>
          <View style={styles.IconView}>
            <Icon name='email' size={20} style={{ padding: 6 }} />
          </View>
          <View>
            <TextInput
              placeholder='Enter your email'
              style={styles.input}
              onChangeText={(text) => handleEmail(text)}
              value={email}
            />
          </View>
        </View>
        {emailError && (
       <Text style={{ color: 'red', marginLeft: 25 }}>{emailError}</Text>
         )}

        <View style={styles.action}>
          <View style={styles.IconView}>
            <Feather name='lock' size={20} style={{ padding: 6 }} />
          </View>
          <View>
            <TextInput
              placeholder='Enter your password'
              style={styles.input}
              onChangeText={(text) => handlePassword(text)}
              value={password}
              secureTextEntry={!showPassword}
            />
          </View>
          <TouchableOpacity style={styles.validateView} onPress={() => setShowPassword(!showPassword)}>
            {password.length < 1 ? '' : showPassword ? <Feather name='eye' color={'green'} size={20} /> : <Feather name='eye-off' color={'green'} size={20} />}
          </TouchableOpacity>
        </View>
         {passwordError && (
         <Text style={{ color: 'red', marginLeft: 25 }}>{passwordError}</Text>
          )}
      </View>

      <View style={Styles.footer1}>
        <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: '500' }}>Login</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer2}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ color: 'black' }}>Don't have an account? </Text>
          <TouchableOpacity><Text style={{ color: '#1e90ff', fontWeight: 'bold' }} onPress={() => navigation.navigate('Signup')}>Sign Up</Text></TouchableOpacity>
        </View>
        <View>
          <Text style={{ color: 'black' }}>Sign in with</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: 200 }}>
          <Icons name='facebook' color={'#4169e1'} size={25} style={{ padding: 5 }} />
          <Icons name='google' color={'blue'} size={25} />
          <Icons name='twitter' color={'#00bfff'} size={25} />
        </View>
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  footer1: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
