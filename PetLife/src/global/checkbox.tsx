import React, { useState } from "react";
import { CheckBox } from "react-native-elements";
//import { View, Text, StyleSheet } from "react-native";
import { styles } from "../../styles";
import { themas } from "./themes";

export interface CheckBoxCustom {
    title: string;
    checked: boolean;
    onPress: () => void;
}

const CustomCheckbox: React.FC<CheckBoxCustom> = ({ title, checked, onPress}) => {
   return (
    <CheckBox
    title={title}
    checked={checked}
    onPress={onPress}
    containerStyle={styles.container}
    textStyle={styles.orText}
    checkedColor ={themas.colors.white}
    />
   );
};