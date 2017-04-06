/**
 * 所有页面的容器
 */

import React from "react"
import {View, StatusBar, Platform} from "react-native"

const styles = {
  main: {
    flex: 1,
    marginBottom: 64,
  }
}

export default class Container extends React.Component {

  static propsType = {
    ...View.propsType,
  }

  _style(navigationBarHidden) {
    return {
      ...this.props.style, ...styles.main,
      marginBottom: Platform.select({
        ios: navigationBarHidden ? 0 : 64,
        android: 0,
      })
    }
  }

  render() {
    const parent = this._reactInternalInstance._currentElement._owner._instance
    return (
      <View {...this.props} style={this._style(parent.props.route.navigationBarHidden)}>
        <StatusBar barStyle={'light-content'} />
        {this.props.children}
      </View>
    )
  }

}
