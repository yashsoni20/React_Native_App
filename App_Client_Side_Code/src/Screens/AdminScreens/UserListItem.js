//import liraries
import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useContext, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  FlatList,
} from "react-native";

const {width} = Dimensions.get("window");

const UserListItem = (props) => {
    return(
        <View>
            <TouchableOpacity>
                <Image 
                    source={{
                        uri: props.image? props.image : "https://yt3.ggpht.com/HFXUWpHPyzBo1OjPx17nzQc8odJxUo1pz98sFy0_lGRdQCeIXP0On3R4E7c2iAQYuK-yGHUwNw=s48-c-k-c0x00ffffff-no-rj"
                    }}
                />
                <Text>{props.email}</Text>
                <Text numberOfLines={1} ellipsizeMode="tail">{props.name}</Text>
                {/* <Text numberOfLines={1} ellipsizeMode="tail">{props.isAdmin}</Text> */}
            </TouchableOpacity>
        </View>
    )
}
export default UserListItem;