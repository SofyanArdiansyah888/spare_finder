import {RouteProp} from "@react-navigation/native";
import React from "react";
import {ScrollView, Text, View} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import {RootStackParamList} from "../../App";
import {formatRupiah} from "../utils/formatter";

type SpareDetailRouteProp = RouteProp<RootStackParamList, "SpareDetail">;

type Props = {
    route: SpareDetailRouteProp;
};

interface IItems {
    title: string;
    description: string;
}

const SpareDetail = ({route}: Props) => {
    const {
        params: {sparepart},
    } = route;

    return (
        <SafeAreaView>
            <View className=" px-4 relative bg-zinc-100 ">
                <ScrollView
                    className="my-4 px-4  rounded-2xl bg-white"
                    overScrollMode="never"
                    showsVerticalScrollIndicator={false}
                >
                    <View className="w-full space-y-4  rounded-xl min-h-[80vh] py-8">
                        <Text className="text-2xl font-semibold">Detail Spare Part</Text>

                        <View>
                            <Item
                                title="Material Number"
                                description={sparepart.MATERIAL_NO}
                            ></Item>
                            <Item
                                title="Deskripsi"
                                description={sparepart.DESCRIPTION}
                            ></Item>
                            <Item title="M Group" description={sparepart.M_GROUP}></Item>
                            <Item
                                title="Prod Hierarcy"
                                description={sparepart.PROD_HIERARCHY}
                            ></Item>
                            <Item title="Tipe Part" description={sparepart.TIPE_PART}></Item>
                            <Item
                                title="Tipe Mobile"
                                description={sparepart.KODE_MOBIL}
                            />
                            <Item
                                title="Tipe Mobile"
                                description={sparepart.TIPE_MOBIL}
                            />
                            <Item
                                title="Grup Tipe Mobil"
                                description={sparepart.GRUP_TIPE_MOBIL}
                            ></Item>
                            <Item
                                title="Run In/Out"
                                description={sparepart.RUN_IN_RUN_OUT}
                            ></Item>
                            <Item
                                title="OLI/ACC/PART"
                                description={sparepart.OLI_ACC_PART}
                            ></Item>
                            <Item title="Q PACK" description={sparepart.Q_PACK}></Item>
                            <Item title="Load GRP" description={sparepart.LOAD_GRP}></Item>
                            <Item
                                title="Retail Before PPN"
                                description={formatRupiah(Math.ceil(sparepart.RETAIL_BEFORE_PPN))}
                            ></Item>
                            <Item
                                title="Retail After PPN"
                                description={formatRupiah(Math.ceil(sparepart.RETAIL_AFTER_PPN))}
                            ></Item>
                            <Item title="PR GRP" description={sparepart.PR_GRP}></Item>
                            <Item
                                title="Valid From"
                                description={sparepart.VALID_FROM}
                            ></Item>
                            <Item title="Valid To" description={sparepart.VALID_TO}></Item>
                            <Item title="Check" description={sparepart.CHECK}></Item>
                            <Item title="Retail Price Before" description={sparepart.RETAIL_PRICE_BEFORE}></Item>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const Item = ({title, description}: IItems) => {
    return (
        <View className="p-2 border-b-[1px] border-slate-300 space-y-1">
            <Text className="text-md font-semibold capitalize">{title}</Text>
            <Text>{description}</Text>
        </View>
    );
};

export default SpareDetail;
