import React from 'react'
import { View,Text, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import { LinearGradient } from 'expo-linear-gradient';

import { StyleSheet } from 'react-native';

const Note = () => {
  const router=useRouter();
  return (
   <View style={style.v}>
    <LinearGradient colors={["#faadf0","#9c0087","#2d0027"]} start={{x:0,y:0}} end={{x:1,y:1}} style={style.view}>

   
   <Pressable onPress={() => router.push("/components/ViewExistingUser")}>
  <Text style={style.text}>View Existing Users</Text>
</Pressable>
 </LinearGradient>
 <LinearGradient colors={["#faadf0","#9c0087","#2d0027"]} start={{x:0,y:0}} end={{x:1,y:1}} style={style.view}>

<Pressable onPress={() => router.push('/components/CUD')}>
  <Text style={style.text}>
  Update & Delete {"\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0"} User Accounts
</Text>
</Pressable>
 </LinearGradient>
 <LinearGradient colors={["#faadf0","#9c0087","#2d0027"]} start={{x:0,y:0}} end={{x:1,y:1}} style={style.view}>

    <Pressable onPress={()=>router.push("/components/Changetheme")}>
      <Text style={style.text}>
        Customize App Theme
      </Text>
    </Pressable>
     </LinearGradient>
<LinearGradient colors={["#ffc1f8","#fe6de8","#5c0e60"]} start={{x:0,y:0}} end={{x:1,y:1}} style={style.view}>

    <Pressable onPress={()=>router.push("/components/Home")}>
      <Text style={style.text1}>
        ❮
      </Text>
    </Pressable>
     </LinearGradient>
     
   </View>
  )
}

const style=StyleSheet.create({
  v:{
  flex:1,
     alignItems:"center",
     justifyContent:"center",
     backgroundColor:"#faabdb"
  },
  view:{
   
    borderRadius:30,
    borderWidth:10,
    borderColor:"#ffffff",
    marginBottom:30,
    padding:20
  },
  text:{
   
    color:"#fff",
    fontSize:29,
    fontStyle:"italic",
    fontWeight:900,
    lineHeight:40
    

  },
  text1:{
   
    color:"#fff",
    fontSize:35,
    fontStyle:"italic",
    fontWeight:900,
    lineHeight:40
    

  }
})

export default Note
