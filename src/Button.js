import React, {PropTypes} from 'react'
import {View, TouchableOpacity, Text} from 'react-native'

const colors = {
  gray: 'gray',
  orange: '#FEBB32',
}

/**
 * 只带了按下透明效果的按钮
 */
export class None extends React.Component {

  static propTypes = {
    style: View.propTypes.style,
    onPress: PropTypes.func,
    color: PropTypes.string,
    title: PropTypes.string,
    fontSize: PropTypes.number,
    canActive: PropTypes.bool,
    disabled: PropTypes.bool,
  }

  _style = ()=>({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...this.props.style,
  })

  _textStyle = ()=>({
    textAlign: 'center',
    fontSize: this.props.fontSize || 16,
    color: this.props.color || colors.gray,
  })

  render = ()=>(
    <TouchableOpacity activeOpacity={this.props.canActive == false ? 1 : 0.6} style={this._style()} onPress={this.props.onPress} disabled={this.props.disabled}>
      {this.props.title?(
        <Text style={this._textStyle()}>{this.props.title}</Text>
      ):null}
      {this.props.children}
    </TouchableOpacity>
  )
}

/**
 * 线条按钮
 */
export class OutLine extends React.Component {

  static propTypes = {
    ...None.propTypes,
    title: PropTypes.string.isRequired,
  }

  _style = ()=>({
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    borderColor: this.props.color || colors.orange,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    ...this.props.style,
    height: ((this.props.style||{}).height||38),
    borderRadius: ((this.props.style||{}).height||38)/2,
  })

  render = ()=>(
    <None
      style={this._style()}
      title={this.props.title}
      color={this.props.color || colors.orange}
      fontSize={this.props.fontSize}
      onPress={this.props.onPress} />
  )
}


export default {
  None,
  OutLine,
}