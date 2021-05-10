import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import AppRoutes from './routes';
import AppProvider from './hooks';

const App: React.FC = () => (
  <NavigationContainer>
    <AppProvider>
      <AppRoutes />
    </AppProvider>
  </NavigationContainer>
);
export default App;
