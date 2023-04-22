import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { NavigationProp, useNavigation } from "@react-navigation/native";
import SparePart from "model/SparePart";
import { RootStackParamList } from "../../App";
import { SafeAreaView } from "react-native-safe-area-context";
import ItemList from "./ItemList";

const SpareList = () => {
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, "SpareDetail">>();
  const [search, setSearch] = useState("");
  const [items, setItems] = useState<SparePart[]>([]);
  

  const loadData = () => {
    const path = `../../assets/spareparts.json`;
    return new Promise<SparePart[]>((resolve, reject) => {
      try {
        const json = require(path);
        resolve(json.data);
      } catch (error) {
        reject(error);
      }
    });
  };

  const handleLoadMore = async () => {
    const newData = await loadData(); 
    setItems((prevData) => [...prevData, ...newData]); 
  };

  useEffect(() => {
    setItems([]);
    filteredItem().then((data) => setItems(data));
  }, [search]);

  const filteredItem = async () => {
    const data = await loadData();
    return data
      .filter((item) => {
        const temp = search?.toLowerCase();
        const result =
          item.MATERIAL_NO?.toLowerCase().indexOf(temp) > -1 ||
          item.DESCRIPTION?.toLowerCase().indexOf(temp) > -1 ||
          item.GRUP_TIPE_MOBIL?.toLowerCase().indexOf(temp) > -1 ||
          item.TIPE_MOBIL?.toLowerCase().indexOf(temp) > -1 ||
          item.TIPE_PART?.toLowerCase().indexOf(temp) > -1 ||
          item.MATERIAL_NO?.toLowerCase().indexOf(temp) > -1;

        return result;
      })
      .slice(0, 10);
  };
  return (
    <SafeAreaView>
      <View className="bg-zinc-100 min-h-screen py-2 px-4  ">
        {/* SEARCH */}
        <View className="p-2 my-2 rounded-xl bg-white relative">
          <TextInput
            placeholder="Cari Spare Part Disini..."
            className="text-sm p-1"
            onChangeText={setSearch}
            value={search}
          ></TextInput>
          <TouchableOpacity
            onPress={() => setSearch("")}
            className="absolute top-2 right-4"
          >
            <Text className=" text-zinc-600 text-lg w-4">x</Text>
          </TouchableOpacity>
        </View>

        {items.length === 0 && (
          <View className="flex flex-col justify-center  items-center h-screen  ">
            <Text className="text-4xl font-semibold mb-48">No Data...</Text>
          </View>
        )}
        <FlatList
          onEndReachedThreshold={0.1}
          onEndReached={handleLoadMore}
          data={items}
          initialNumToRender={10}
          showsVerticalScrollIndicator={false}
          className="mt-1"
          overScrollMode={"never"}
          contentContainerStyle={{ paddingBottom: 150 }}
          renderItem={({ item, index }) => (
            <ItemList item={item} index={index} navigation={navigation} />
          )}
        ></FlatList>
      </View>
    </SafeAreaView>
  );
};


export default SpareList;
