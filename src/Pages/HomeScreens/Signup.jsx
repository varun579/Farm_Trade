import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert} from 'react-native'
import React, { useState } from 'react'
import Icons from 'react-native-vector-icons/FontAwesome'
import Icon from 'react-native-vector-icons/Fontisto'
import Feather from 'react-native-vector-icons/Feather'
import Error from 'react-native-vector-icons/MaterialIcons';
import styles from '../Styles/styles'
import { ScrollView } from 'react-native-gesture-handler'
import axios from 'axios';
import { useNavigation } from '@react-navigation/native'
import { RadioButton } from 'react-native-paper'
import { useFocusEffect } from '@react-navigation/native'




export default function Signup({navigation}) {
  
  const [name,setName]=useState('');
  const [nameVerify, setNameVerify]=useState(false);
  const [email,setEmail]=useState('');
  const [emailVerify, setEmailVerify]=useState(false);
  const [password, setPassword]=useState('');
  const [passwordVerify, setPasswordVerify]=useState(false);
  const [showPassword, setShowPassword]=useState(false);
  const [userType, setUserType]=useState('')
  const [mobile,setMobile]=useState('');
  const [mobileVerify,setMobileVerify]=useState(false)
  const [userVerify,setUserVerify] = useState(false)



  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [userTypeError, setUserTypeError] = useState('');
  const [mobileError, setMobileError] = useState('');
  



        
  useFocusEffect(
    React.useCallback(() => {
    
    setNameError('');
    setEmailError('');
    setMobileError('');
    setPasswordError('');
    setUserTypeError('');

      
    },[]),
  );

    


  



const handleName=(text)=>
{
    setName(text);
    setNameVerify(false)
    setNameError('')
    if(text.length>1)
      {
        setNameVerify(true);
        
        
      }
}

const handleEmail=(email)=>
  {
    setEmail(email);

    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailVerify(false);
    setEmailError('');

    if(regex.test(email))
      {
          setEmailVerify(true);  
      }
    
  }

  const handlePassword=(password)=>
  {
     setPassword(password);
     setPasswordError('')
     const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
     setPasswordVerify(false)
     if(regex.test(password))
      {
           setPasswordVerify(true);
      }
  }


  const handleMobile=(mobileno)=>
    {

       setMobile(mobileno);
       setMobileVerify(false);
       setMobileError('')
       const regex = /^[789]\d{9}$/;
       if(regex.test(mobileno))
        {
          setMobileVerify(true)
        }
       if(mobileno.length===10)
       {
          
       }



    }




function handleSubmit()
{


 setNameError(nameVerify ?null : 'Name is required');
 setEmailError(emailVerify ?null :'Email is required');
 setMobileError(mobileVerify ?null : 'Mobile number is required');
 setPasswordError(passwordVerify ?null : 'Password is required');
 setUserTypeError(userType ? null : 'User type is required');
 























  
  const userData={
    name:name,
    email,
    password,
    userType,
    mobile,
  };
  //console.log(name,email,mobile)
  
  if(nameVerify && emailVerify && passwordVerify && userType && mobileVerify){

  axios.post("http://192.168.1.244:5000/register",userData)
  .then((res)=>
  {
    console.log(res.data)
    console.log(res.data.status)
    if(res.data.status=='ok')
      {
        Alert.alert("Registered Successfully");
        navigation.navigate('Login')
      }
    else
    {
      Alert.alert(JSON.stringify(res.data.data));
    }
  })
  .catch(e=>console.log(e))

  setName('');
  setEmail('');
  setMobile('');
  setPassword('');
  setUserType('');
  



}
else{
  
  //Alert.alert("UserType is Required")
  
}

 
}



  return (

    <ScrollView contentContainerStyle={{flexGrow:1}} showsVerticalScrollIndicator={false}>
    <View style={{marginTop:10,marginHorizontal:10}}>
        
        
        <View style={styles.headcontianer}>
         <Text style={{color:'black',fontSize:39,fontWeight:'bold'}}>Farm<Text style={{color:'#32cd32',fontSize:39,fontWeight:'bold'}}>Trade</Text></Text>
         <Text style={{fontSize:17,marginTop:15}}>Please enter your e-mail address</Text>
         <Text style={{fontSize:17}}>and create password</Text>
      </View>

      <View style={styles.radioView}>
        <Text style={{fontSize:20,fontWeight:'500',color:'black'}}>Login as</Text>

        <View style={styles.radioInnerView}>
          <Text style={styles.radioText}>User</Text>

          <RadioButton value='User'
             status={userType == 'User' ? 'checked':'unchecked'}
             color='black'
             onPress={()=>{setUserType('User');setUserTypeError('')}}

             

          
          />

          
        </View>

        <View style={styles.radioInnerView}>
        <Text  style={styles.radioText}>Farmer</Text>

        <RadioButton value='Farmer'
           status={userType == 'Farmer' ? 'checked':'unchecked'}
           color='black'
           onPress={()=>{setUserType('Farmer');setUserTypeError('')}}
          />



        </View>



      </View>
      {userTypeError && <Text style={{ color: 'red', marginLeft: 156 }}>{userTypeError}</Text>}

      {/* {
        userType == 'Farmer' ? <View style={{height:50,width:100,backgroundColor:'red'}}>

        </View> :''
      } */}

      <View style={styles.body}>

        <View style={styles.action}>

          <View style={styles.IconView}>
          <Icons name='user-o' size={20} style={{padding:6}}></Icons>
          </View>
          <View>
            <TextInput placeholder='Full name' style={styles.input} onChangeText={(text)=>{handleName(text)}} value={name}></TextInput>
          </View>
          
          <View style={[styles.validateView ,{}]}>
          

          { name.length<1 ? null: nameVerify? <Feather name="check-circle" color='green' size={20}/> : <Error name='error' color='red' size={20} />}
          
         

          </View>
          
        </View>

       <View>
        {name.length<1 ? null : nameVerify ? null : <Text style={{color:'red',marginLeft:25}}>Name should be greater 1 than characters</Text>}
        {!nameVerify && nameError && (
         <Text style={{ color: 'red', marginLeft: 25 }}>{nameError}</Text>
        )}

       </View>

        <View style={styles.action}>

        <View style={styles.IconView}>
          <Icon name='email' size={20} style={{padding:6}}></Icon>
          </View>
          <View>
            <TextInput placeholder='Enter your email' style={styles.input} onChangeText={(text)=>handleEmail(text)} value={email}></TextInput>
          </View>

          <View style={styles.validateView}>
           
           { email.length<1  ? null : emailVerify ? <Feather name='check-circle' color='green' size={20}/> : <Error name='error' color='red' size={20}/>}

          </View>


        </View>

        {email.length<1 ? null : emailVerify ? null : <Text style={{color:'red',marginLeft:25}}>Enter proper email format</Text>}
        {!emailVerify && emailError && (
        <Text style={{ color: 'red', marginLeft: 25 }}>{emailError}</Text>
        )}
         
         <View style={styles.action}>

            <View style={styles.IconView}>
            
            <Icons name='mobile-phone' size={30} style={{padding:6}}/>

            </View>

            <View>
            <TextInput placeholder='Enter your mobile number' style={styles.input} onChangeText={(text)=>handleMobile(text)}   keyboardType="numeric"  maxLength={10} value={mobile}></TextInput>
            </View>

            <View style={[styles.validateView ,{}]}>
            
            { mobile.length<1 ? null : mobileVerify ?  <Feather name='check-circle' color='green' size={20}/> : <Error name='error' color='red' size={20}/>}

            </View>


         </View>

         {mobile.length<1 ? null : mobileVerify ? null : mobile.length===10 ? <Text style={{color:'red',marginLeft:25}}>Enter Valid Mobile Number</Text> :<Text style={{color:'red',marginLeft:25}}>Mobile number consists of 10 digits </Text>}
         {!mobileVerify && mobileError && (
          <Text style={{ color: 'red', marginLeft: 25 }}>{mobileError}</Text>
          )}
        

        <View style={styles.action}>

        <View style={styles.IconView}>
          <Feather name='lock' size={20} style={{padding:6}}></Feather>
          </View>

          <View>
            <TextInput placeholder='Enter your password' style={styles.input} secureTextEntry = {showPassword} onChangeText={(text)=>handlePassword(text)} value={password}></TextInput>
          </View>

          <TouchableOpacity style={styles.validateView} onPress={()=>setShowPassword(!showPassword)}>
             
           { password.length<1 ? null : showPassword ? <Feather name='eye-off' color={passwordVerify ? 'green' : 'red'} size={20}/> : <Feather name='eye' color={passwordVerify ? 'green' : 'red'} size={20}/>}

          </TouchableOpacity>


        </View>

         { password.length<1 ? null : passwordVerify ? null : <Text style={{color:'red',marginLeft:25}}>Uppercase, Lowercase, Number and atleast 8 characters</Text>}
         {!passwordVerify && passwordError && (
           <Text style={{ color: 'red', marginLeft: 25 }}>{passwordError}</Text>
          )}
      

      </View>

      <View style={styles.footer1}>
        
      <TouchableOpacity style={styles.btn} onPress={()=>handleSubmit()}>
      <Text style={{color:'white',fontSize:20,fontWeight:'500'}}>Sign up</Text>
      </TouchableOpacity>
     
      </View>


      <View style={styles.footer2}>
        
        <View style={{flexDirection:'row',alignItems:'center'}}>
         
         <Text style={{color:'black'}}>Already have an account? </Text>
         <TouchableOpacity><Text style={{color:'#1e90ff',fontWeight:'bold'}} onPress={()=>navigation.navigate('Login')}>Login</Text></TouchableOpacity>

        </View>
        
        <View>

        <Text style={{color:'black'}}>Sign in with</Text>

        </View>
        
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',width:200}}>

             <View>
              <Icons name='facebook' color={'#4169e1'} size={25} style={{padding:5}}></Icons>
             </View>
             <View>
              <Icons name='google' color={'blue'} size={25}></Icons>
             </View>
             <View>
              <Icons name='twitter' color={'#00bfff'} size={25}></Icons>
             </View>

        </View>

        





      </View>



    </View>

    </ScrollView>
  )
}

const sty=StyleSheet.create({
  error:
  {

  }
})
























