import React from 'react'
import { View,Text } from 'react-native'
import { DisplayRegister } from '@/database/registerLogin'

const Checking = () => {
  const result=DisplayRegister();
  return (
    <View>
        <Text>Existing Users</Text>
        
    </View>
  )
}

export default Checking
