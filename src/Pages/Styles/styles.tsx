 import { StyleSheet } from "react-native"



const styles = StyleSheet.create({
    headcontianer:
    {
        marginTop:15,
        justifyContent:'center',
        alignItems:'center'
    },
    body:
    {
      marginTop:10
    },
    action:
    {
      flexDirection:'row',
      alignItems:'center',
      backgroundColor:'#fffaf0',
      marginHorizontal:15,
      borderRadius:25,
      marginTop:15
      
    },
    validateView:
    {
      
      justifyContent:'flex-end',
      marginLeft:20
    },
    input:
    {
      fontSize:19,
      width:250
    },
    IconView:
    {
      borderRadius:20,
      backgroundColor:'white',
      height:40,
      width:40,
      justifyContent:'center',
      alignItems:'center',
      marginHorizontal:10
    
      
    },
    footer1:
    {
       marginTop:40,
       justifyContent:'center',
       alignItems:'center'
    },
    btn:{
      backgroundColor:'black',
      width:220,
      height:54,
      borderRadius:25,
      justifyContent:'center',
      alignItems:'center',
      elevation:15
  
    },
    footer2:
    {
      marginTop:20,
      justifyContent:'space-between',
      alignItems:'center',
      height:170
  
    },
    radioView:
    {
      marginTop:20,
      flexDirection:'row',
      justifyContent:'space-evenly',
      alignItems:'center'
    },
    radioInnerView:
    {
      flexDirection:'row',
      justifyContent:'center',
      alignItems:'center'
    },
    radioText:
    {
      fontSize:16, 
      fontWeight:'500', 
      color:'black'
    }
    
  
  
  
  
  })
  
export default styles;