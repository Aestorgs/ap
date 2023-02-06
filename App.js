import { StatusBar } from "expo-status-bar";
import { Pokemons } from "./src/components/Pokemons";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Detail } from "./src/components/Detail";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { ContextSettings } from "./src/components/Context";
import React from "react";
import { Settings } from "./src/components/Settings";

// utilisation des routes 
const stack = createNativeStackNavigator();

export default function App() {
  const [offset , setOffset] = React.useState(0)
  const [limit , setLimit] = React.useState(151)
  return (
   
    <NavigationContainer>
        <ContextSettings.Provider value={{offset , setOffset , limit , setLimit}}>
      <stack.Navigator>
        <stack.Screen
          name="Home"
          component={Pokemons}
          options={({navigation }) => ({
           headerRight : () => <MaterialIcons name="settings" size={30} color={"555"} onPress={() => navigation.navigate('Settings' ,  {})}/>
          })}
        />
        <stack.Screen
          name="Detail"
          component={Detail}
          options={({route}) => ({
            title : route.params.item.name[0].toUpperCase() + route.params.item.name.substring(1),
            headerTitleStyle : {fontWeight : 'bold'}
          })}
        />
        <stack.Screen
          name="Settings"
          component={Settings}
        />

      </stack.Navigator>
      </ContextSettings.Provider>
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
