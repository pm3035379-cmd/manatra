import React, { useState } from 'react'
import { Pressable, View,Text, Alert } from 'react-native'
import { TextInput } from 'react-native'
import {DisplayRegister} from '../../database/registerLogin'
import { useRouter } from 'expo-router'
import { StyleSheet } from 'react-native'


const Login = () => {
  const router=useRouter();
  const [name,setName]=useState("");
  const [password,setPassword]=useState("");
  const login=async()=>{
    if(!name.trim() || !password.trim()){
      return(
        Alert.alert("Please check the entered information ")

       
      )
    }
    const data = await DisplayRegister();
   const datas= data.filter((d)=> d.name===name && d.password===password)
    if(datas.length>0){
      Alert.alert(`Hello ${name}`)
      router.push("../components/Home")
    } else{
      Alert.alert("check your data");

    }
    
  }

  return (
   <View style={styles.container}>
   <View style={styles.card}>
    <Text style={styles.title}>Login</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} placeholder='Name'/>
        <TextInput style={styles.input} value={password} onChangeText={setPassword} placeholder='Password' secureTextEntry/>
        <Pressable style={styles.loginButton} onPress={login}>
          <Text style={styles.loginText}>Sign In</Text>
        </Pressable>
         <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account?</Text>
        <Pressable onPress={() => router.push('../components/Register')}>
          <Text style={styles.registerText}> Create Account</Text>
        </Pressable>
      </View>
    </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faabf1',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },

  card: {
    width: '100%',
    maxWidth: 420,
    backgroundColor: '#3b013a62',
    padding: 28,
    borderRadius: 35,
    shadowColor: '#003f00',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    
  },

  title: {
    fontSize: 30,
    fontWeight: '800',
    color: '#fbfbfc',
    marginBottom: 8,
    textAlign:"center",
    bottom:10
  },

  subtitle: {
    fontSize: 14,
    color: '#7B8498',
    marginBottom: 32,
  },

  label: {
    fontSize: 14,
    fontWeight: '700',
    color: '#334155',
    marginBottom: 9,
  },

  input: {
    height: 54,
    backgroundColor: '#F8FAFC',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 15,
    color: '#172554',
    marginBottom: 22,
  },

  loginButton: {
    height: 54,
    backgroundColor: '#faabf1',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    elevation: 3,
  },

  loginText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 26,
  },

  footerText: {
    fontSize: 13,
    color: '#000000',

  },

  registerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0f000d',
    fontStyle:"italic"

  },
});

export default Login
