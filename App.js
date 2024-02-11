
import { StyleSheet, Text, View } from 'react-native';
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import { NavigationContainer } from '@react-navigation/native';
import PhotosScreen from "./Screen/PhotosScreen";
import AlbumScreen from "./Screen/AlbumScreen";
import {FontAwesome, Ionicons} from "@expo/vector-icons";
import Colors from "./constant";

const Tab =  createBottomTabNavigator();
export default function App() {
  return (
      <NavigationContainer
      >
        <MyTabs />
      </NavigationContainer>
  );
}
function MyTabs(){
  return(
      <Tab.Navigator >
        <Tab.Screen
            options={{
                headerShown : false,
                tabBarLabel : "Photos",
                tabBarIconStyle:  styles.icon,
                tabBarActiveTintColor : Colors.Orange,
                tabBarIcon : ({focused}) =>( <FontAwesome name="photo" size={20}  color={Colors.Orange} />),
            }}
            name="Photos" component={PhotosScreen}
        />
        <Tab.Screen
            options={{
                headerShown : false,
                tabBarLabel : "Albums",
                tabBarIconStyle:  styles.icon,
                tabBarActiveTintColor : Colors.Orange,
                tabBarIcon : ({focused}) =>( <Ionicons name="albums" size={20} color={Colors.Orange} /> ),
            }}
            name="Albums" component={AlbumScreen} />
      </Tab.Navigator>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
    icon :{
    zIndex : 1,
    }
});
