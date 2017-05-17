/**
 * 导航控制器
 */
import React, { PropTypes } from 'react'
import {NavigatorIOS} from 'react-native'

const styles = {
  container: {
    flex: 1,
    backgroundColor: "#F0EFF5"
  }
}

export default class Navigator extends React.Component {

  static propTypes = {
    initialRoute: PropTypes.object.isRequired,
    tintColor: PropTypes.string,
    barTintColor: PropTypes.string,
    // onBackPress: PropTypes.func,
    // hideBack: PropTypes.bool,
    navigationBarHidden: PropTypes.bool,
    shadowHidden: PropTypes.bool,
  }

  push(args) { this.refs.nav.push(args) }
  pop() { this.refs.nav.pop() }
  popN(n) { this.refs.nav.popN(n) }
  replace(args) { this.refs.nav.replace(args) }

  render() {
    return (
      <NavigatorIOS
        ref='nav'
        initialRoute={this.props.initialRoute}
        style={styles.container}
        itemWrapperStyle={styles.container}
        barTintColor={this.props.barTintColor}
        tintColor={this.props.tintColor}
        titleTextColor={this.props.tintColor}
        interactivePopGestureEnabled={true}
        navigationBarHidden={this.props.navigationBarHidden}
        shadowHidden={this.props.shadowHidden}
        translucent={false}
      />
    )
  }
}
