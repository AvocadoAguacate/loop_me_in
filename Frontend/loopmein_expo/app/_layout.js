import { Stack } from 'expo-router';

export default function Layout() {
  return <Stack>
    <Stack.Screen
      name="index"
      options={{
        headerShown: true,
      }}
    />
    <Stack.Screen
      name='SignUp'
      options={{
        presentation: 'modal'
      }}
    />
    <Stack.Screen
      name='(tabs)'
      options={{
        headerShown: false,
      }}
    />
  </Stack>;
}