import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, TextInput, Button, ScrollView, KeyboardAvoidingView, ToastAndroid} from 'react-native'
import {RectButton, TouchableOpacity} from 'react-native-gesture-handler'
import {useNavigation} from '@react-navigation/native'
//deletar: import {CheckBox} from 'react-native-elements'
//import NumericInput from 'react-native-numeric-input'

import api from '../../services/api'

interface Doencas{
    idDoenca: number,
    nomeDoenca: string
}

interface Trabalho{
    id: number,
    nome: string 
}

interface AlternativaBooleana{
    id: number,
    title: string
}

const Login = () =>{

    const navigation = useNavigation()

    const [doencasSelecionadas, setDoencasSelecionadas] = useState<number[]>([])
    const [trabalhoSelecionado, setTrabalhoSelecionado] = useState<number[]>([])
    const [fazAtividadeSelecionado, setFazAtividadeSelecionado] = useState<number[]>([])
    
    const [fazAtividade, setFazAtividade] = useState<AlternativaBooleana[]>([])
    const [tipoTrabalho, setTipoTrabalho] = useState<Trabalho[]>([])
    const [doencas, setDoencas] = useState<Doencas[]>([])
    const [nome, setNome] = useState('')
    const [whatsapp, setWhatapp] = useState('')
    const [senha, setSenha] = useState('')
    const [idade, setIdade] = useState('')
    const [horasSono, setHorasSono] = useState('')
    const [refeicoes, setRefeicoes] = useState('')

    useEffect(() =>{
        api.get('doencas/todos').then(response =>{
            setDoencas(response.data)
        })
        
        setFazAtividade([{id: 1, title: 'Sim'},{id: 2, title: 'Não'}])
        
        setTipoTrabalho([{id: 1, nome: 'Autônomo'},{id: 2, nome: 'Empregado de Frota'}])
    }, [])

    function handleDoencaSelecionada(id: number){
        const alreadySelected = doencasSelecionadas.findIndex(doenca => doenca === id);
    
        if(alreadySelected >= 0){
            const filteredItems = doencasSelecionadas.filter(doenca => doenca !== id);
    
            setDoencasSelecionadas(filteredItems)
        }else{
            setDoencasSelecionadas([...doencasSelecionadas, id]);
        } 
    }

    function handleTrabalhoSelecionado(id: number){
        setTrabalhoSelecionado([id])
    }

    function handleFazAtividadeSelecionado(id: number){
        setFazAtividadeSelecionado([id])
    }

    async function handleCadastrar(){
        const caminhoneiro ={
            nome,
            whatsapp,
            senha,
            idade,
            horasSono,
            refeicoes,
            fazAtividades: fazAtividade[fazAtividadeSelecionado[0] - 1].title,
            doencas: doencasSelecionadas.join(','),
            tipoTrabalho: tipoTrabalho[trabalhoSelecionado[0] - 1].nome
        }

        await api.post('caminhoneiro', caminhoneiro)
        ToastAndroid.show("Cadastro concluido com sucesso", ToastAndroid.LONG)
        navigation.goBack()
    }

    return (
        <KeyboardAvoidingView>
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.main}>
                        <View>
                            <Text style={styles.title}>Cadastre-se</Text>
                        </View>
                        <View>
                            <TextInput
                                style={styles.input}
                                placeholder="Nome"
                                autoCapitalize="words"
                                autoCorrect={false}
                                maxLength={100}
                                textContentType='name'
                                onChangeText={setNome}
                            />
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
                            <TextInput
                                style={styles.input}
                                placeholder="Idade"
                                autoCapitalize="words"
                                autoCorrect={false}
                                maxLength={100}
                                keyboardType='number-pad'
                                onChangeText={setIdade}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Horas de sono"
                                autoCapitalize="words"
                                autoCorrect={false}
                                maxLength={100}
                                keyboardType='number-pad'
                                onChangeText={setHorasSono}
                            />
                            <TextInput
                                style={styles.input}
                                placeholder="Quantas refeições você faz por dia?"
                                autoCapitalize="words"
                                autoCorrect={false}
                                maxLength={100}
                                textContentType='name'
                                onChangeText={setRefeicoes}
                                keyboardType='number-pad'
                            />
                            <Text style={styles.titleSelectItens}>Você faz Atividade fisicas?</Text>
                            <View style={styles.itemsContainer}>
                                {fazAtividade.map(alternativa =>(
                                    <TouchableOpacity 
                                    onPress={() => handleFazAtividadeSelecionado(alternativa.id)} 
                                    activeOpacity={0.5} 
                                    key={String(alternativa.id)}
                                    style={[
                                    styles.item, 
                                    fazAtividadeSelecionado.includes(alternativa.id) ? styles.selectedItem: {}
                                    ]}
                                    >
                                        <Text style={styles.itemTitle}>{alternativa.title}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <Text style={styles.titleSelectItens}>Como você trabalha?</Text>
                            <View style={styles.itemsContainer}>
                                {tipoTrabalho.map(trabalho =>(
                                    <TouchableOpacity 
                                    onPress={() => handleTrabalhoSelecionado(trabalho.id)} 
                                    activeOpacity={0.5} 
                                    key={String(trabalho.id)}
                                    style={[
                                    styles.item, 
                                    trabalhoSelecionado.includes(trabalho.id) ? styles.selectedItem: {}
                                    ]}
                                    >
                                        <Text style={styles.itemTitle}>{trabalho.nome}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                            <Text style={styles.titleSelectItens}>Selecione as condições que se aplicam</Text>
                            <View style={styles.itemsContainer}>
                                <ScrollView horizontal showsHorizontalScrollIndicator={false} >
                                    {doencas.map(doenca => (
                                        <TouchableOpacity 
                                            onPress={() => handleDoencaSelecionada(doenca.idDoenca)} 
                                            activeOpacity={0.5} 
                                            key={String(doenca.idDoenca)} 
                                            style={[
                                            styles.item, 
                                            doencasSelecionadas.includes(doenca.idDoenca) ? styles.selectedItem: {}
                                            ]}
                                        >
                                            <Text style={styles.itemTitle}>{doenca.nomeDoenca}</Text>
                                        </TouchableOpacity>
                                    ))}
                                    
                                </ScrollView>
                            </View>
                            <RectButton style={styles.button} onPress={handleCadastrar}>
                                <Text style={styles.buttonText}>Enviar</Text>
                            </RectButton>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        padding: 16
    },
    main:{
        flex: 1,
        justifyContent: 'flex-start'
    },
    footer:{
        paddingTop: 16,
    },
    input: {
        height: 54,
        backgroundColor: '#FFF',
        borderRadius: 10,
        marginBottom: 8,
        paddingHorizontal: 24,
        fontSize: 16,
    },
    title: {
        color: '#DAAD00',
        fontSize: 24,
        maxWidth: 260,
        marginTop: 64,
        marginBottom: 16
    },
    description: {
        color: '#4A504A',
        fontSize: 16,
        marginTop: 16,
        maxWidth: 260,
        lineHeight: 24,
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
    buttonText: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        color: '#FFF',
        fontSize: 24,
    },
    buttonIcon: {
        height: 60,
        width: 60,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    itemsContainer: {
        flexDirection: 'row',
        marginTop: 16,
        marginBottom: 32,
    },
    item: {
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#eee',
        flex: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingTop: 12,
        paddingBottom: 12,
        marginRight: 12,
        alignItems: 'center',
        justifyContent: 'space-between',
        textAlign: 'center',
    },
    selectedItem: {
        borderColor: '#34CB79',
        borderWidth: 2,
    },
    itemTitle: {
        textAlign: 'center',
        fontSize: 16,
    },
    titleSelectItens:{
        fontSize: 16
    }
})

export default Login