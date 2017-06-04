/**
 * 导航控制器
 */
import React, { PropTypes } from 'react'
import {
  BackHandler,
  View,
} from 'react-native'
import {Navigator as RNNavigator} from 'react-native-deprecated-custom-components'
import NavBar from './NavBar'

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#F0EFF5'
  }
}

export default class Navigator extends React.Component {

  static propTypes = {
    initialRoute: PropTypes.object.isRequired,
    tintColor: PropTypes.string,
    barTintColor: PropTypes.string,
    onBackPress: PropTypes.func,
    hideBack: PropTypes.bool,
    navigationBarHidden: PropTypes.bool,
    shadowHidden: PropTypes.bool, // not use
  }

  constructor(props) {
    super(props)
    this._onHardwareBackPress = this._onHardwareBackPress.bind(this)
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this._onHardwareBackPress)
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this._onHardwareBackPress)
  }

  _onHardwareBackPress() {
    if (this._canGoBack()) {
      this.refs.nav.pop()
      return true
    }
    return false
  }

  _canGoBack() {
    return (this.refs.nav && this.refs.nav.getCurrentRoutes().length > 1)
  }

  /**
   * 传入N个值，返回第一个!=undefined的那个值
   * @return {[Any]} 第一个!=undefined的那个值
   */
  _value() {
    for(let i = 0; i < arguments.length; i++) {
      if (arguments[i] != undefined) {
        return arguments[i]
      }
    }
    return undefined
  }

  push(args) { this.refs.nav.push(args) }
  pop() { this.refs.nav.pop() }
  popN(n) { this.refs.nav.popN(n) }
  replace(args) { this.refs.nav.replace(args) }
  resetTo(args) { this.refs.nav.resetTo(args) }

  render() {
    return (
      <RNNavigator
        ref='nav'
        initialRoute={this.props.initialRoute}
        configureScene={() => RNNavigator.SceneConfigs.FloatFromBottomAndroid}
        renderScene={(route, navigator) => {
          if (!route.component) {
            throw new Error('route.component can not be null!')
          }
          return (
            <View style={styles.container}>
              {route.navigationBarHidden?null:(
                <NavBar
                  hideBack={this._value(route.hideBack, this.props.hideBack, !this._canGoBack())}
                  barTintColor={this._value(route.barTintColor, this.props.barTintColor)}
                  tintColor={this._value(route.tintColor, this.props.tintColor)}
                  title={route.title}
                  onBackPress={this._value(route.onBackPress, this.props.onBackPress, this._onHardwareBackPress.bind(this))} />
              )}
              {React.createElement(route.component, { route, navigator, ...route.passProps })}
            </View>
          )
        }}
      />
    )
  }
}
