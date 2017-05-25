import React from "react"
import {Image} from "react-native"
import blacklist from 'blacklist'

export default class PlaceholderImage extends React.Component {
  static propTypes = {
    placeholderSource: Image.propTypes.source,
    ...Image.propTypes,
  }
  render = ()=>(
    <Image source={this.props.placeholderSource} {...blacklist(this.props, 'placeholderSource', 'source', 'children')}>
      <Image source={this.props.source} style={this.props.placeholderStyle} {...blacklist(this.props, 'placeholderSource', 'source', 'style', 'placeholderStyle')} />
    </Image>
  )
}