import React, { PropTypes } from 'react'
import {
  TouchableOpacity,
  PixelRatio,
  View,
  Text,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

const STATUS_BAR_HEIGHT = 0
const NAV_BAR_HEIGHT = 44

const styles = {
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  leftContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  }
}

export default class NavBar extends React.Component {

  static propTypes = {
    tintColor: PropTypes.string,
    statusBarColor: PropTypes.string,
    barTintColor: PropTypes.string,
    onBackPress: PropTypes.func,
    hideBack: PropTypes.bool,
    title: PropTypes.string,
    right: React.PropTypes.oneOfType([PropTypes.element, PropTypes.func]),
  }

  _itemStyle() {
    return {
      color: this.props.tintColor,
      padding: 12,
      fontSize: 16,
      fontWeight: '400',
    }
  }

  _lineStyle() {
    return {
      width: 1 / PixelRatio.get(),
      height: 26,
      backgroundColor: '#0006',
    }
  }

  render() {
    const itemStyle = this._itemStyle()
    const lineStyle = this._lineStyle()
    return (
      <View style={{
        paddingTop: STATUS_BAR_HEIGHT,
        height: NAV_BAR_HEIGHT + STATUS_BAR_HEIGHT,
        backgroundColor: this.props.statusBarColor||'black'}}>
        <View style={[styles.container, {
          backgroundColor: this.props.barTintColor || '#22272B',
        }]}>
          {/* left */}
          <View style={styles.leftContainer}>
            {this.props.hideBack?null:(
              <View style={styles.backContainer}>
                <TouchableOpacity onPress={this.props.onBackPress}>
                  <Icon style={[itemStyle, {fontSize: itemStyle.fontSize*1.3}]} name="arrow-back" />
                </TouchableOpacity>
              </View>
            )}
            {!this.props.title?null:(
              <Text style={itemStyle}>{this.props.title}</Text>
            )}
          </View>
          {/* right */}
          <View>
            {this.props.right}
          </View>
        </View>
      </View>
    )
  }
}