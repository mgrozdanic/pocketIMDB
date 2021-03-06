import React from "react";
import * as Icon from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import PropTypes from "prop-types";

export default class TabBarIcon extends React.Component {
  static displayName = "TabBarIcon";

  static propTypes = {
    name: PropTypes.string.isRequired,
    focused: PropTypes.bool
  };

  render() {
    return (
      <Icon.Ionicons
        name={this.props.name}
        size={26}
        style={styles.icon}
        color={"black"}
      />
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    marginBottom: -3
  }
});
