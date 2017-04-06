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

  static style = {
    border: {
      borderColor: BORDER_COLOR,
      borderWidth: ONE_PIXELS,
    },
    borderTop: {
      borderTopColor: BORDER_COLOR,
      borderTopWidth: ONE_PIXELS,
    },
    borderBottom: {
      borderBottomColor: BORDER_COLOR,
      borderBottomWidth: ONE_PIXELS,
    },
    borderLeft: {
      borderLeftColor: BORDER_COLOR,
      borderLeftWidth: ONE_PIXELS,
    },
    borderRight: {
      borderRightColor: BORDER_COLOR,
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