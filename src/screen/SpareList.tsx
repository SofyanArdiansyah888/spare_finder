import React, { useCallback, useMemo, useState } from "react";
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

const spareparts: {
  data: SparePart[];
} = require("../../assets/spareparts.json");

const SpareList = () => {
  const navigation =
    useNavigation<NavigationProp<RootStackParamList, "SpareDetail">>();
  const [search, setSearch] = useState("");

  const items = useCallback(() => filteredItem(),[spareparts])

  const filteredItem = () => {
    
    return spareparts.data
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
      .slice(0, 250);
      
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
          <TouchableOpacity onPress={() => setSearch("")} className="absolute top-2 right-4">
            <Text className=" text-zinc-600 text-lg w-4">
              x
            </Text>
          </TouchableOpacity>
        </View>

        {items().length === 0 && (
          <View className="flex flex-col justify-center  items-center h-screen  ">
            <Text className="text-4xl font-semibold mb-48">No Data...</Text>
          </View>
        )}
        <FlatList
          data={items()}
          showsVerticalScrollIndicator={false}
          className="mt-1"
          overScrollMode={"never"}
          contentContainerStyle={{ paddingBottom: 150 }}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("SpareDetail", { sparepart: item })
                }
              >
                <View className="py-2 px-4 bg-white mt-2 space-y-1 rounded-lg ">
                  <View className="flex flex-row items-center justify-between">
                    <Text className="font-semibold text-lg text-black">
                      {item.MATERIAL_NO}
                    </Text>
                    <Text className="text-xs text-slate-400">
                      {item.TIPE_PART}
                    </Text>
                  </View>
                  <View className="flex flex-row items-center justify-between">
                    <Text className="text-xs ">{item.DESCRIPTION}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            );
          }}
        ></FlatList>
      </View>
    </SafeAreaView>
  );
};

export default SpareList;
