import * as React from 'react';
import { Text, View ,StyleSheet,keyboardHidesTabBar} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Cart from '../UserFolder/CartScreen/Cart';
import Categories from '../UserFolder/CategoryScreen/Categories'
import Hom from '../UserFolder/HomeScreen/Hom'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import AccountStack from './AccountStack';
import HomeStack from './HomeStack';
import CategoryStack from './CategoryStack';


const Tab=createBottomTabNavigator();

export default function TabNav()
{

    return (
    

        <Tab.Navigator  screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
             
                let iconName;
                let iconSize;
             
              if (route.name === 'HomeStack')
                 {
                iconName = focused ? 'home' : 'home-outline';
                iconSize = focused ? 30 : 26;
                } 
              else if (route.name === 'CategoryStack') 
                {
                iconName = focused ? 'grid' : 'grid-outline';
                iconSize = focused ? 30 : 26;
                }
              else if(route.name==='Cart')
                {
                    iconName = focused ? 'cart' : 'cart-outline';
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
            tabBarLabelStyle: { fontSize: 14, fontWeight: 'bold'},
            tabBarStyle: { backgroundColor: 'white',height:65},
            tabBarItemStyle: { marginBottom:10 },
            headerShown:false,
            keyboardHidesTabBar: true,
            tabBarHideOnKeyboard: true,
            
           
          })}



        >
         <Tab.Screen name='HomeStack' component={HomeStack} options={{tabBarLabel: 'Home'  }}/>
         <Tab.Screen name='CategoryStack' component={CategoryStack} options={{tabBarLabel: 'Categories'  }}/>
         <Tab.Screen name='Cart' component={Cart}/>
        <Tab.Screen name='AccountStack' component={AccountStack} options={{tabBarLabel: 'Account'}}/>



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