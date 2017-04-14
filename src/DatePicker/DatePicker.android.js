import React from 'react'
import {View, DatePickerIOS, DatePickerAndroid, TimePickerAndroid} from 'react-native'

export default class DatePicker extends React.Component {

  static propTypes = {
    ...DatePickerIOS.propTypes,
    dateMode: React.PropTypes.oneOf(['calendar', 'spinner', 'default'])
  }

  state = {
    newDate: this.props.date,
  }

  _openDate() {
    const self = this
    return DatePickerAndroid.open({
      date: self.props.date,
      maxDate: self.props.maximumDate,
      minDate: self.props.minimumDate,
      mode: self.props.dateMode,
    }).then((result)=>{
      const {action, year, month, day} = result
      if (action !== DatePickerAndroid.dismissedAction) {
        const newDate = new Date(year, month, day, self.props.date.getHours(), self.props.date.getMinutes())
        self.setState({newDate})
        if (self.props.mode !== 'datetime') {
          self.props.onDateChange && self.props.onDateChange(self.state.newDate)
        }
      }
      return result
    })
  }

  _openTime() {
    const self = this
    return TimePickerAndroid.open({
      hour: self.props.date.getHours(),
      minute: self.props.date.getMinutes(),
      is24Hour: self.props.is24Hour===false ? false : true,
    }).then((result)=>{
      const {action, hour, minute} = result
      if (action !== TimePickerAndroid.dismissedAction) {
        const newDate = new Date(self.props.date.getFullYear(), self.props.date.getMonth(), self.props.date.getDate(), hour, minute)
        self.setState({newDate})
        self.props.onDateChange && self.props.onDateChange(self.state.newDate)
      }
    })
  }

  open() {
    const self = this
    switch(self.props.mode||'date') {
      case 'date': {
        self._openDate()
        break
      }
      case 'time': {
        self._openTime()
        break
      }
      case 'datetime': {
        self._openDate().then(result=>{
          if (result.action !== DatePickerAndroid.dismissedAction) {
            self._openTime()
          }
        })
        break
      }
      default: break
    }
  }

  close() {
    this.refs.modal.close()
  }

  render = ()=>(
    <View></View>
  )

}