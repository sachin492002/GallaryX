import {Button, FlatList, Text, View, Image, StyleSheet} from "react-native";
import * as MediaLibrary from 'expo-media-library';
import {useEffect, useState} from "react";
import NoPermission from "./NoPermission";
import Colors from "../constant";
export default function PhotosScreen() {
    const [photos, setPhotos] = useState([]);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [after, setAfter] = useState(null);
    const [permit,setPermit] = useState(null);

    const loadMorePhotos = async () => {
        if (hasNextPage) {
            const { assets, endCursor, hasNextPage: next } = await MediaLibrary.getAssetsAsync({
                mediaType: MediaLibrary.MediaType.photo,
                first: 20, // Number of photos per page
                after,
            });
            setPhotos([...photos, ...assets]);
            setAfter(endCursor);
            setHasNextPage(next);
        }
    };

    useEffect(() => {
        (async () => {
            const { status } = await MediaLibrary.requestPermissionsAsync();
            if (status === 'granted') {
                setPermit(status);
                await loadMorePhotos();
            }
        })();
    }, []);
   console.log(photos.at(photos.length - 2))
    return (
        <View style={{ flex: 1 }}>
            <View
            style={{
              display : 'absolute',
              top : 50,

                zIndex: 99,
            }}>
                <Text
                    style={{
                        padding :10,
                        fontWeight:500,
                        fontSize: 22,
                        color : Colors.White,
                        backgroundColor : 'rgba(180,180,180,0.1)'
                    }}
                >{(photos.length > 0) ? new Date(photos.at(photos.length - 2).creationTime).toLocaleDateString('en-US',{year:'numeric',month:'short',day:'numeric'}): new Date().toLocaleDateString('en-US',{year:'numeric',month:'short',day:'numeric'})}</Text>
            </View>
            <FlatList
                data={photos}
                style={{
                    flex:1,
                }}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Image
                        source={{ uri: item.uri }}
                        style={{ width: 100, height: 100, margin: 1, alignItems:'center',flex:1 }}
                    />
                )}
                numColumns={3}
                onEndReached={loadMorePhotos}
                onEndReachedThreshold={0.5}
            />
            {/*{!hasNextPage && <Button title="No more photos" disabled />}*/}
            {permit !== "granted" && <NoPermission/>}
        </View>
    );

}

