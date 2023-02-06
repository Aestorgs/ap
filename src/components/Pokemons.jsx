import React from "react";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { Pokemon } from "./Pokemon";
import { ContextSettings } from "./Context";

// affichage des pokemons rechercher et les filter 

const width = Dimensions.get("window").width;
export const Pokemons = ({ navigation }) => {
  const {offset , limit} = React.useContext(ContextSettings)
  const [input, setInput] = React.useState("");
  const [pokemons, setPokemons] = React.useState([]);

  React.useEffect(() => {
    const controller = new AbortController();
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`, {
      signal: controller.signal,
    })
      .then((res) => res.json())
      .then((data) => setPokemons(data.results))
      .catch((err) => console.log(err));
    return () => controller.abort();
  }, [offset , limit]);

  return (
    <>
      <View>
        <TextInput
          style={styles.inputs}
          placeholder="Search ..."
          onChangeText={(text) => setInput(text)}
          value={input}
        />
      </View>
      <FlatList
        style={styles.list}
        data={pokemons.filter((p, i) => p.name.includes(input.toLowerCase()))}
        keyExtractor={(item, index) => item.url.split("/")[6]}
        ItemSeparatorComponent={
          <View
            style={{
              flex: 1,
              height: 5,
              backgroundColor: "white",
            }}
          />
        }
        renderItem={({ item, index }) => (
          <Pokemon nav={navigation} item={item} />
        )}
      />
    </>
  );
};

const styles = StyleSheet.create({
  list: {
    width: width,
  },
  item: {
    textAlign: "center",
    marginVertical: 8,
  },
  inputs : {
      textAlign : 'center',
      borderBottomColor: 'white',
      borderBottomWidth: 5,
      padding : 10
  }
});
