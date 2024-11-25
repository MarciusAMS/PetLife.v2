import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, Modal, Alert, TextInput, Button } from 'react-native';
import { styles } from '../../../styles';
import { auth, firestore } from '../../../firebaseService';
import { collection, addDoc } from 'firebase/firestore';

export type RootStackParamList = {
    TelaSaude: { pet: { petId: string } } | undefined;
    TelaInicio: { pet: { nome: string; imagemUrl: string; petId: string } } | undefined;
    TelaPet: { pet: { nome: string; imagemUrl: string; petId: string } } | undefined;
    AppMenu: { pet: { nome: string; imagemUrl: string; petId: string } } | undefined;
    TelaRemedio: { pet?: { petId: string } };
    TelaConsultas: { pet: { petId: string } } | undefined;
};

interface Pet {
    nome: string;
    imagemUrl: string;
    userUID: string;
    petId: string;
}

type TelaConsultasProps = {
    pet?: Pet;
};

export default function TelaConsultas({ pet }: TelaConsultasProps) {
    const [mesAtual, setMesAtual] = useState<string>('');
    const [anoAtual, setAnoAtual] = useState<number>(new Date().getFullYear());
    const [diasDoMes, setDiasDoMes] = useState<number[]>([]);
    const [diaHoje, setDiaHoje] = useState<number>(new Date().getDate());
    const [diasSelecionados, setDiasSelecionados] = useState<number[]>([]);
    const [modalVisible, setModalVisible] = useState(false);
    const [horario, setHorario] = useState('');
    const [observacoes, setObservacoes] = useState('');

    useEffect(() => {
        const dataAtual = new Date();
        const nomeMeses = [
            'JANEIRO', 'FEVEREIRO', 'MARÇO', 'ABRIL', 'MAIO', 'JUNHO',
            'JULHO', 'AGOSTO', 'SETEMBRO', 'OUTUBRO', 'NOVEMBRO', 'DEZEMBRO'
        ];

        setMesAtual(nomeMeses[dataAtual.getMonth()]);
        setAnoAtual(dataAtual.getFullYear());

        // Calcula os dias do mês atual
        const ultimoDia = new Date(dataAtual.getFullYear(), dataAtual.getMonth() + 1, 0).getDate();
        setDiasDoMes(Array.from({ length: ultimoDia }, (_, i) => i + 1));
    }, []);

    const handleConfirmarDias = () => {
        if (diasSelecionados.length > 0) {
            setModalVisible(true);
        } else {
            Alert.alert('Aviso', 'Por favor, selecione pelo menos um dia!');
        }
    };

    const handleDiaPress = (dia: number) => {
        // Atualiza corretamente o estado dos dias selecionados
        setDiasSelecionados(prevDias => {
            const newDias = prevDias.includes(dia)
                ? prevDias.filter(d => d !== dia) 
                : [...prevDias, dia];
            
            // Debug para verificar o estado após a atualização
            console.log('Dias selecionados atualizados:', newDias);
            return newDias;
        });
    };

    const handleSalvarNoFirebase = async () => {
        if (!pet) {
            Alert.alert('Erro', 'Nenhum pet selecionado.');
            return;
        }

        try {
            await addDoc(collection(firestore, 'consultas'), {
                petId: pet.petId,
                userUID: auth.currentUser?.uid,
                diasSelecionados,
                horario,
                observacoes,
                createdAt: new Date(),
            });

            Alert.alert('Sucesso', 'Consulta salva com sucesso!');
            setModalVisible(false);
            setDiasSelecionados([]);
            setHorario('');
            setObservacoes('');
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.error('Erro ao salvar no Firebase:', error.message);
                Alert.alert('Erro', 'Não foi possível salvar os dados.');
            } else {
                console.error('Erro desconhecido:', error);
                Alert.alert('Erro', 'Ocorreu um erro inesperado.');
            }
        }
    };

    const renderDia = (dia: number) => {
        const isToday = dia === diaHoje;
        const isSelected = diasSelecionados.includes(dia);
        return (
            <TouchableOpacity
                key={dia}
                style={[
                    styles.dayButton,
                    isToday && styles.todayButton,
                    isSelected && styles.selectedDayButton
                ]}
                onPress={() => handleDiaPress(dia)}
            >
                <Text
                    style={[
                        styles.dayText,
                        isToday && styles.todayText,
                        isSelected && styles.selectedDayText
                    ]}
                >
                    {dia}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            {/* Cabeçalho */}
            <View style={styles.headerContainer}>
                <Image source={require('../../../assets/consulta.png')} style={styles.logoPetConsultas} />
                <Text style={styles.titlePetConsultas}>Consultas</Text>
                <Image source={require('../../../assets/patas.png')} style={styles.pawIconConsultas} />
            </View>
            {/* Separador */}
            <View style={styles.separator} />

            {/* Calendário */}
            <View style={styles.calendarContainer}>
                <Text style={styles.monthText}>{`${mesAtual} ${anoAtual}`}</Text>
                <View style={styles.weekHeader}>
                    {['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom'].map((dia, index) => (
                        <Text key={index} style={styles.weekDayText}>{dia}</Text>
                    ))}
                </View>
                <View style={styles.daysContainer}>
                    {diasDoMes.map(dia => renderDia(dia))}
                </View>
            </View>

            {/* Botão para confirmar dias */}
            <TouchableOpacity style={styles.confirmButton} onPress={handleConfirmarDias}>
                <Text style={styles.confirmButtonText}>Confirmar Dias</Text>
            </TouchableOpacity>

            {/* Modal */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContentConsultas}>
                        <Text style={styles.modalTitleConsultas}>Confirme os detalhes</Text>
                        
                        <Text>Horário:</Text>
                        <TextInput
                            style={styles.inputConsultas}
                            placeholder="Ex: 14:00"
                            value={horario}
                            onChangeText={setHorario}
                        />

                        <Text>Observações:</Text>
                        <TextInput
                            style={[styles.input, { height: 100 }]}
                            placeholder="Ex: Consulta de rotina"
                            value={observacoes}
                            onChangeText={setObservacoes}
                            multiline
                        />

                        <View style={styles.modalButtons}>
                            <Button title="Cancelar" onPress={() => setModalVisible(false)} />
                            <Button title="Salvar" onPress={handleSalvarNoFirebase} />
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
