import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import Colors from "../constant";

export default function AlbumScreen({ navigation }) {
    const [albums, setAlbums] = useState([]);

    useEffect(() => {
        (async () => {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status === 'granted') {
                const albums = await MediaLibrary.getAlbumsAsync();
                for (const al of albums) {
                    const { assets } = await MediaLibrary.getAssetsAsync({
                        mediaType: MediaLibrary.MediaType.photo,
                        album: al.id,
                        first: 1,
                    });
                    al.poster = assets[0];
                }
                setAlbums(albums);
            }
        })();
    }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity
            style={styles.albumItem}
            onPress={() => navigation.navigate('PhotosInAlbum', { album: item })}
        >
            <Image source={item?.poster} style={{ width: "100%", height: 150, overflow:'hidden' }} />
            <Text style={{
                overflow:'hidden'
            }}>{item.title}</Text>
        </TouchableOpacity>
    );

    return (

            <View style={styles.container}>
                <Text
                    style={{
                        fontSize: 28,
                        fontWeight: 800,
                    }}
                >Albums</Text>
                <View style={
                    {
                        flex : 1,
                        justifyContent: 'center',
                        alignItems:'center',
                    }
                }>
                <FlatList
                    data={albums}
                    renderItem={renderItem}
                    numColumns={2}
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.containerFlat}
                />
                </View>
            </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'col',
        flexWrap: 'wrap',
        padding: 10,
        rowGap: 40,
        marginTop: 100,
    },
    albumItem: {
        width: '47%',
        marginRight: 10,
        alignItems:'center',
        borderStyle:'solid',
        borderColor : Colors.Black,
        borderWidth: 1,
        borderRadius:10,
    },
    containerFlat:{
        rowGap:20,
        columnGap: 20,
    }
});
