import { StyleSheet, Text, View,Image, TouchableOpacity} from 'react-native'
import React from 'react'


export default function Frst({navigation}) {
  return (
    <View style={styles.container}>
     <View style={styles.con1}>
      
      <Image
        source={require('../../assets/logo.png')}
        style={styles.Image}
         /> 
           <Text style={{fontSize:50,color:'#32cd32',fontWeight:'bold'}}>FarmTrade</Text>
    
     </View>
     <View style={styles.con2}>
     <Text style={{fontSize:25,color:'white',fontWeight:'bold',marginTop:80}}>Welcome to FarmTrade</Text>
     <Text style={{fontSize:15,color:'white',fontWeight:'400',marginTop:20}}>Connecting Farmers & Buyers for a Better Agricultural Future</Text>
     <Text style={{fontSize:15,color:'white',fontWeight:'400',marginTop:10}}>We connect you with verified farmers and trusted buyers.</Text> 
      
       <View style={styles.butcontainer}>
        
    

        <TouchableOpacity style={{backgroundColor:'black',width:175,padding:8,borderRadius:25,alignItems:'center'}} onPress={()=>navigation.navigate('Login')}>
            <Text style={{color:'white',fontSize:18,fontWeight:'500',}}>Login</Text>
        </TouchableOpacity>

    
       
        <TouchableOpacity style={{width:175,justifyContent:'center',alignItems:'center'}}  onPress={()=>navigation.navigate('Signup')}>
            <Text style={{color:'white',fontSize:18,fontWeight:'500'}}>Sign-up</Text>
        </TouchableOpacity>


       </View> 
     
     </View>

    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#32cd32',
          
    },
    con1:
    {
      backgroundColor:'white',
      height:500,
      justifyContent:'center',
      alignItems:'center',
      borderBottomRightRadius:35,
      borderBottomLeftRadius:35,
     

    },
    Image:
    {
        height:250,
        width:420,
        marginBottom:70
    },
    con2:
    {
      
       alignItems:'center',
       height:400
    },
    butcontainer:
    {
        marginTop:80,
        borderWidth:1.5,
     
        width:350,
        flexDirection:'row',
        borderRadius:25,
        

    }
})



































































































// import { StyleSheet, Text, View, Image, TouchableOpacity, ViewStyle, TextStyle, ImageStyle } from 'react-native';
// import React from 'react';
// import CommonText from '../components/common/CommonText';


// interface FrstProps {
//   navigation: {
//     navigate: (screen: string) => void;

//   };
// }

// const Frst: React.FC<FrstProps> = ({ navigation }) => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.headerContainer}>
//         <Image
//           source={require('../assets/logo.png')}
//           style={styles.logo}
//           accessibilityLabel="FarmTrade Logo"
//         />
//         <Text style={styles.title}>FarmTrade</Text>
//       </View>
//       <View style={styles.contentContainer}>

//         <CommonText style={styles.welcomeText}>Welcome to FarmTrade</CommonText>
//         <CommonText style={styles.subtitle}>Connecting Farmers & Buyers for a Better Agricultural Future</CommonText>
//         <CommonText style={styles.subtitle}>We connect you with verified farmers and trusted buyers.</CommonText>


//         <View style={styles.buttonContainer}>
//           <TouchableOpacity 
//             style={styles.loginButton} 
//             onPress={() => navigation.navigate('Login')}
//             accessibilityLabel="Login Button"
//           >
//             <Text style={styles.buttonText}>Login</Text>
//           </TouchableOpacity>

//           <TouchableOpacity 
//             style={styles.signupButton} 
//             onPress={() => navigation.navigate('Signup')}
//             accessibilityLabel="Sign-up Button"
//           >
//             <Text style={styles.buttonText}>Sign-up</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#32cd32',
//   } as ViewStyle,
//   headerContainer: {
//     backgroundColor: 'white',
//     height: '50%', // Use percentage for responsive design
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderBottomRightRadius: 35,
//     borderBottomLeftRadius: 35,
//   } as ViewStyle,
//   logo: {
//     height: 250,
//     width: '100%', // Responsive width
//     marginBottom: 20, // Adjusted spacing
//   } as ImageStyle,
//   title: {
//     fontSize: 50,
//     color: 'green',
//     fontWeight: 'bold',
//   } as TextStyle,
//   contentContainer: {
//     flex: 1,
//     alignItems: 'center',
//     paddingHorizontal: 20, // Added horizontal padding
//   } as ViewStyle,
//   welcomeText: {
//     fontSize: 40,
//     color: 'white',
//     fontWeight: 'bold',
//     marginTop: 40, // Adjusted spacing
//   } as TextStyle,
//   subtitle: {
//     fontSize: 15,
//     color: 'white',
//     fontWeight: '400',
//     marginTop: 10,
//     textAlign: 'center', // Center-align text
//   } as TextStyle,
//   buttonContainer: {
//     marginTop: 40, // Adjusted spacing
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     width: '100%', // Responsive width
//     maxWidth: 350, // Max width for better design control
//   } as ViewStyle,
//   loginButton: {
//     backgroundColor: 'black',
//     flex: 1, // Flex to take available space
//     padding: 10,
//     borderRadius: 25,
//     alignItems: 'center',
//     marginRight: 10, // Spacing between buttons
//   } as ViewStyle,
//   signupButton: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 1.5,
//     borderColor: 'white', // Border color to match text color
//     borderRadius: 25,
//   } as ViewStyle,
//   buttonText: {
//     color: 'white',
//     fontSize: 18,
//     fontWeight: '500',
//   } as TextStyle,
// });

// export default Frst;
