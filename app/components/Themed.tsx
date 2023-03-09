/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import * as React from "react";
import { Text as DefaultText, View as DefaultView } from "react-native";
import Colors from "../constants/Colors";

export type TextProps = DefaultText["props"];
export type ViewProps = DefaultView["props"];

export function Text(props: TextProps) {
  const { style, ...otherProps } = props;
  const color = Colors.text;

  return (
    <DefaultText
      testID="themed-text"
      style={[{ color }, style]}
      {...otherProps}
    />
  );
}

export function View(props: ViewProps) {
  const { style, ...otherProps } = props;
  const backgroundColor = Colors.background;

  return (
    <DefaultView
      testID="themed-view"
      style={[{ backgroundColor }, style]}
      {...otherProps}
    />
  );
}
