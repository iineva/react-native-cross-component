/**
 * 一个像素的线
 */
import React, {PropTypes} from 'react'
import {View, PixelRatio} from 'react-native'

const ONE_PIXELS = 1.0 / PixelRatio.get()
const BORDER_COLOR = '#DDD'

export default class Line extends React.Component {

  static propTypes = {
    height: PropTypes.number,
    color: PropTypes.string,
  }

  static width = ONE_PIXELS
  static color = BORDER_COLOR

  static style = {
    border: {
      borderColor: Line.color,
      borderWidth: ONE_PIXELS,
    },
    borderTop: {
      borderTopColor: Line.color,
      borderTopWidth: ONE_PIXELS,
    },
    borderBottom: {
      borderBottomColor: Line.color,
      borderBottomWidth: ONE_PIXELS,
    },
    borderLeft: {
      borderLeftColor: Line.color,
      borderLeftWidth: ONE_PIXELS,
    },
    borderRight: {
      borderRightColor: Line.color,
      borderRightWidth: ONE_PIXELS,
    },
  }

  render = ()=>(
    <View style={{
      width: ONE_PIXELS,
      height: this.props.height || 44,
      backgroundColor: this.props.color || '#DDD',
    }}/>
  )

}