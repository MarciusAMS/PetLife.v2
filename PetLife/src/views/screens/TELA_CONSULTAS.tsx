import React, { useEffect, useState} from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, Linking, Dimensions, ImageBackground, Alert } from 'react-native';
import { styles } from '../../../styles';
import { auth } from '../../../firebaseService';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CustomCarousel from '../../global/carousel';
import { useNavigation } from '@react-navigation/native';

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

    useEffect(() => {
        const dataAtual = new Date();
        const nomeMeses = [
            'JANEIRO', 'FEVEREIRO', 'MARÇO', 'ABRIL', 'MAIO', 'JUNHO',
            'JULHO', 'AGOSTO', 'SETEMBRO', 'OUTUBRO', 'NOVEMBRO', 'DEZEMBRO'
        ];

        setMesAtual(nomeMeses[dataAtual.getMonth()]);
        setAnoAtual(dataAtual.getFullYear());

        // Calcular os dias do mês atual
        const ultimoDia = new Date(dataAtual.getFullYear(), dataAtual.getMonth() + 1, 0).getDate();
        setDiasDoMes(Array.from({ length: ultimoDia }, (_, i) => i + 1));
    }, []);

    const handleDiaPress = (dia: number) => {
        if (diasSelecionados.includes(dia)) {
            setDiasSelecionados(diasSelecionados.filter(d => d !== dia));
        } else {
            setDiasSelecionados([...diasSelecionados, dia]);
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

            {/* Notificações */}
            <View style={styles.notificationsContainer}>
                <Text style={styles.notificationsText}>Notificações ativadas ✅</Text>
                <Text style={styles.selectedDaysText}>Dia: {diasSelecionados.join(' e ')}</Text>
            </View>
        </View>
    );
}