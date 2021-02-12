import React from "react";
import {
    View,
    TouchableHighlight,
    StyleSheet
} from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons"

interface Props{

}

const AddEvent: React.FC<Props> = (props) => {

    return(
        <View style={styles.container}>
            <TouchableHighlight style={styles.button}>
                <Icon name={"add-circle"} size={60} color={'#0A68E8'}/>
            </TouchableHighlight>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {

        width: '100%',
        zIndex: 99,
        alignContent: 'center',
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36,
    },
    button: {
        alignSelf: 'center',

    }
})

export default AddEvent;