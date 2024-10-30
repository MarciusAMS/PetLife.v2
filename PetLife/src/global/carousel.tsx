import React from 'react';
import { View, Text, Image, Dimensions, StyleSheet } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

interface CarouselItem {
  title: string;
  imageSource: any;
}

const { width } = Dimensions.get('window');

const data: CarouselItem[] = [
  { title: 'Foto 1', imageSource: require('../../assets/cuidadosGerais.png') },
  { title: 'Foto 2', imageSource: require('../../assets/plantasToxicas.png') },
  { title: 'Foto 3', imageSource: require('../../assets/parasitasExternos.png') },
];

const CustomCarousel = () => {
  return (
    <Carousel
      loop
      width={width * 0.9} // Aumentando para ocupar quase toda a largura da tela
      height={width * 0.6} // Mantendo uma altura mais compacta
      autoPlay={true}
      autoPlayInterval={3000}
      scrollAnimationDuration={1000}
      data={data}
      renderItem={({ item }: { item: CarouselItem }) => (
        <View style={styles.itemContainer}>
          <Image source={item.imageSource} style={styles.image} />
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
    marginVertical: 20, // Espaço acima e abaixo do carrossel
  },
  image: {
    width: '100%',
    height: '100%', // Ajustando altura da imagem dentro do container
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
