import { useState } from 'react';
import { Button, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from '../config.secret'

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const signUp = async () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      alert(`${userCredential.user.email} registrado`);
      router.replace('');
    })
    .catch((error) => {
      alert(error);
    })
  }

  const isPresented = router.canGoBack();
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {!isPresented && <Link href="login">Dismiss</Link>}
      <StatusBar style="light" />
      <Text>Login</Text>
      <TextInput
        value={email}
        onChangeText={(email) => setEmail(email)}
        placeholder={'Email'}
        blurOnSubmit={true}
        keyboardType={'email-address'}
      />
      <TextInput
        value={password}
        onChangeText={(password) => setPassword(password)}
        placeholder={'Password'}
        blurOnSubmit={true}
        secureTextEntry={true}
        mode="outlined"
      />
      <Button
        title='Sign up'
        onPress={signUp}
        accessibilityLabel={'Sign up'}
      />
    </View>
  );
}