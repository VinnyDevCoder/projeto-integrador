import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import Route from './src/navigation/Route';



export default function App() {
  return (
    <NavigationContainer>
      <Route/>
    </NavigationContainer>
   
  );
}

