import { Link, router, Stack } from 'expo-router';
import { useState } from 'react';
import { View, Text } from 'react-native';
import { firebaseConfig } from '../config.secret'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { Input } from "@rneui/base";
import { Button } from '@rneui/themed';
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export default function LogIn() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [userNameError, setUserNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const signInWithPassword = async () => {
    signInWithEmailAndPassword(auth, userName, password)
    .then((userCredential) => {
      const user = userCredential.user;
      user.displayName && alert(`Welcome ${user.displayName}`);
      router.replace('(tabs)');
    }).catch((error) => {
      const message = error.message.toString();
      alert(message);
      if(message.includes('invalid-email')){
        setUserNameError(true);
      }
      if(message.includes('wrong-password')){
        setPasswordError(true);
      }
    })
  }

  const handleUserNameChange = (userName) => {
    setUserName(userName);
    if(userNameError){
      setUserNameError(false);
    }
  };

  const handlePasswordChange = (password) => {
    setPassword(password);
    if(passwordError){
      setPasswordError(false);
    }
  };

  const resetUserName = () => {
    setUserName('');
    if(userNameError){
      setUserNameError(false);
    }
  }
  const resetPassword = () => {
    setPassword('');
    if(userNameError){
      setPasswordError(false);
    }
  }

  return (
    <View style={{ flex: 1, align: 'center',  justifyContent: 'center', width: '100%', padding: '10%'}}>
      <Stack.Screen
        options={{
          title: 'Loop me in',
          headerStyle: { backgroundColor: '#f4511e' },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerTitle: props => <Text>Loop me in</Text>,
        }}
      />
      <Input
      style={{width: '100%'}}
      containerStyle={{width: '100%'}}
      disabledInputStyle={{ background: "#ddd" }}
      inputContainerStyle={{}}
      errorMessage={userNameError && "Invalid email"}
      errorStyle={{}}
      errorProps={{}}
      inputStyle={{width: '100%'}}
      label="Userame"
      labelStyle={{}}
      labelProps={{}}
      leftIcon={<Icon name="account-outline" size={20} />}
      leftIconContainerStyle={{}}
      rightIcon={<Icon name="close" size={20} onPress={resetUserName}/>}
      rightIconContainerStyle={{}}
      renderErrorMessage
      placeholder='enter your username'
      onChangeText={handleUserNameChange}
      value={userName}
      keyboardType={'email-address'}
      />
      <Input
      containerStyle={{width: '100%'}}
      disabledInputStyle={{ background: "#ddd" }}
      inputContainerStyle={{}}
      errorMessage={passwordError && "Wrong password"}
      errorStyle={{}}
      errorProps={{}}
      inputStyle={{width: '100%'}}
      label="Password"
      labelStyle={{}}
      labelProps={{}}
      leftIcon={<Icon name="form-textbox-password" size={20}/>}
      leftIconContainerStyle={{}}
      rightIcon={<Icon name="close" size={20} onPress={resetPassword}/>}
      rightIconContainerStyle={{}}
      renderErrorMessage
      placeholder='enter your password'
      onChangeText={handlePasswordChange}
      value={password}
      secureTextEntry={true}
      />
      <Button
        title='Sign in'
        disabled={userName === '' || password === '' || userNameError}
        onPress={signInWithPassword}
        accessibilityLabel={'Sign in'}
      />
      {/* <Link href="(tabs)">Go to Tabs</Link> */}
      <Link 
        href="/SignUp"
        style={{textAlign: 'center', margin: '5%'}}
      >
        Sign up
      </Link>
    </View>
  );
}