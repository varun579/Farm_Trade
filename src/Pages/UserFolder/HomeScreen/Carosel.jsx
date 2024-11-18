
import React, { useState, useEffect, useRef } from 'react';
import { View, Dimensions, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';


const { width } = Dimensions.get('window');

const imageData = [
  require('../../../assets/fruits.webp'),
  require('../../../assets/farmer.webp'),
  require('../../../assets/pulses2.webp'),
  require('../../../assets/istock.jpg'),
  require('../../../assets/pulses3.webp'),
  require('../../../assets/farmer2.webp'),
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef();


  useEffect(() => {
    const interval = setInterval(() => {
      if (flatListRef.current) {
        const nextIndex = (currentIndex + 1) % imageData.length;
        flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
        setCurrentIndex(nextIndex);
      }
    }, 3000); 

    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleScroll = (event) => {
    const x = event.nativeEvent.contentOffset.x;
    setCurrentIndex(Math.round(x / width));
  };

  return (
    <View style={styles.container}>
      <View style={styles.carouselContainer}>
        <FlatList
          ref={flatListRef}
          data={imageData}
          horizontal
          pagingEnabled
          onScroll={handleScroll}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <View style={styles.itemContainer} key={index}>
              <TouchableOpacity style={styles.item}>
                <Image source={item} style={styles.image} />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
        <View style={styles.dotsContainer}>
          {imageData.map((_, index) => (
            <View
              key={index}
              style={[
                styles.dot,
                {
                  width: currentIndex === index ? 10 : 18,
                  height: currentIndex === index ? 10 : 8,
                  borderRadius: currentIndex === index ? 5 : 4,
                  backgroundColor: currentIndex === index ? 'green' : 'gray',
                },
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
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:20
  },
  carouselContainer: {
    width: width,
    alignItems: 'center',
  },
  itemContainer: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    width: '95%',
    height: 230,
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8, // Space between images and dots
  },
  dot: {
    marginLeft: 5,
  },
});

export default Carousel;




































// import { StyleSheet, Text, View,Image,Dimensions} from 'react-native'
// import React, { useState,useRef, useEffect } from 'react'
// import { FlatList } from 'react-native-gesture-handler'


// export default function Carosel() {

//   const flatlistRef=useRef();
//   const [activeIndex,setActiveIndex]=useState(0)

//   // useEffect(()=>
//   // {
       

//   //   setInterval(()=>{
//   //     if(activeIndex=== arr.length-1){
//   //       flatlistRef.current.scrollToIndex({
//   //         index:0,
//   //         animation:true
//   //       })
//   //     }
//   //     else
//   //     {
//   //       flatlistRef.current.scrollToIndex({
//   //         index:activeIndex+1,
//   //         animation:true
//   //       })
//   //     }

//   //   },3000)




//   // })



  
  

//   const getItemLayout=(data,index)=>(
//     {
//          length: screenWidth,
//          offset: screenWidth*index,
//          index: index
//     })






//   const arr=[
//     {
//       id:'1',
//       uri:require('../../../assets/fruits.webp')//../assets/fruits.webp
//     },
//     {
//        id:'2',
//        uri:require('../../../assets/farmer.webp')

//     },
//     {
//       id:'3',
//       uri:require('../../../assets/pulses2.webp')
//     },
//     {
//       id:'4',
//       uri:require('../../../assets/veg.png')
//     },
//     {
//       id:'5',
//       uri:require('../../../assets/pulses3.webp')

//     },
//     {
//       id:'6',
//       uri:require('../../../assets/farmer2.webp')
//     }
//   ]

//     const screenWidth=Dimensions.get("window").width


//     const renderItem=({item,index})=>
//       {
//           return (
//             <View >
//                  <Image
                  
//                   source={item.uri}
//                  style={{height:200,width:380,borderRadius:15,marginRight:14}}
//                  />




//              </View>




//           )
//       }


//       const handleScroll=(event)=>
//         {
//             const scrollPosition=event.nativeEvent.contentOffset.x;
//           //  console.log(scrollPosition)
//             const index=Math.ceil(scrollPosition/screenWidth);
//             //console.log(index)
//             setActiveIndex(index)
//         }

//     const renderDotIndicators=()=>
//       {
//        return (arr.map((dot,index)=>
//           {
//             if(activeIndex===index)
//               {
//                 return (
//                   <View key={index} style={{backgroundColor:'green', height:10,width:10,borderRadius:5,marginHorizontal:6}}>

//                   </View>
//                 )
//               }
//               else
//               {
//                 <View key={index} style={{backgroundColor:'red', height:10,width:10,borderRadius:5,marginHorizontal:6}}>

//                 </View>
//               }
//               return(
//                 <View key={index} style={{backgroundColor:'red', height:10,width:10,borderRadius:5,marginHorizontal:6}}>

//                 </View>


//               )
//           }
//         ))

//       }



//   return (
//     <View style={{marginTop:20,}}>
//       <FlatList getItemLayout={getItemLayout} ref={flatlistRef} data={arr}  renderItem={renderItem} horizontal={true} pagingEnabled={true} onScroll={handleScroll} keyExtractor={(item)=>item.id}  showsHorizontalScrollIndicator={false}  removeClippedSubviews={true} initialNumToRender={2}               
//       maxToRenderPerBatch={2}    />
     
//      <View style={{flexDirection:'row',justifyContent:'center', marginTop:15 }}>
//      {renderDotIndicators()}
//      </View>
     




      
//     </View>
//   )
// }

// const styles = StyleSheet.create({
  
// })


