import React, { useState } from 'react'
import { View,Text, Pressable } from 'react-native';
import { Image } from 'react-native';
const Changetheme = () => {

  const [theme,setTheme]=useState();
  return (
    <View>
      <Text>Customize App Theme</Text>
      <Pressable>
        <Image  />
      </Pressable>
    </View>
    
  )
}

export default Changetheme
