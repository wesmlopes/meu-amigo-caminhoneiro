import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, ToastAndroid } from 'react-native'
import {RectButton} from 'react-native-gesture-handler'
import {useNavigation} from '@react-navigation/native'
import api from '../../services/api'

const Login = () =>{
        
        const navigation = useNavigation()

        const [senha, setSenha] = useState('')
        const [whatsapp, setWhatapp] = useState('')

        const loginCaminhoneiro ={
          senha, 
          whatsapp
        }

        async function handleLogin(){
            const {data} = await api.post('caminhoneiro/login', loginCaminhoneiro)
            
            const dataSerialized = {
              nome: data.nome
            }

            if(data.status == "SUCCESS"){
              return navigation.navigate('Verificador', {
                Verificado: false,
                dataSerialized
              })
            }
            
            return ToastAndroid.show("Whatsapp ou senha inexistente", ToastAndroid.LONG)
            
        }
        return(
            <View style={styles.container}>
                <View style={styles.main}>
                    <View>
                        <Text style={styles.title}>Faça o <Text style={{fontSize: 40}}>Login</Text></Text>
                        <TextInput
                                style={styles.input}
                                placeholder="Whatsapp"
                                autoCapitalize="words"
                                autoCorrect={false}
                                maxLength={100}
                                textContentType='name'
                                onChangeText={setWhatapp}
                                keyboardType='number-pad'
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Senha"
                                autoCapitalize="none"
                                autoCorrect={false}
                                maxLength={100}
                                textContentType='password'
                                onChangeText={setSenha}
                                secureTextEntry={true}
                            />
                    </View>
                </View>
                <View style={styles.footer}>
                    <RectButton style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Entrar</Text>
                    </RectButton>
                </View>
            </View>
        )
        
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 32,
      },
    
      main: {
        flex: 1,
        justifyContent: 'center',
      },
    
      title: {
        color: '#DAAD00',
        fontSize: 32,
        maxWidth: 260,
        marginTop: 64,
      },
    
      description: {
        color: '#6C6C80',
        fontSize: 16,
        marginTop: 16,
        maxWidth: 260,
        lineHeight: 24,
      },
    
      footer: {},
    
      select: {},
    
      input: {
        height: 60,
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginBottom: 8,
        paddingHorizontal: 24,
        fontSize: 16,
      },
    
      button: {
        backgroundColor: '#F4C400',
        height: 60,
        flexDirection: 'row',
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
        marginTop: 8,
      },
    
      buttonIcon: {
        height: 60,
        width: 60,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        justifyContent: 'center',
        alignItems: 'center'
      },
    
      buttonText: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        color: '#FFF',
        fontSize: 16,
      }
})

export default Login