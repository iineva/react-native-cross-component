import React, {PropTypes} from 'react'
import {View, TouchableOpacity, Text} from 'react-native'
import blacklist from 'blacklist'

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
    tapable: PropTypes.bool,
    disabled: PropTypes.bool,
  }

  _style = ()=>([{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }, ...(typeof((this.props.style||{}).map)==='function' ? this.props.style : [this.props.style])])

  _textStyle = ()=>({
    textAlign: 'center',
    fontSize: this.props.fontSize || 16,
    color: this.props.color || colors.gray,
  })

  render = ()=>(
    <TouchableOpacity activeOpacity={this.props.tapable == false ? 1 : 0.6} style={this._style()} onPress={this.props.onPress} disabled={this.props.disabled}>
      {this.props.title?(
        <Text style={this._textStyle()}>{this.props.title}</Text>
      ):null}
      {this.props.children}
    </TouchableOpacity>
  )
}

/**
 * 填充底色按钮
 */
export class Fill extends React.Component {

  static propTypes = {
    ...None.propTypes,
    title: PropTypes.string.isRequired,
    titleColor: PropTypes.string,
  }

  static defaultProps = {
    style: {},
  }

  _style = ()=>({
    backgroundColor: this.props.color || colors.orange,
    flexDirection: 'row',
    alignItems: 'center',
    ...(this.props.style.padding?{}:{
      paddingLeft: 16,
      paddingRight: 16,
      paddingTop: 8,
      paddingBottom: 8,
    }),
    ...this.props.style,
  })

  render = ()=>(
    <None style={this._style()} {...blacklist(this.props, 'style', 'color')} color={this.props.titleColor||'#FFF'} />
  )
}

/**
 * 线条按钮
 */
export class OutLine extends React.Component {

  static propTypes = {
    ...Fill.propTypes,
  }

  static defaultProps = {
    style: {},
  }

  _style = ()=>({
    backgroundColor: '#0000',
    borderWidth: 1,
    borderColor: this.props.color || colors.orange,
    borderRadius: (this.props.style.height||38)/2,
    height: (this.props.style.height||38),
  })

  render = ()=>(
    <Fill
      style={{...this._style(), ...this.props.style}}
      color={this.props.color || colors.orange}
      titleColor={this.props.color || colors.orange}
      {...blacklist(this.props, 'style', 'color')} />
  )
}


export default {
  None,
  Fill,
  OutLine,
}