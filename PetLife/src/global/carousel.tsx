import React, { useState } from 'react';
import { View, Image, Dimensions, StyleSheet } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

interface CarouselItem {
  title: string;
  imageSource: any;
}

const { width } = Dimensions.get('window');

const data: CarouselItem[] = [
  { title: 'Cuidados Gerais', imageSource: require('../../assets/cuidadosGerais.png') },
  { title: 'Plantas Toxicas', imageSource: require('../../assets/plantasToxicas.png') },
  { title: 'Parasitas Externos', imageSource: require('../../assets/parasitasExternos.png') },
  { title: 'Pode Comer', imageSource: require('../../assets/podeComer.png') },
  { title: 'Não Pode Comer', imageSource: require('../../assets/naoPodeComer.png') },
];

const CustomCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <View style={styles.container}> {/* View principal controlando a posição geral */}
      <View style={styles.carouselWrapper}> {/* Envolvendo o carrossel e bolinhas */}
        <Carousel
          loop
          width={width * 0.9}
          height={width * 0.6}
          autoPlay={true}
          autoPlayInterval={3000}
          scrollAnimationDuration={1000}
          data={data}
          onSnapToItem={(index) => setCurrentIndex(index)}
          renderItem={({ item }: { item: CarouselItem }) => (
            <View style={styles.itemContainer}>
              <Image source={item.imageSource} style={styles.image} />
            </View>
          )}
          panGestureHandlerProps={{
            activeOffsetX: [-10, 10],
          }}
        />
        
        {/* Bolinhas de indicação do índice atual */}
        <View style={styles.dotsContainer}>
          {data.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                currentIndex === index && styles.activeDot, // Estilo para a bolinha ativa
              ]}
            />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  carouselWrapper: {
    alignItems: 'center',
  },
  itemContainer: {
    flex: 1,
    borderRadius: 15,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D2A679',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'gray',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: 'black',
  },
});

export default CustomCarousel;
