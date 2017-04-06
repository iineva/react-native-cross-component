import React, {PropTypes} from 'react'
import {View, PixelRatio} from 'react-native'

const onePixels = 1.0 / PixelRatio.get()

const styles = {
  line: {
    flexDirection: 'row',
    alignItems: 'center',
  }
}

export default class ItemBar extends React.Component {

  static propTypes = {
    line: PropTypes.bool,
    lineTop: PropTypes.bool,
    lineBottom: PropTypes.bool,
    lineColor: PropTypes.string,
    lineHeight: PropTypes.number,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element,
    ]),
    style: View.propTypes.style,
  }

  _style = ()=>({
    height: 50,
    flexDirection: 'row',
    borderTopColor: this.props.lineColor || '#DDD',
    borderTopWidth: this.props.lineTop ? onePixels : 0,
    borderBottomColor: this.props.lineColor || '#DDD',
    borderBottomWidth: this.props.lineBottom ? onePixels : 0,
    backgroundColor: '#FFF',
  })

  _renderLine = (i)=>(
    <View key={i+'_'} style={styles.line}>
      <View style={{
        width: 1.0 / PixelRatio.get(),
        height: this.props.lineHeight || 44,
        backgroundColor: this.props.lineColor || '#DDD',
      }}/>
    </View>
  )

  render() {
    const self = this
    const elements = []
    const children = (this.props.children instanceof Array) ? this.props.children : [this.props.children]
    children.map((row, i)=>{
      elements.push(row)
      if (self.props.line && children.length > 1 && i < children.length - 1) {
        elements.push(self._renderLine(i))
      }
    })
    return (
      <View style={{...this._style(), ...this.props.style}}>
        {elements}
      </View>
    )
  }

}