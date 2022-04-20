import React, { Component , useState , useEffect } from 'react';
import { View, Text, StyleSheet  , BackHandler , ScrollView , Alert} from 'react-native';

export default function Sample(){

    const [value, setValue] = useState(new Date());
    return (
        <View style={styles.container}>
            <Text>Masukan Tanggal Cuti</Text>
            {/* <DatePicker value={value} onChange={setValue} />; */}
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1  ,
        justifyContent : 'center' ,
        alignItems : 'center'
    }
})