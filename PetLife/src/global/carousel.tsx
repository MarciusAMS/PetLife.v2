import React from 'react';
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

interface CarouselItem {
  title: string;
  imageSource: any;
}

const { width, height } = Dimensions.get('window');

const data: CarouselItem[] = [
  { title: 'Foto 1', imageSource: require('../../assets/cuidadosGerais.png') },
  { title: 'Foto 2', imageSource: require('../../assets/plantasToxicas.png') },
  { title: 'Foto 3', imageSource: require('../../assets/parasitasExternos.png') },
];

const CustomCarousel = () => {
  return (
    <Carousel
      loop
      width={width * 0.95} // Largura próxima ao total da tela
      height={height * 0.5} // Aumentando a altura do carrossel
      autoPlay={true}
      autoPlayInterval={3000}
      scrollAnimationDuration={1000}
      data={data}
      renderItem={({ item }: { item: CarouselItem }) => (
        <View style={styles.itemContainer}>
          <Image source={item.imageSource} style={styles.image} />
          <Text style={styles.title}>{item.title}</Text>
        </View>
      )}
      panGestureHandlerProps={{
        activeOffsetX: [-10, 10],
      }}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    borderRadius: 15,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D2A679',
    marginVertical: 15, // Espaço acima e abaixo do carrossel
    padding: 10,
  },
  image: {
    width: '100%',
    height: '90%', // Ajustando para ocupar quase todo o container
    resizeMode: 'cover',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
});

export default CustomCarousel;
