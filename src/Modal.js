import React from 'react'
import {Modal} from 'react-native'
import PropTypes from 'prop-types'
import ModalBox from 'react-native-modalbox'
import blacklist from 'blacklist'

export default class BEModal extends React.Component {
  static propTypes = {
    onRequestClose: PropTypes.func,
    ...ModalBox.PropTypes,
  }
  static defaultProps = {
    animationDuration: 250,
    backButtonClose: true,
    backdropOpacity: 0.3,
    position: 'bottom',
  }
  render = ()=>(
    <Modal visible={this.props.isOpen} transparent={true} onRequestClose={()=>{}}>
      <ModalBox {...blacklist(this.props, 'onRequestClose')} onClosed={this.props.onRequestClose}/>
    </Modal>
  )
}
