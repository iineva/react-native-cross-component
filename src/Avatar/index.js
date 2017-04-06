/**
 * 头像
 */
import React, {PropTypes} from 'react'
import {Image} from 'react-native'

const styels = {
  width: 60,
  height: 60,
  borderWidth: 2,
  borderColor: 'white',
  borderRadius: 40,
}

export default class Avatar extends React.Component {

  static propTypes = {
    source: PropTypes.oneOfType([Image.propTypes.source, PropTypes.string]),
    style: Image.propTypes.style,
    size: PropTypes.number,
  }

  render() {
    const style = {
      ...styels,
      ...this.props.style,
    }
    style.width = this.props.size || (this.props.style||{}).width || style.width
    style.height = this.props.size || (this.props.style||{}).height || style.height
    style.borderRadius = style.width / 2.0

    let {source} = this.props
    if (!source) {
      source = require("./default.jpg")
    } else if (typeof(source)==='string') {
      source = {uri:source}
    }
    return (
      <Image style={style} source={source} />
    )
  }
}