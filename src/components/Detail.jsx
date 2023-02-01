import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";

export const Colors = {
  normal: "#a8a878",
  grass: "#78c850",
  ground: "#e0c068",
  fighting: "#c03028",
  rock: "#b8a038",
  steel: "#b8b8d0",
  fire: "#f08030",
  electric: "#f8d030",
  flying: "#a890f0",
  psychic: "#f85888",
  bug: "#a8b820",
  dragon: "#7038f8",
  water: "#6890f0",
  ice: "#98d8d8",
  poison: "#a040a0",
  dark: "#705848",
  ghost: "#705898",
  fairy: "#ffaec9",
};

const width = Dimensions.get("window").width;

export const Detail = ({ route }) => {
  const [pokemons, setPokemons] = React.useState({});

  const [colors, setColors] = React.useState(["#fff", "#fff"]);

  const { item } = route.params;

  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemons.id}.png`;

  React.useEffect(() => {
    fetch(`${item.url}`)
      .then((res) => res.json())
      .then((data) => {
        const colors = data.types?.map((item) => Colors[item.type.name]);
        if (colors.length === 1) colors.push(colors[0]);
        setColors(colors);
        setPokemons(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <>
      <LinearGradient
        style={{ flex: 1, alignItems: "center" }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={colors}
      >
        <Text style={styles.h1}>
          #{pokemons.id} {pokemons.name}
        </Text>
        <Image style={styles.img} source={{ uri: image }} />
        <FlatList
          data={pokemons.types}
          renderItem={({ item }) => {
            return (
              <Text
                style={[styles.p, { backgroundColor: Colors[item.type.name] }]}
              >
                {item.type.name}
              </Text>
            );
          }}
        />
      </LinearGradient>
    </>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: 50,
    textAlign: "center",
    fontWeight: "bold",
    color : 'white'
  },
  img: {
    width: width,
    height: 400,
  },
  p: {
    textAlign: "center",
    fontSize: 50,
    fontWeight: "bold",
    color: "white",
    margin: 10,
    borderWidth:  1,
    width : 300,
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
    paddingTop: 20,
    paddingBottom: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
});
