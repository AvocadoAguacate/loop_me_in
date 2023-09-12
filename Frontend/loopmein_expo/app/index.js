import { Link, Stack } from 'expo-router';
import { Text, View } from 'react-native';



export default function LogIn() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Stack.Screen
        options={{
          title: 'Loop me in',
          // https://reactnavigation.org/docs/headers#adjusting-header-styles
          headerStyle: { backgroundColor: '#f4511e' },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          // https://reactnavigation.org/docs/headers#replacing-the-title-with-a-custom-component
          headerTitle: props => <Text>Loop me in</Text>,
        }}
      />
      <Text>Home Screen</Text>
      <Link href="(tabs)">Go to Tabs</Link>
      <Link href="/SignUp">Go to Register</Link>
    </View>
  );
}