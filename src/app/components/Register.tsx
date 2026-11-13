import React from 'react'
import { Button, TextInput, View,Text, Pressable, Alert, StyleSheet } from 'react-native'
import { useState } from 'react';
import {InsertRegister} from '../../database/registerLogin';
import { useRouter } from 'expo-router';

const Register = () => {
    const router = useRouter();
    const [name,setName]=useState("");
    const [password,setPassword]=useState("");
    const [question,setQuestion]=useState("");
    const [answer,setAnswer]=useState("");
    const [secureKey,SetSecureKey]=useState("");

    const save =async()=>{
        if(!name.trim() || !password.trim() || !question.trim() || !answer.trim()){
            return(
              Alert.alert("Please check the entered information")
            )
        }if(secureKey.trim()==="Password#secure123098"){
 Alert.alert("Registration Successful!")
       await InsertRegister({name,password,question,answer});
       router.push("/components/Login")
        }
        Alert.alert("Check Your SecureKey")
       
      
    }

  return (
    <View style={style.f}>
    <View style={style.card}>
      <Text style={style.t}>Register</Text>
      <TextInput value={name} onChangeText={setName} placeholder='Name' style={style.text}/>
      <TextInput value={password} onChangeText={setPassword} placeholder='Password' secureTextEntry style={style.text1}/>
      <TextInput value={question} onChangeText={setQuestion} placeholder='Question' style={style.text2}/>
      <TextInput value={answer} onChangeText={setAnswer} placeholder='Answer' style={style.text3}/>
<TextInput value={secureKey} onChangeText={SetSecureKey} placeholder='Secure Key' style={style.text3}/>
      <View >

      
      <Pressable onPress={save}  >
        <Text style={style.text4}>Register</Text>
      </Pressable>
      </View>
      <Pressable onPress={()=>router.push('../components/Login')}>
        <Text style={style.text5}>You already login!</Text>
      </Pressable>
    </View>
    </View>
  )

}


const style= StyleSheet.create({
  f:{
position:"relative",
backgroundColor:'#faabf1',
height:900,
  },
  card: {
  backgroundColor:'#3b013a62',
  width: 350,
  height: 600,
  top: 100,
  left: 20,
  borderRadius: 50,
  position: "absolute",

  shadowColor: "#e31bdc",
  shadowOffset: { width: 0, height: 30 },
  shadowOpacity: 1,
  shadowRadius: 70,
  
},
  t:{
    top:60,
   
    position:"absolute",
    width:330,
    left:10,
    borderRadius:10,
    fontSize:25,
    textAlign:"center",
    color:"#ffffff"

  },
  text:{
    top:120,
    backgroundColor:"#fcfafa",
    position:"absolute",
    width:330,
    left:10,
    borderRadius:10,
    fontSize:18

  },
  text1:{
    top:180,
    backgroundColor:"#fcfafa",
    position:"absolute",
    width:330,
    left:10,
    borderRadius:10,
    fontSize:18

  },
  text2:{
    top:240,
    backgroundColor:"#fcfafa",
    position:"absolute",
    width:330,
    left:10,
    borderRadius:10,
    fontSize:18

  },
  text3:{
    top:300,
    backgroundColor:"#fcfafa",
    position:"absolute",
    width:330,
    left:10,
    borderRadius:10,
    fontSize:18

  },
   text4:{
    top:380,
    backgroundColor:'#faabf1',
    alignItems:"center",
    textAlign:"center",
    position:"absolute",
    fontSize:22,

    padding:10,
    width:300,
    left:25,
    height:50,
    borderRadius:20

  },
  text5:{
    top:530,

    position:"absolute",
    textAlign:"center",
    fontSize:23,
    color:"#ffffff",
    padding:10,
    width:300,
    left:20,
    height:50,
    borderRadius:10

  }
})

export default Register
