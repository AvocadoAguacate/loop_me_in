import { Link, router, Stack } from 'expo-router';
import { useState } from 'react';
import { Button, Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { firebaseConfig } from '../config.secret'
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";

export default function LogIn() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  const signInWithPassword = async () => {
    signInWithEmailAndPassword(auth, userName, password)
    .then((userCredential) => {
      const user = userCredential.user;
      user.displayName && alert(`Welcome ${user.displayName}`);
      router.replace('(tabs)');
    }).catch((error) => {
      alert(error);
    })
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: '30%'}}>
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
      <Text>Login</Text>
      <TextInput
        value={userName}
        onChangeText={(userName) => setUserName(userName)}
        placeholder={'Username'}
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
        title='Sign in'
        onPress={signInWithPassword}
        accessibilityLabel={'Sign in'}
      />
      {/* <Link href="(tabs)">Go to Tabs</Link> */}
      <Link href="/SignUp">Go to Register</Link>
    </View>
  );
}