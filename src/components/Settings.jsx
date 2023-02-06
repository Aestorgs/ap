import React from "react"
import { Button, View } from "react-native"
import { ContextSettings } from "./Context"

// affichage des parametres

export const Settings = () => {
    const {setLimit , setOffset} = React.useContext(ContextSettings)

    const update = ({offset , limit}) => {
        setOffset(offset)
        setLimit(limit)
    }
    return (
        <View  style={{flex : 1  , alignItems: "center" , justifyContent: 'space-evenly'}} >
        <Button title="Premiere" onPress={() => update({offset : 0 , limit : 151})}></Button>
        <Button title="Deuxieme" onPress={() => update({offset : 151 , limit : 251})}></Button>
        </View>
    )
}
