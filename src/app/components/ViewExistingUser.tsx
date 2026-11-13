import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { DisplayRegister ,Reg} from '@/database/registerLogin'
import { StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable } from 'react-native';
import { useRouter } from 'expo-router';

const ViewExistingUser = () => {
  const router=useRouter();
  
  const [data,setData]=useState<Reg[]>()
  useEffect(()=>{
    const getData=async()=>{
      const result=await DisplayRegister();
      setData(result)
    };
    getData();
  },[])
  return (
    <ScrollView style={{flex:1}} showsVerticalScrollIndicator={true} contentContainerStyle={{padding:15,paddingBottom:150}}>
    <View>
      <Text>View Existing Users</Text>
      {data?.map((i)=>(
         <View key={i.id} style={style.bg} >
          <View >
          <Text>{i.name}</Text>
          <Text>{i.password}</Text>
          </View>
          </View>
      ))}
    </View>

    <LinearGradient colors={["#ffc1f8","#fe6de8","#5c0e60"]} start={{x:0,y:0}} end={{x:1,y:1}} style={style.view}>

    <Pressable onPress={()=>router.push("/components/Setting")}>
      <Text style={style.text1}>
        ❮
      </Text>
    </Pressable>
     </LinearGradient>
    </ScrollView>
  );
};

const style=StyleSheet.create({
  bg:{
    backgroundColor:"#feb6f0",
    color:"#720862",
    alignItems:"center",
    textAlign:"center",
    fontSize:30,
    fontStyle:"italic",
    padding:10,
    marginTop:20,
    lineHeight:40,
    borderRadius:20,
    borderColor:"#41003f",
    borderWidth:10,
    
  },
  view:{
   
    borderRadius:30,
    borderWidth:10,
    borderColor:"#ffffff",
    marginBottom:30,
    padding:20
  },
   text1:{
   
    color:"#fff",
    fontSize:35,
    fontStyle:"italic",
    fontWeight:900,
    lineHeight:40
    

  }
})

export default ViewExistingUser;