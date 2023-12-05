import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import Route from './src/navigation/Route';
import app from './src/db/firebaseConfig';



export default function App() {
  return (
    <NavigationContainer>
      <Route/>
    </NavigationContainer>
   
  );
}

