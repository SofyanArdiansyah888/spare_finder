import React, { Component } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import SparePart from "model/SparePart";

interface Props {
  item: SparePart;
  index: number;
  navigation: NavigationProp<RootStackParamList, "SpareDetail">;
}


class ItemList extends React.PureComponent<Props> {
  render() {
    const { item, index, navigation } = this.props;
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate("SpareDetail", { sparepart: item })}
      >
        <View className="py-2 px-4 bg-white mt-2 space-y-1 rounded-lg ">
          <View className="flex flex-row items-center justify-between">
            <Text className="font-semibold text-lg text-black">
              {item.MATERIAL_NO}
            </Text>
            <Text className="text-xs text-slate-400">{item.TIPE_MOBIL}</Text>
          </View>
          <View className="flex flex-row items-center justify-between">
            <Text className="text-xs ">{item.DESCRIPTION}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default ItemList;