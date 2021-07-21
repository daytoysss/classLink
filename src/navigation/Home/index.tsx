import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import { HomeStackParamsList } from '../../types/HomeParamsList'
import HomeScreen from '../../screens/HomeScreen'
import Setting from '../../screens/Setting'

const HomeStack = createStackNavigator<HomeStackParamsList>()

export default function Home() {
    return <HomeStack.Navigator 
    screenOptions={{
        headerShown: false,
    }}>
        <HomeStack.Screen name="Home" component={HomeScreen} />
        <HomeStack.Screen name="Setting" component={Setting} />
    </HomeStack.Navigator>
}