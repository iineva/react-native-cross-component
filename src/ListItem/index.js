/**
 * 列表上的一个项目，常用于TableView
 */
import React, {PropTypes} from 'react'
import {View, Text, TextInput, Image} from 'react-native'
import Line from '../Line'
import Button from '../Button'
import blacklist from 'blacklist'
import arrowIcon from './img/arrow.png'

const styles = {
  main: {
    height: 44,
    backgroundColor: '#FFF',
    paddingLeft: 12,
    paddingRight: 12,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  renderContent: {
    paddingLeft: 10,
  },
  icon: {
    marginRight: 12,
  },
  left: {
    fontSize: 16,
  },
  right: {
    flex: 1,
    fontSize: 16,
    color: '#AAA',
    textAlign: 'right',
  },
  arrow: {},
  input: {
    flex: 1,
  },
}

export class None extends React.Component {

  static propTypes = {
    icon: PropTypes.element,
    iconStyle: PropTypes.object,
    style: View.propTypes.style,
    onPress: PropTypes.func,
    arrow: PropTypes.bool,
    title: PropTypes.string,
    titleStyle: PropTypes.object,
    detail: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.element,
    ]),
    detailStyle: PropTypes.object,
    borderTop: PropTypes.bool,
    tapable: PropTypes.bool, // 是否可点击
    borderBottom: PropTypes.bool,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element,
    ]),
  }

  static defaultProps = {
    tapable: false
  }

  _style = ()=>({
    ...styles.main,
    ...(this.props.borderTop===true?Line.style.borderTop:{}),
    ...(this.props.borderBottom!==false?Line.style.borderBottom:{}),
    ...this.props.style,
  })

  render = ()=>(
    <Button.None style={this._style()} tapable={this.props.tapable} onPress={this.props.onPress}>
      <View style={styles.content}>
        {this.props.icon?(
          <View style={{...styles.icon, ...this.props.iconStyle}}>
            {this.props.icon}
          </View>
        ):null}
        {this.props.title?(
          <Text style={{...styles.left, ...this.props.titleStyle}}>{this.props.title}</Text>
        ):null}
        {this.props.children?(
          <View style={[styles.content, styles.renderContent]}>{this.props.children}</View>
        ):null}
        {typeof(this.props.detail)==='string'?(
          <Text style={{...styles.right, ...this.props.detailStyle}}>{this.props.detail}</Text>
        ):this.props.detail}
      </View>
      {this.props.arrow?(
        <Image style={styles.arrow} source={arrowIcon} />
      ):null}
    </Button.None>
  )

}

export class Input extends React.Component {

  static propTypes = {
    ...None.propTypes,
    inputProps: PropTypes.shape(TextInput.propTypes),
  }

  static defaultProps = {
    tapable: false
  }

  focus = () => this.refs.input.focus()

  render = ()=>(
    <Input.component {...blacklist(this.props, 'children')}>
      <TextInput ref="input" style={{...styles.input, height: (this.props.style||{}).height||44}} {...this.props.inputProps} />
      {this.props.children}
    </Input.component>
  )
}

export default {
  None,
  Input,
}
