/**
 * 头像
 */
import React, {PropTypes} from 'react'
import {Image} from 'react-native'

export default class Avatar extends React.Component {

  static propTypes = {
    source: PropTypes.oneOfType([Image.propTypes.source, PropTypes.string]),
    style: Image.propTypes.style,
    size: PropTypes.number,
  }

  _width = ()=>(this.props.size || (this.props.style||{}).width || 60)
  _height = ()=>(this.props.size || (this.props.style||{}).height || 60)

  _style = ()=>({
    width: this._width(),
    height: this._height(),
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: this._width() / 2.0,
    ...this.props.style,
  })

  render() {
    let {source} = this.props
    if (!source) {
      source = require("./default.jpg")
    } else if (typeof(source)==='string') {
      source = {uri:source}
    }
    return (
      <Image style={this._style()} source={source} />
    )
  }
}