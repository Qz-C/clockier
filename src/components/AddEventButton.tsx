import React from "react";
import {
    SafeAreaView,
    TouchableHighlight,
    StyleSheet
} from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons"

interface Props{

}

const AddEvent: React.FC<Props> = (props) => {
    return(
        <SafeAreaView style={styles.container}>
            <TouchableHighlight style={styles.button}>
                <Icon name={"add-circle"} size={60} color={"#0A68E8"}/>
            </TouchableHighlight>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        zIndex: 99,
        alignContent: 'center',
        justifyContent: 'center'
    },
    button: {
        alignSelf: 'center'
    }
})

export default AddEvent;