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
      width={width * 0.8}
      height={width * 0.6}
      autoPlay={true}
      autoPlayInterval={3000}
      scrollAnimationDuration={1000} // Duração da animação para a rotação automática
      data={data}
      renderItem={({ item }: { item: CarouselItem }) => (
        <View style={styles.itemContainer}>
          <Image source={item.imageSource} style={styles.image} />
          <Text style={styles.title}>{item.title}</Text>
        </View>
      )}
      panGestureHandlerProps={{
        activeOffsetX: [-10, 10], // Configura sensibilidade para arraste lateral
      }}
    />
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D2A679',
  },
  image: {
    width: '100%',
    height: '80%',
    resizeMode: 'cover',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
});

export default CustomCarousel;
