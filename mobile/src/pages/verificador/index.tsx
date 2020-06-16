import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import {Feather as Icon} from '@expo/vector-icons'
import {TouchableOpacity} from 'react-native-gesture-handler'
import {useNavigation, useRoute} from '@react-navigation/native'

interface params{
    verificado: boolean,
    nome: string
}

const Verificador = () =>{
    const navigation = useNavigation()
    const route = useRoute()
    const routeParans = route.params as params

    console.log(routeParans)

    function handleViewCamera(){
        navigation.navigate('Camera')
    }

    if(routeParans.verificado){
        return (
            <View style={styles.container}>
                <View style={{flex: 0}}>
                    <Text style={styles.title}>Seus resultados</Text> 
                </View>
                    
                <View style={styles.bloco}>
                    <Text style={styles.textoBloco}>Emoção:</Text>
                    <Text style={styles.textoConteudoBloco}>Estressado 😡</Text>            
                </View>

                <View style={styles.bloco}>
                    <Text style={styles.textoBloco}>Frequência Cardíaca</Text>
                    <Text style={styles.textoConteudoBloco}>96 bpm <Icon style={styles.textoBloco} name="activity"/></Text>
                    
                </View>

                <View style={styles.bloco}>
                    <Text style={styles.textoBloco}>Temperatura<Icon style={styles.textoBloco} name="thermometer"/></Text>
                    <Text style={styles.textoConteudoBloco}>36 C°</Text>
                    
                </View>

                <View style={{display:'flex', flex: 1, justifyContent: 'flex-end', alignContent: 'flex-start', alignItems: 'center'}}>
                <TouchableOpacity
                    style={{
                        borderWidth:1,
                        borderColor:'rgba(0,0,0,0.2)',
                        alignItems:'center',
                        justifyContent:'center',
                        width:100,
                        height:100,
                        backgroundColor:'#fff',
                        borderRadius:50,
                    }}
                    onPress={handleViewCamera}
                >
                    <Icon name={"video"} size={30} color="#F4C400" />
                    <Text>Começar</Text>
                </TouchableOpacity>
                </View>
            </View>
        )
    }

    return(
        <View style={styles.container}>
            <View style={styles.main}>
                <Text style={styles.title}>Bem vindo <Text style={{fontSize: 40}}>{routeParans.dataSerialized.nome}</Text></Text>
                <Text style={styles.description}>Comece a análise clicando no botão abaixo</Text>
            </View>
            <View style={{display:'flex', flex: 1, justifyContent: 'flex-end', alignContent: 'flex-start', alignItems: 'center'}}>
                <TouchableOpacity
                    style={{
                        borderWidth:1,
                        borderColor:'rgba(0,0,0,0.2)',
                        alignItems:'center',
                        justifyContent:'center',
                        alignContent:'center',
                        width:100,
                        height:100,
                        backgroundColor:'#fff',
                        borderRadius:50,
                    }}
                    onPress={handleViewCamera}
                >
                    <Icon name={"video"} size={30} color="#F4C400" />
                    <Text>Começar</Text>
                </TouchableOpacity>
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
        alignSelf: 'flex-start'
      },
    
      description: {
        color: '#6C6C80',
        fontSize: 16,
        marginTop: 16,
        maxWidth: 260,
        lineHeight: 24,
      },  
      titulo: {
        display: 'flex',
        alignItems: 'center',
      },
      
      bloco:{
        alignItems: 'center',
        alignSelf: 'center',
        marginBottom: 10,
        marginTop: 0,
        borderRadius: 10,
        width: 300,
        height: 'auto',
        padding: 20,
        backgroundColor: 'white',
        flex: 1,
      },
      textoBloco:{
          fontSize: 24
      },
      textoConteudoBloco:{
        fontSize: 32
      }

})

export default Verificador