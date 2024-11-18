import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { RadioButton } from 'react-native-paper';
import {useRoute} from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import {Avatar} from 'react-native-paper';

export default function ProfileForm() {

  const [photo, setPhoto] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('');
  const [mobile, setMobile] = useState('');
  const [nameVerify,setNameVerify]=useState(true);
  const [mobileVerify,setMobileVerify]=useState(true);
  const [photoUrl, setPhotoUrl] = useState(null);
  
  

  const route = useRoute();


  //console.log(photo.uri,photoUrl,photo)



  const handleChoosePhoto = () => {
    launchImageLibrary({ noData: true }, (response) => {
      if (response.assets && response.assets[0]) {
        console.log(response);
        setPhoto(response.assets[0]);
      }
    });
  };
  

  const handleName =(name)=>
    {
       setName(name);
       setNameVerify(false)
       if(name.length>3)
        {
         
          setNameVerify(true);
        }
    }
   
   const handleMobile=(mobileno)=>
   {
        setMobile(mobileno)
        setMobileVerify(false)
        const regex = /^[789]\d{9}$/;
          if(regex.test(mobileno))
          {
            console.log(mobileVerify)
             setMobileVerify(true);
          }
   }

   
  useEffect(() => {
   // console.log(route.params)
    const userData = route.params.data;
    console.log(userData.image);
    console.log(photo)
   
    setEmail(userData.email);
    setName(userData.name);
    setMobile(userData.mobile)
    const imageUrl = `http://192.168.1.244:5000/${userData.image}`;
    setGender(userData.gender)
    if(userData.image)
    {
      
      setPhotoUrl(imageUrl);
     
    }
    else{
     
      setPhotoUrl(null)
     
    }
   
    
    
  },[]);


  const updateProfile = () => { 

    const data = new FormData();

    if (photo) {
      data.append('profilePic', {
        uri: photo.uri,
        type: photo.type,
        name: photo.fileName,
      });
    }
    


    
  data.append('name', name);
  data.append('email', email);
  data.append('mobile', mobile);
  data.append('gender', gender);

  console.log(data)
   // console.log(nameVerify,mobileVerify)

   
  if(nameVerify && mobileVerify){
      
      axios.post('http://192.168.1.244:5000/update-user', data,   { headers: {
        'Content-Type': 'multipart/form-data', 
      },
  })
      .then(res => {console.log(res.data)
        if(res.data.status=="ok"){
          Alert.alert('Profile Updated')
        }
      });
   }
   else{
    Alert.alert('Check Name and Mobile correct format')
   }
  };


  

  return (



    <View style={{ backgroundColor: 'white', paddingHorizontal: 10 }}>
      <View style={styles.header}>

      <TouchableOpacity onPress={handleChoosePhoto}>
  {photo && photo.uri ? (
  
    <Image source={{ uri: photo.uri }} style={styles.image} />
  ) : photoUrl ? (
   
    <Image source={{ uri: photoUrl }} style={styles.image} />
  ) : (
 
    <Image
      source={{ uri: 'https://imgs.search.brave.com/B_007OrR9eaWJenb736UiExgsQuLsEBMBBWkKs2A_Ao/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/a2luZHBuZy5jb20v/cGljYy9tLzI1Mi0y/NTI0Njk1X2R1bW15/LXByb2ZpbGUtaW1h/Z2UtanBnLWhkLXBu/Zy1kb3dubG9hZC5w/bmc' }}
      style={styles.image}
    />
  )}
</TouchableOpacity>


{/* 
<TouchableOpacity onPress={handleChoosePhoto}>
          {photo ? (
            <Image source={{ uri: photo.uri }} style={styles.image} />
          ) : photoUrl ? (
            <Image source={{ uri: photoUrl }} style={styles.image} />
          ) : (
            <Image
              source={{
                uri:'https://imgs.search.brave.com/B_007OrR9eaWJenb736UiExgsQuLsEBMBBWkKs2A_Ao/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly93d3cu/a2luZHBuZy5jb20v/cGljYy9tLzI1Mi0y/NTI0Njk1X2R1bW15/LXByb2ZpbGUtaW1h/Z2UtanBnLWhkLXBu/Zy1kb3dubG9hZC5w/bmc'
              }} 
              style={styles.image}
            />
          )}
        </TouchableOpacity> */}




        <Text style={styles.headerText}>Edit Profile</Text>
      </View>

      <View style={styles.form}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder='Your Name'
          placeholderTextColor={'black'}
          onChangeText={(text) => handleName(text)}
          defaultValue={name}
          value={name}
          
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Your Email"
          placeholderTextColor={'black'}
          onChangeText={(text) => setEmail(text)}
          defaultValue={email}
          editable={false}
        />

        <Text style={styles.label}>Mobile</Text>
        <TextInput
          style={styles.input}
          placeholder="Your Mobile No"
          placeholderTextColor={'black'}
          keyboardType="numeric"
          maxLength={10}
          onChangeText={(text) => handleMobile(text)} 
          value={mobile}
          />

        <Text style={styles.label}>Gender</Text>


        <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={styles.radioView}>
                <Text style={styles.radioText}>Male</Text>
                <RadioButton
                  value="Male"
                  status={gender === 'Male' ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setGender('Male');
                  }}
                   color='black'
                />
              </View>
              <View style={styles.radioView}>
                <Text style={styles.radioText}>Female</Text>
                <RadioButton
                  value="Female"
                  status={gender === 'Female' ? 'checked' : 'unchecked'}
                  onPress={() => {
                    setGender('Female');
                  }}
                   color='black'
                />
              </View>
            </View>
        </View>
       
        <TouchableOpacity style={styles.button} onPress={()=>updateProfile()}>
          <Text style={styles.buttonText}>Update Profile</Text>
        </TouchableOpacity>


    </View>
  );
}





const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: '600',
    color: '#228b22',
    marginLeft: 10,
  },
  form: {
    backgroundColor: '#f5f5f5',
    padding: 20,
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#228b22',
    padding: 10,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 20,
    color: 'black',
  },
  button: {
    backgroundColor: '#228b22',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  radioView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft:10
  },
  radioText: {
    color: 'black',
    fontSize: 19
  },
  image: {
    height:120,
    width:120,
    marginTop:20,
    borderRadius:60
    
    
  },

});
