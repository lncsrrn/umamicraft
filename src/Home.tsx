import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, TextInput, Pressable, ScrollView, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation, ParamListBase } from "@react-navigation/native";
import { Color, FontFamily } from "../GlobalStyles";
import Icon from 'react-native-vector-icons/FontAwesome';
import { doc, getDoc, getFirestore, onSnapshot } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import firebaseApp from '.././firebase';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<StackNavigationProp<ParamListBase>>();
  const [name, setName] = useState('Loading...');

  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);

  useEffect(() => {
    let unsubscribeUser = () => { };

    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (user) {
        const docRef = doc(db, 'users', user.uid);

        unsubscribeUser = onSnapshot(docRef, (docSnap) => {
          if (docSnap.exists()) {
            setName(docSnap.data().name); // Assuming there is a 'name' field in the document
          } else {
            console.log('No user data found in Firestore');
          }
        }, (error) => {
          console.log('Error getting document:', error);
        });
      } else {
        // Handle user being logged out
        setName('Guest');
      }
    });

    return () => {
      unsubscribeAuth(); // Detach auth listener on cleanup
      unsubscribeUser(); // Detach user data listener on cleanup
    };
  }, []);

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>

        <View style={styles.header}>
          <Text style={styles.welcome}>Welcome,</Text>
          <Text style={styles.username}>{name || 'Guest'}!</Text>
        </View>


        <View style={styles.content}>

          <View style={styles.introCard}>
            <Text style={styles.lead}>Where Ingredients Meet Inspiration!</Text>
            <Text style={styles.p}>Discover personalized recipes tailored to your taste,
              health goals, and allergies, all at your fingertips!</Text>
          </View>

          <View style={styles.cardSect}>

            <View style={styles.sectTitle}>
              <Text style={styles.title}>
                Featured Recipes
              </Text>
            </View>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.carouselCont}>

              <View style={styles.recipeCard}>
                <View style={styles.imgCont}>
                  <Image src={require("../assets/recipe1.png")} style={styles.img} />
                </View>
                <View style={styles.recipeDetails}>
                  <View style={styles.row}>
                    <Text style={styles.recipeName}>Easy Chicken Recipe</Text>
                  </View>
                  <Text style={styles.recipeCal}>658 Cal</Text>
                </View>
              </View>

              <View style={styles.recipeCard}>
                <View style={styles.imgCont}>
                  <Image src={require("../assets/recipe1.png")} style={styles.img} />
                </View>
                <View style={styles.recipeDetails}>
                  <View style={styles.row}>
                    <Text style={styles.recipeName}>Easy Chicken Recipe</Text>
                  </View>
                  <Text style={styles.recipeCal}>658 Cal</Text>
                </View>
              </View>

              <View style={styles.recipeCard}>
                <View style={styles.imgCont}>
                  <Image src={require("../assets/recipe1.png")} style={styles.img} />
                </View>
                <View style={styles.recipeDetails}>
                  <View style={styles.row}>
                    <Text style={styles.recipeName}>Easy Chicken Recipe</Text>
                  </View>
                  <Text style={styles.recipeCal}>658 Cal</Text>
                </View>
              </View>

              <View style={styles.recipeCard}>
                <View style={styles.imgCont}>
                  <Image src={require("../assets/recipe1.png")} style={styles.img} />
                </View>
                <View style={styles.recipeDetails}>
                  <View style={styles.row}>
                    <Text style={styles.recipeName}>Easy Chicken Recipe</Text>
                  </View>
                  <Text style={styles.recipeCal}>658 Cal</Text>
                </View>
              </View>

              <View style={styles.recipeCard}>
                <View style={styles.imgCont}>
                  <Image src={require("../assets/recipe1.png")} style={styles.img} />
                </View>
                <View style={styles.recipeDetails}>
                  <View style={styles.row}>
                    <Text style={styles.recipeName}>Easy Chicken Recipe</Text>
                  </View>
                  <Text style={styles.recipeCal}>658 Cal</Text>
                </View>
              </View>

              <View style={styles.recipeCard}>
                <View style={styles.imgCont}>
                  <Image src={require("../assets/recipe1.png")} style={styles.img} />
                </View>
                <View style={styles.recipeDetails}>
                  <View style={styles.row}>
                    <Text style={styles.recipeName}>Easy Chicken Recipe</Text>
                  </View>
                  <Text style={styles.recipeCal}>658 Cal</Text>
                </View>
              </View>

            </ScrollView>

          </View>

          <View style={styles.cardSect}>

            <View style={styles.sectTitle}>
              <Text style={styles.title}>
                Search by Ingredients
              </Text>
              <Pressable
                onPress={() => navigation.navigate("ViewAllIngredients")}
              >
                <Text style={styles.viewAll}>View all</Text>
              </Pressable>
            </View>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.carouselCont}>
              <View style={styles.ingreItemCont}>
                <Image
                  style={styles.ingreIcon}
                  source={require("../assets/Egg.png")}
                />
                <Text style={styles.ingreText}>Egg</Text>
              </View>
              <View style={styles.ingreItemCont}>
                <Image
                  style={styles.ingreIcon}
                  source={require("../assets/garlic.png")}
                />
                <Text style={styles.ingreText}>Garlic</Text>
              </View>
              <View style={styles.ingreItemCont}>
                <Image
                  style={styles.ingreIcon}
                  source={require("../assets/onion.png")}
                />
                <Text style={styles.ingreText}>Onion</Text>
              </View>
              <View style={styles.ingreItemCont}>
                <Image
                  style={styles.ingreIcon}
                  source={require("../assets/Steak.png")}
                />
                <Text style={styles.ingreText}>Pork</Text>
              </View>
              <View style={styles.ingreItemCont}>
                <Image
                  style={styles.ingreIcon}
                  source={require("../assets/cheese.png")}
                />
                <Text style={styles.ingreText}>Cheese</Text>
              </View>
              <View style={styles.ingreItemCont}>
                <Image
                  style={styles.ingreIcon}
                  source={require("../assets/bread.png")}
                />
                <Text style={styles.ingreText}>Bread</Text>
              </View>
              <View style={styles.ingreItemCont}>
                <Image
                  style={styles.ingreIcon}
                  source={require("../assets/Milk.png")}
                />
                <Text style={styles.ingreText}>Milk</Text>
              </View>
              <View style={styles.ingreItemCont}>
                <Image
                  style={styles.ingreIcon}
                  source={require("../assets/butter.png")}
                />
                <Text style={styles.ingreText}>Butter</Text>
              </View>
              <View style={styles.ingreItemCont}>
                <Image
                  style={styles.ingreIcon}
                  source={require("../assets/Carrot.png")}
                />
                <Text style={styles.ingreText}>Carrot</Text>
              </View>
              <View style={styles.ingreItemCont}>
                <Image
                  style={styles.ingreIcon}
                  source={require("../assets/Banana.png")}
                />
                <Text style={styles.ingreText}>Banana</Text>
              </View>
              <View style={styles.ingreItemCont}>
                <Image
                  style={styles.ingreIcon}
                  source={require("../assets/Potato.png")}
                />
                <Text style={styles.ingreText}>Potato</Text>
              </View>
            </ScrollView>

          </View>

          <View style={styles.cardSect}>

            <View style={styles.sectTitle}>
              <Text style={styles.title}>
                Categories
              </Text>
            </View>

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.carouselCont}>

              <View style={styles.categCard}>
                <Image
                  src={require("../assets/shoyu.png")}
                  style={styles.categImg}
                />
                <Text style={styles.categName}>Shoyu</Text>
              </View>
              <View style={styles.categCard}>
                <Image
                  src={require("../assets/shoyu.png")}
                  style={styles.categImg}
                />
                <Text style={styles.categName}>Shoyu</Text>
              </View>
              <View style={styles.categCard}>
                <Image
                  src={require("../assets/shoyu.png")}
                  style={styles.categImg}
                />
                <Text style={styles.categName}>Shoyu</Text>
              </View>
              <View style={styles.categCard}>
                <Image
                  src={require("../assets/shoyu.png")}
                  style={styles.categImg}
                />
                <Text style={styles.categName}>Shoyu</Text>
              </View>

            </ScrollView>

          </View>

        </View>


      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  categName: {
    color: "#841D06",
    fontSize: 12,
    fontWeight: '700'
  },
  categImg: {
    width: 48,
    height: 48
  },
  categCard: {
    height: 88,
    width: 88,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: "#F3D9A4",
    borderRadius: 8,
    marginHorizontal: 4
  },
  p: {
    fontSize: 12
  },
  lead: {
    fontFamily: FontFamily.hiraKakuStdNW8,
    fontSize: 16,
    color: "#841D06"
  },
  introCard: {
    width: "100%",
    height: 133,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: "#F3D9A4",
    borderRadius: 16,
    paddingHorizontal: 24,
    paddingVertical: 24
  },
  recipeCal: {
    fontSize: 8,
    color: 'white'
  },
  recipeName: {
    color: 'white',
    width: 104,
    fontSize: 12,
    fontWeight: '700'
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    width: "100%",
    justifyContent: 'space-between',
  },
  recipeDetails: {
    backgroundColor: "#841D06",
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 57,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8
  },
  img: {
    height: 160,
    width: 183,
    resizeMode: 'contain'
  },
  imgCont: {
    height: 160,
    width: 183,
  },
  recipeCard: {
    width: 183,
    height: 217,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#841D06",
    marginHorizontal: 8
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    paddingHorizontal: 24,
    paddingTop: 160,
    width: "100%",
    overflow: 'hidden',
    gap: 24,
    paddingBottom: 64
  },
  sectTitle: {
    width: "100%",
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  cardSect: {
    display: 'flex',
    flexDirection: 'column',
    width: "100%",
    gap: 16,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  carouselCont: {
    width: "100%",
    display: 'flex',
    flexDirection: 'row',
    overflow: 'visible'
  },
  ingreItemCont: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
    width: 56,
    marginHorizontal: 8
  },
  ingreIcon: {
    height: 56,
    width: 56,
  },
  ingreText: {
    fontSize: 12
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    backgroundColor: "#841D06",
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    position: 'absolute',
    width: "100%",
    height: 192,
    paddingHorizontal: 24,
    paddingBottom: 24,
    gap: 8
  },
  welcome: {
    width: "100%",
    fontSize: 12,
    color: Color.white,
  },
  username: {
    width: "100%",
    color: Color.white,
    fontFamily: FontFamily.hiraKakuStdNW8,
    fontSize: 32,
  },
  title: {
    fontFamily: FontFamily.hiraKakuStdNW8,
    fontSize: 16,
    color: "#841D06"
  },
  viewAll: {
    fontSize: 12,
    color: 'black'
  },

});

export default HomeScreen;












