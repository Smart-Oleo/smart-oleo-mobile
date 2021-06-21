import React from 'react';
import {StatusBar} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../pages/Home';
import Icon from 'react-native-vector-icons/Feather';
import Store from '../pages/Store';
import Collects from '../pages/Collects';
import Profile from '../pages/Profile';
import NewCollect from '../pages/NewCollect';
import {Platform, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Address from '../pages/Address';
import NewAddress from '../pages/NewAddress';
import Success from '../pages/Success';
import EditAddress from '../pages/EditAddress';
import Notifications from '../pages/Notifications';
import RescueProduct from '../pages/RescueProduct';
import Orders from '../pages/Orders';
import CollectDetail from '../pages/CollectDetail';
import {colors, metrics, android} from '../styles/global';

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
          return <Icon name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: colors.success,
        inactiveTintColor: colors.gray,
      }}>
      <Tab.Screen
        name="Home"
        options={() => ({
          tabBarLabel: 'Início',
        })}
        component={Home}
      />
      <Tab.Screen
        name="Collects"
        options={() => ({
          tabBarLabel: 'Coletas',
        })}
        component={Collects}
      />
      <Tab.Screen
        name="NewCollect"
        component={NewCollect}
        options={() => ({
          tabBarLabel: 'Criar',
          tabBarIcon: ({}) => (
            <View
              style={{
                shadowColor: colors.gray,
                shadowOffset: {width: 0, height: 3},
                shadowOpacity: 0.4,
                shadowRadius: 12,
              }}>
              <LinearGradient
                style={{
                  width: 50,
                  height: 50,
                  borderRadius: 30,
                  marginBottom: 30,
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: Platform.OS === 'android' && 'transparent',
                  ...Platform.select({
                    android,
                  }),
                }}
                colors={[colors.primary, colors.success]}>
                <Icon
                  name="plus"
                  size={metrics.iconSize + 5}
                  color={colors.white}
                />
              </LinearGradient>
            </View>
          ),
        })}
      />
      <Tab.Screen
        name="Store"
        options={() => ({
          tabBarLabel: 'Loja',
        })}
        component={Store}
      />
      <Tab.Screen
        name="Profile"
        options={() => ({
          tabBarLabel: 'Perfil',
        })}
        component={Profile}
      />
    </Tab.Navigator>
  );
}

const AppRoutes: React.FC = () => (
  <>
    <StatusBar backgroundColor={colors.success} />
    <App.Navigator>
      <App.Screen
        name="Dashboard"
        options={{
          headerShown: false,
          cardStyle: {backgroundColor: colors.secundary},
        }}
        component={Tabs}
      />
      <App.Screen
        name="Address"
        options={{
          headerShown: false,
          cardStyle: {backgroundColor: colors.secundary},
        }}
        component={Address}
      />
      <App.Screen
        name="NewAddress"
        options={{
          headerShown: false,
          cardStyle: {backgroundColor: colors.secundary},
        }}
        component={NewAddress}
      />
      <App.Screen
        name="Success"
        component={Success}
        options={{
          headerShown: false,
          cardStyle: {backgroundColor: colors.secundary},
        }}
      />
      <App.Screen
        name="EditAddress"
        component={EditAddress}
        options={{
          headerShown: false,
          cardStyle: {backgroundColor: colors.secundary},
        }}
      />
      <App.Screen
        name="Notifications"
        component={Notifications}
        options={{
          headerShown: false,
          cardStyle: {backgroundColor: colors.secundary},
        }}
      />
      <App.Screen
        name="Rescue"
        component={RescueProduct}
        options={{
          headerShown: false,
          cardStyle: {backgroundColor: colors.secundary},
        }}
      />
      <App.Screen
        name="Orders"
        component={Orders}
        options={{
          headerShown: false,
          cardStyle: {backgroundColor: colors.secundary},
        }}
      />
      <App.Screen
        name="CollectDetail"
        component={CollectDetail}
        options={{
          headerShown: false,
          cardStyle: {backgroundColor: colors.secundary},
        }}
      />
    </App.Navigator>
  </>
);

export default AppRoutes;
