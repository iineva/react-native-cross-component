import React from "react"
import {Image, View} from "react-native"
import blacklist from 'blacklist'

export default class PlaceholderImage extends React.Component {

  static propTypes = {
    placeholderSource: Image.propTypes.source,
    imageStyle: Image.propTypes.style,
    ...Image.propTypes,
  }

  _imageStyle = ()=>({
    position: 'absolute',
    top: 0, left: 0, right: 0, bottom: 0,
    ...this.props.imageStyle,
  })

  render = ()=>(
    <View style={this.props.style}>
      <Image source={this.props.placeholderSource} style={this._imageStyle()} />
      <Image source={this.props.source} style={this._imageStyle()} />
      {this.props.children}
    </View>
  )
}