import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'

import Home from './pages/home'
import Signin from './pages/Signin'
import Login from './pages/Login'
import Verificador from './pages/verificador'
import Camera from './pages/camera'

const appStack = createStackNavigator();

const Routes = () =>{
    return(
        <NavigationContainer>
            <appStack.Navigator
                headerMode='none'
                screenOptions={{
                    cardStyle:{
                        backgroundColor:"#F0F0F0"
                    }
                }}
            >
                <appStack.Screen name="Home" component={Home}/>
                <appStack.Screen name="Signin" component={Signin}/>
                <appStack.Screen name="Login" component={Login}/>
                <appStack.Screen name="Verificador" component={Verificador}/>
                <appStack.Screen name="Camera" component={Camera}/>

            </appStack.Navigator>
        </NavigationContainer>
    )
}



export default Routes


