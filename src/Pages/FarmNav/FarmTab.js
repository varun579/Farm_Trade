import * as React from 'react';
import { Text, View ,StyleSheet,keyboardHidesTabBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import FarmStack from './FarmStack'
import FarmacntStack from './FarmacntStack';

const Tab=createBottomTabNavigator();

export default function FarmTab()
{

    return (
    

        <Tab.Navigator  screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
             
                let iconName;
                let iconSize;
             
              if (route.name === 'FarmStack')
                 {
                iconName = focused ? 'home' : 'home-outline';
                iconSize = focused ? 30 : 26;
                }
              else
              {
                  iconName = focused ? 'account-circle' : 'account-circle-outline';
                  iconSize = focused ? 30 : 26;
                  return(
                  <View style={focused ? styles.iconWithShadow : ''}>
                  <Icon name={iconName} size={iconSize} color={'#228b22'} />
                  </View>)
              }
              
              return <Ionicons name={iconName} size={iconSize} color={'#228b22'} />;
             
            },
            tabBarActiveTintColor: 'green',
            tabBarInactiveTintColor: 'gray',
            tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold' },
            tabBarStyle: { backgroundColor: 'white',height:65 },
            tabBarItemStyle: { marginBottom:10 },
            headerShown:false,
            keyboardHidesTabBar: true,
            tabBarHideOnKeyboard: true,
            
           
          })}



        >
         <Tab.Screen name='FarmStack' component={FarmStack} options={{tabBarLabel: 'Home'  }}/>
        <Tab.Screen name='FarmacntStack' component={FarmacntStack} options={{tabBarLabel: 'Account'}}/>



        </Tab.Navigator>





     

    )
   
      







}
const styles = StyleSheet.create({
    iconWithShadow: {
      shadowColor: 'red',            // Shadow color (black)
      shadowOffset: { width: 10, height: 12 },  // Shadow offset (moves it down a bit)
      shadowOpacity: 0.25,            // Shadow opacity
      shadowRadius: 3.84,             // Shadow blur radius
      elevation: 15,                   // Elevation for Android shadow
    },
  });