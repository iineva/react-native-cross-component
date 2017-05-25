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
    imageStyle: Image.propTypes.style,
    placeholderSource: Image.propTypes.source,
  }

  _width = ()=>(this.props.size || (this.props.style||{}).width || 60)
  _height = ()=>(this.props.size || (this.props.style||{}).height || 60)

  _style = ()=>([{
    ...this._imageStyle(),
  }, ...(typeof((this.props.style||{}).map)==='function' ? this.props.style : [this.props.style||{}])])

  _imageStyle = ()=>({
    width: this._width(),
    height: this._height(),
    overflow: 'hidden',
    borderRadius: this._width() / 2.0,
  })

  render = ()=>(
    <PlaceholderImage
      style={this._style()}
      imageStyle={this._imageStyle()}
      placeholderSource={ Object.keys(this.props).indexOf('placeholderSource')!==-1 ? this.props.placeholderSource : placeholderIcon}
      source={typeof(this.props.source)==='string' ? {uri:this.props.source} : this.props.source}
    />
  )
}