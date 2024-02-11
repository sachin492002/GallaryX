import {View, Text, Touchable, Button} from "react-native";


export default function NoPermission(){
    return(
        <View style={{
            flex:1,
            padding : 10,
        }}>
            <Text style={{
                textAlign:'left',
                fontStyle: 'normal',
                fontWeight: '100',
            }}>- GallaryX need storage permission to show images.
            </Text>
           <Text style={{
               textAlign:'left',
               fontStyle: 'normal',
               fontWeight: '100',
           }}>- Go to permissions and allow media and storage permissions.
           </Text>
        </View>
    )
}