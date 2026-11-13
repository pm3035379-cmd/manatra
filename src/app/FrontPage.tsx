import React from 'react'
import { View,Text,StyleSheet, Pressable } from 'react-native'
import {useVideoPlayer,VideoView} from "expo-video"
import { useRouter } from 'expo-router'
const FrontPage = () => {
const router=useRouter();
 const player=useVideoPlayer(
    require("../../assets/fp.mp4"),
    (player)=>{
      player.loop=true;
      player.play()
    }
 )

  return (
    <View style={styles.f}>
       
       <VideoView
       player={player}
      
       nativeControls={false}
       style={styles.video}
       />

      <Pressable onPress={()=>{
        player.pause();
        router.push("/components/Login")
      }} style={styles.touch}/>


    </View>
  )
}

const styles=StyleSheet.create({
    f:{
      flex:1,
        position:"relative"
    },
    video:{
        width:380,
        left:5,
        height:800,
         position:"absolute",
        top:20
    },
    t:{
        position:"absolute",
        top:20
    },
    touch:{
      zIndex:2,
      ...StyleSheet.absoluteFill
    }
})

export default FrontPage
