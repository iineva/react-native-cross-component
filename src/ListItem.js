/**
 * 列表上的一个项目，常用于TableView
 */
import React, {PropTypes} from 'react'
import {View, Text, TextInput} from 'react-native'
import Line from './Line'
import Button from './Button'
import Icon from 'react-native-vector-icons/MaterialIcons'

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
    paddingRight: 12,
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
  arrow: {
    fontSize: 20,
    color: '#CCC',
  },
  input: {
    flex: 1,
  },
}

export class None extends React.Component {

  static propTypes = {
    icon: PropTypes.element,
    style: View.propTypes.style,
    onPress: PropTypes.func,
    arrow: PropTypes.bool,
    title: PropTypes.string,
    detail: PropTypes.string,
    borderTop: PropTypes.bool,
    canActive: PropTypes.bool,
    borderBottom: PropTypes.bool,
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element,
    ]),
  }

  _style = ()=>({
    ...styles.main,
    ...(this.props.borderTop===true?Line.style.borderTop:{}),
    ...(this.props.borderBottom!==false?Line.style.borderBottom:{}),
    ...this.props.style,
  })

  render = ()=>(
    <Button.None style={this._style()} canActive={this.props.canActive} onPress={this.props.onPress}>
      <View style={styles.content}>
        {this.props.icon?(
          <View style={styles.icon}>
            {this.props.icon}
          </View>
        ):null}
        {this.props.title?(
          <Text style={styles.left}>{this.props.title}</Text>
        ):null}
        {this.props.children?(
          <View style={[styles.content, styles.renderContent]}>{this.props.children}</View>
        ):null}
        {this.props.detail?(
          <Text style={styles.right}>{this.props.detail}</Text>
        ):null}
      </View>
      {this.props.arrow?(
        <Icon style={styles.arrow} name='navigate-next' />
      ):null}
    </Button.None>
  )

}

export class Input extends React.Component {

  static propTypes = {
    icon: PropTypes.element,
    title: PropTypes.string,
    style: View.propTypes.style,
    borderTop: PropTypes.bool,
    borderBottom: PropTypes.bool,
    inputProps: PropTypes.shape(TextInput.propTypes),
    children: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.element),
      PropTypes.element,
    ]),
  }

  focus = () => this.refs.input.focus()

  render = ()=>(
    <None
      style={this.props.style}
      icon={this.props.icon}
      borderTop={this.props.borderTop}
      borderBottom={this.props.borderBottom}
      canActive={false}
      title={this.props.title} >
      <TextInput ref="input" style={{...styles.input, height: (this.props.style||{}).height||44}} {...this.props.inputProps} />
      {this.props.children}
    </None>
  )
}

export default {
  None,
  Input,
}
