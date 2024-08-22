import { useState, useEffect, useRef } from 'react';
import { View, FlatList, Image } from 'react-native'; 
import Animated, {Layout, FadeInLeft, FadeOutRight} from 'react-native-reanimated';
import {Dimensions} from 'react-native';

const DATA = [
  {
    image: 'https://i.pinimg.com/564x/e6/a9/ec/e6a9ec17a799709fb1b7fb0c0714b6b0.jpg'
  }, 

  {
    image: 'https://i.pinimg.com/564x/4d/cb/43/4dcb438b80c4b6224d6c3c8d834a0786.jpg'
  }, 
  
  {
    image: 'https://i.pinimg.com/564x/4d/cb/43/4dcb438b80c4b6224d6c3c8d834a0786.jpg'
  }, 

  {
    image: 'https://i.pinimg.com/564x/49/77/25/49772542ff6e208e69331cbeacc651a8.jpg'
  },   
];

export const Carousel = () => {
const [activeBanner, setActiveBanner] = useState<number>(0); 
const FlatlistRef = useRef<FlatList>(null); 

const onViewableItemsChanged = ({viewableItems}: any) => {
  if (viewableItems[0] != undefined) { 
setActiveBanner(viewableItems[0]?.index);
}
}; 
const viewabilityConfigCallbackPairs= useRef([ 
  {
    viewabilityConfig: {
      itemVisiblePercentThreshold: 50, 
    }, //AQUI FICA O TAMANHO DE QUANDO PASSA OS SLIDES
   onViewableItemsChanged
  },
]);

useEffect(() => { // o rapaz falou q se colocar p dr loop vai bugar o cod
  if (activeBanner == DATA.length - 1 ){
    return; 
  }
  const timeID = setTimeout(() => {
    FlatlistRef.current?.scrollToIndex({
      index: activeBanner + 1, 
      animated: true 
    })
    setActiveBanner(old => old + 1);
  },3000);
  return () => clearTimeout(timeID)
  }, [activeBanner])


  return (
  <View style={{ alignItems: 'center'}}>
    <FlatList 
    ref={FlatlistRef}
    data={DATA}
     renderItem={({item, index}) => (
    <View
style={{
  width: Dimensions.get('screen').width * 0.8,
  alignItems: 'center', 
  height: 180, 
  borderRadius: 30, 
  marginHorizontal: 40,
}}
  >    
      <Image source={{
        uri: item.image, 
      }}

      style={{
        width: '100%',
        height: '100%',
        alignSelf: 'center',
        borderRadius: 30, 
      }}
      resizeMode='contain'
      />

    </View>
    )} 

    style={{
      paddingTop:20, 
      height:1,
    }}
    contentContainerStyle={{
      marginLeft: -13, 
    }}
    pagingEnabled
    viewabilityConfigCallbackPairs={ viewabilityConfigCallbackPairs.current}
    horizontal
    keyExtractor={(item, index) => String(index)}
    showsHorizontalScrollIndicator={false}
    />
      <FlatList data={DATA}
     renderItem={({item, index}) => (

      <Animated.View 
      layout={Layout}
      entering={FadeInLeft}
      exiting={FadeOutRight}
      style={{
        width: activeBanner == index ? 12 : 8, // talvez falte um = 
        height: 8, 
        borderRadius:4, 
        backgroundColor: activeBanner == index ? 'black' : 'gray', // aqui deixa a bolinha preta enquanto passa os slides, talvez esteja faltando um =
        marginHorizontal: 2, 
      }}
/>
    )} 
    style={{
      paddingTop:20, 
      alignSelf: 'center',
      bottom: 100, 
    }}
    contentContainerStyle={{
      marginLeft: -13, 
    }}
scrollEnabled={false}
horizontal
keyExtractor={(item, index) => String(index)}
    />
  </View>
  );
}; 







/*
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Abra no seu aplicativo do EXPO GO</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
*/ 