import React, { useEffect, useState } from 'react'
import { View ,Text, StyleSheet, TextInput, Alert} from 'react-native';
import { DisplayRegister,update,DeleteRegister ,Reg} from '@/database/registerLogin';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable } from 'react-native';
import { useRouter } from 'expo-router';

const CUD = () => {
   const router= useRouter();
   const [data,setData]=useState<Reg[]>();
   const[ids,setIds]=useState<number>(0);
   const [name,setName]=useState("");
   const [password,setPassword]=useState("");
   const [question,setQuestion]=useState("");
   const [answer,setAnswer]=useState("");
   useEffect(()=>{
    const d=async()=>{
      const datas=await DisplayRegister();
      setData(datas);
    };
    d();
   },[]);

   const updateOrDelete=({d,n,password,question,answer}:{d:number,n:string,password:string,question:string,answer:string})=>{
       setIds(d);
    setName(n);
       setPassword(password);
       setQuestion(question);
       setAnswer(answer);
   }

   const saveUpdate=async()=>{
      if(name.trim()!="" ||password.trim()!="" || question.trim()!="" || answer.trim()!=""){
         Alert.alert("Please check the entered information")
      }
       Alert.alert("Registration Successful!")
             await update({id:ids,name,password,question,answer});
            useEffect(()=>{
    const d=async()=>{
      const datas=await DisplayRegister();
      setData(datas);
    };
    d();
   },[]);
   };
   
   const deleteUpdate=async({ids}:{ids:number})=>{
    if(name.trim()!="" ||password.trim()!="" || question.trim()!="" || answer.trim()!=""){
         Alert.alert("Please check the entered information")
      }
      Alert.alert("Deleted Successful!");

      await DeleteRegister({id: ids});
       useEffect(()=>{
    const d=async()=>{
      const datas=await DisplayRegister();
      setData(datas);
    };
    d()
   },[]);

   }
  return (
   
    <View>
         
     
        <Text> Update & Delete User Accounts</Text>  
        <TextInput value={name} onChangeText={setName} />
        <TextInput value={password} onChangeText={setPassword}/>
        <TextInput value={question} onChangeText={setQuestion}/>
        <TextInput value={answer} onChangeText={setQuestion}/>
        <Pressable onPress={()=>saveUpdate}>
          <Text>UPDATE</Text>
        </Pressable>
        <Pressable onPress={()=>deleteUpdate}>
          <Text>DELETE</Text>
        </Pressable>
      
        {data?.map((d)=>(
          <Pressable onPress={()=>updateOrDelete({d: d.id, n: d.name,password: d.password, question:d.question,answer:d.answer})}>
          <View  key={d.id}>
            <Text>{d.name} - {d.password} </Text>
            <Text>{d.question} - {d.answer}</Text>
            </View>
             </Pressable>
        ))}
       

         <LinearGradient colors={["#ffc1f8","#fe6de8","#5c0e60"]} start={{x:0,y:0}} end={{x:1,y:1}} style={style.view}>

    <Pressable onPress={()=>router.push("/components/Setting")}>
      <Text style={style.text1}>
        ❮
      </Text>
    </Pressable>
     </LinearGradient>

    </View>
  )
};

const style= StyleSheet.create({
   t:{
    backgroundColor:"#ff6ce9",
    color:"#450049",
    textAlign:"center",
    fontSize:20,
    fontStyle:"italic",
    fontWeight:"bold",
    borderRadius:10
   },
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

export default CUD
