import React from 'react'
import {View, DatePickerIOS} from 'react-native'
import blacklist from 'blacklist'

import Button from '../Button'
import Line from '../Line'
import Modal from '../Modal'

export default class DatePicker extends React.Component {

  static propTypes = {
    ...DatePickerIOS.propTypes,
  }

  state = {
    newDate: null
  }

  open() {
    this.refs.modal.open()
  }

  close() {
    this.refs.modal.close()
  }

  _onDateChange(newDate) {
    this.setState({newDate})
  }

  _onOkPerss() {
    this.close()
    this.props.onDateChange && this.props.onDateChange(this.state.newDate||this.props.date)
  }

  _styleMain = {
    height: 260,
  }

  _styleTop = {
    height: 44,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...Line.style.borderTop,
  }

  _styleButton = {
    padding: 12,
  }

  render = ()=>(
    <Modal ref="modal" style={this._styleMain} position="bottom">
      <View style={this._styleTop}>
        <Button.None style={this._styleButton} title="取消" color="#ef71a1" onPress={()=>this.close()}/>
        <Button.None style={this._styleButton} title="确认" color="#ef71a1" onPress={this._onOkPerss.bind(this)}/>
      </View>
      <DatePickerIOS
        date={this.state.newDate||this.props.date}
        onDateChange={this._onDateChange.bind(this)}
        {...blacklist(this.props, 'ref', 'onDateChange', 'date')}
      />
    </Modal>
  )

}