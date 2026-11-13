import {Stack} from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import React from 'react'

const _layout = () => {
  return (
    <GestureHandlerRootView style={{flex:1}}>
    <Stack screenOptions={{ headerShown:false}}/></GestureHandlerRootView>
  )
}

export default _layout
