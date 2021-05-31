import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../pages/Home';
import Icon from 'react-native-vector-icons/Feather';
import Store from '../pages/Store';
import Collects from '../pages/Collects';
import Profile from '../pages/Profile';
import NewCollect from '../pages/NewCollect';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Address from '../pages/Address';
import NewAddress from '../pages/NewAddress';
import Success from '../pages/Success';
import EditAddress from '../pages/EditAddress';
import Notifications from '../pages/Notifications';
import RescueProduct from '../pages/RescueProduct';
import Orders from '../pages/Orders';
import CollectDetail from '../pages/CollectDetail';

const App = createStackNavigator();
const Tab = createBottomTabNavigator();

function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName = '';

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home';
          } else if (route.name === 'Collects') {
            iconName = focused ? 'inbox' : 'inbox';
          } else if (route.name === 'Store') {
            iconName = focused ? 'shopping-bag' : 'shopping-bag';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'user' : 'user';
          }
          //  else if (route.name === 'Notificacoes') {
          //    iconName = focused ? 'ios-notifications' : 'ios-notifications-outline';
          //  }
          //  else if (route.name === 'Perfil') {
          //    iconName = focused ? 'ios-person' : 'ios-person-outline';
          //  }

          // You can return any component that you like here!
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#00c200',
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Collects" component={Collects} />
      <Tab.Screen
        name="NewCollect"
        component={NewCollect}
        options={() => ({
          tabBarLabel: 'Criar',
          tabBarIcon: ({}) => (
            <View>
              <LinearGradient
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 30,
                  marginBottom: 20,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  elevation: 6,
                  shadowColor: '#9C27B0',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.2,
                  shadowRadius: 5,
                }}
                start={{x: 0, y: 1}}
                end={{x: 0, y: 0}}
                colors={['#00FF00', '#228B22']}>
                <Icon name="plus" size={30} color="#FFF" />
              </LinearGradient>
            </View>
          ),
        })}
      />
      <Tab.Screen name="Store" component={Store} />
      <Tab.Screen name="Profile" component={Profile} />
      {/* <Tab.Screen name="Notificacoes" component={Notifications}/>
        <Tab.Screen name="Perfil" component={Profile} /> */}
    </Tab.Navigator>
  );
}

const AppRoutes: React.FC = () => (
  <App.Navigator>
    <App.Screen
      name="Dashboard"
      options={{headerShown: false, cardStyle: {backgroundColor: '#FAFAFA'}}}
      component={Tabs}
    />
    <App.Screen
      name="Address"
      options={{headerShown: false, cardStyle: {backgroundColor: '#FAFAFA'}}}
      component={Address}
    />
    <App.Screen
      name="NewAddress"
      options={{headerShown: false, cardStyle: {backgroundColor: '#FAFAFA'}}}
      component={NewAddress}
    />
    <App.Screen
      name="Success"
      component={Success}
      options={{headerShown: false, cardStyle: {backgroundColor: '#FAFAFA'}}}
    />
    <App.Screen
      name="EditAddress"
      component={EditAddress}
      options={{headerShown: false, cardStyle: {backgroundColor: '#FAFAFA'}}}
    />
    <App.Screen
      name="Notifications"
      component={Notifications}
      options={{headerShown: false, cardStyle: {backgroundColor: '#FAFAFA'}}}
    />
    <App.Screen
      name="Rescue"
      component={RescueProduct}
      options={{headerShown: false, cardStyle: {backgroundColor: '#FAFAFA'}}}
    />
    <App.Screen
      name="Orders"
      component={Orders}
      options={{headerShown: false, cardStyle: {backgroundColor: '#FAFAFA'}}}
    />
    <App.Screen
      name="CollectDetail"
      component={CollectDetail}
      options={{headerShown: false, cardStyle: {backgroundColor: '#FAFAFA'}}}
    />
  </App.Navigator>
);

export default AppRoutes;
