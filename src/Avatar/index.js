/**
 * 头像
 */
import React from 'react'
import PropTypes from 'prop-types'
import {Image} from 'react-native'
import PlaceholderImage from '../PlaceholderImage'
import placeholderIcon from './default.jpg'

export default class Avatar extends React.Component {

  static propTypes = {
    source: PropTypes.oneOfType([Image.propTypes.source, PropTypes.string]),
    style: Image.propTypes.style,
    size: PropTypes.number,
    placeholderSource: Image.propTypes.source,
    placeholderStyle: PropTypes.object,
  }

  _width = ()=>(this.props.size || (this.props.style||{}).width || 60)
  _height = ()=>(this.props.size || (this.props.style||{}).height || 60)

  _style = ()=>([{
    width: this._width(),
    height: this._height(),
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: this._width() / 2.0,
  }, ...(typeof((this.props.style||{}).map)==='function' ? this.props.style : [this.props.style])])

  render = ()=>(
    <PlaceholderImage
      style={this._style()}
      placeholderStyle={{
        width: this._width(),
        height: this._height(),
        ...this.props.placeholderStyle,
      }}
      placeholderSource={ Object.keys(this.props).indexOf('placeholderSource')!==-1 ? this.props.placeholderSource : placeholderIcon}
      source={typeof(this.props.source)==='string' ? {uri:this.props.source} : this.props.source}
    />
  )
}