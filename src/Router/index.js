/**
 * 路由器，实现通过URI索引Component
 */
import React, {PropTypes} from 'react'
import {Image} from 'react-native'
import Navigator from '../Navigator'
import URL from 'url-parse'
import blacklist from 'blacklist'

export default class Router extends React.Component {

  static propTypes = {
    initialRoute: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    route: PropTypes.object.isRequired,
    barTintColor: PropTypes.string,
    tintColor: PropTypes.string,
    leftButtonIcon: Image.propTypes.source,
  }

  static defaultProps = {
    barTintColor: '#2F343B',
    tintColor: '#FFF',
  }

  /**
   * 通过Path获取Component
   */
  _getComponent(path) {
    if (!path) { throw new Error('Path can not be null') }
    for (const key in this.props.route) {
      if (key===path) { return this.props.route[key] }
    }
    throw new Error('Can not find route : ' + path)
  }

  /**
   * 生成navigator使用的route
   */
  _getRoute(uri, option) {
    /**
     * 兼容纯对象参数传入
     */
    if (typeof(uri)==='object') {
      option = blacklist(uri, 'uri')
      uri = uri.uri
    }

    /**
     * 解析URI
     */
    let component = null
    if (typeof(uri)==='string') {
      uri = new URL(uri, true)
      component = this._getComponent(uri.pathname)
    } else {
      component = uri
      uri = {}
    }

    /**
     * 不带navigationOptions的路由
     */
    const route = {
      component,
      ...(this.props.leftButtonIcon?{
        leftButtonIcon: this.props.leftButtonIcon,
        onLeftButtonPress: ()=>this.pop(),
      }:null),
      ...blacklist(option, 'passProps'),
      passProps: {
        ...(option||{}).passProps,
        ...uri.query,
        navigator: this
      },
    }

    const navigationOptions = {}
    for (const k in component.navigationOptions) {
      navigationOptions[k] = this._valueOrFunc(route, this, component.navigationOptions[k])
    }

    return {
      ...route,
      ...navigationOptions,
    }
  }

  /**
   * 生成路由参数
   */
  _valueOrFunc(route, navigator, value) {
    if (!value) { return undefined }
    if (typeof(value)==='function') { return value(route, navigator) }
    return value
  }

  /**
   * Router.push('/home')
   * Router.push('/home?title=Home')
   * Router.push('/home', {title: 'Home'})
   * Router.push(Home, {title: 'Home'})
   * @param  {[type]} route     可以是uri链接，也可以是组建
   * @param  {[type]} option    [description]
   * @return {[type]}           [description]
   */
  _routeMethod = (method)=>(uri, option)=>{ this.refs.nav && this.refs.nav[method](this._getRoute(uri, option)) }
  push = this._routeMethod('push')
  pop() { this.refs.nav && this.refs.nav.pop() }
  popN(n) { this.refs.nav && this.refs.nav.popN(n) }
  replace = this._routeMethod('replace')
  resetTo = this._routeMethod('resetTo')

  _getInitialRoute() {
    return this._getRoute(this.props.initialRoute||Object.keys(this.props.route)[0])
  }

  render = ()=>(
    <Navigator
      ref='nav'
      initialRoute={this._getInitialRoute()}
      shadowHidden={this.props.shadowHidden}
      barTintColor={this.props.barTintColor}
      tintColor={this.props.tintColor} />
  )
}
