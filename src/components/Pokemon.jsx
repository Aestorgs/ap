import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const Pokemon = ({ item, nav }) => {
  const index = item.url.split("/")[6];
  const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${index}.png`;

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => nav.navigate("Detail", { item })}
    >
      <View style={styles.container}>
        <View>
          <Image style={styles.image} source={{ uri: image }}></Image>
        </View>
        <Text>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  image: {
    resizeMode: "contain",
    height: 150,
    width: 150,
  },
});
