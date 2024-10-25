import { FlatList, View, Image } from 'react-native';
import Animated, { LinearTransition, FadeInLeft, FadeOutRight } from 'react-native-reanimated'; 
import { useState, useEffect, useRef } from 'react';
import { styles } from '../../styles';

const DATA= [
{
 image: require('../../assets/RobloxScreenShot20230903_215929369.png')
},
{
    image: require('../../assets/RobloxScreenShot20230903_215929369.png')
   },
]
export const Carousel = () => {
    const [activeBanner, setActiveBanner] = useState<number>(0);
   
    const FlatListRef = useRef<FlatList>(null);

    const onViewableItemsChanged = ({ viewableItems }:any ) => {
        if(viewableItems[0] != undefined){
            setActiveBanner(viewableItems[0] ?.index);
        }
    };

    const viewabilityConfigCallbackPairs = useRef([
    {
        viewabilityConfig: {
            itemVisiblePercentThreshold: 50,
        },
        onViewableItemsChanged,
    },
    ]);

    useEffect(() => {
        if(activeBanner == DATA.length - 1){
            return;
        }
        const timeId = setTimeout(() => {
            FlatListRef.current?.scrollToIndex({
                index: activeBanner + 1,
                animated: true
            })
            setActiveBanner(old => old + 1);
        },3000);
        return () => clearTimeout(timeId);
    },[activeBanner])


    return(
   <>
   <View style={styles.carouselContainer}>
    <FlatList
    ref={FlatListRef}
     data={DATA} renderItem={({ item, index}) => (
        <View style={styles.carousel}>
            <Image source={item.image} style={styles.carouselImage} resizeMode="cover"/>
        </View>

    )}
    style={styles.flatListCarousel}

    contentContainerStyle={{
    justifyContent: 'center',
    flexDirection: 'row',
    }}
    pagingEnabled
    viewabilityConfigCallbackPairs={viewabilityConfigCallbackPairs.current}
    horizontal
    keyExtractor={(item,index) => String(index)}
    showsHorizontalScrollIndicator={false}
    />
   
     <FlatList data={DATA} renderItem={({ item, index}) => (
        <Animated.View
        layout={LinearTransition}
        entering={FadeInLeft}
        exiting={FadeOutRight}
        style={{
// Este é o unico style que é estilizado dentro do codigo porque precisei usar o active banner
            width:  activeBanner == index ? 12 : 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: activeBanner == index ? 'black' : 'gray',
            marginHorizontal: 2,
        }}
        />
    )}
    style={styles.flatListBolinhasCarousel}
    contentContainerStyle={{
        marginTop: 10,
        justifyContent: 'center',
        flexDirection: 'row',
    }}
    scrollEnabled={false}
    horizontal
    keyExtractor={(item,index) => String(index)}
    />
    </View>
   </>
);
};
