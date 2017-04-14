import React from 'react'
import {Modal} from 'react-native'
import ModalBox from 'react-native-modalbox'
import blacklist from 'blacklist'

export default class Modalx extends React.Component {

  static propTypes = ModalBox.propTypes

  state = {
    visible: false,
  }

  open() {
    const self = this
    this.setState({visible: true},()=>{
      self.refs.modal.open()
    })
  }

  close() {
    this.refs.modal.close()
  }

  _onClased() {
    this.setState({visible:false})
    this.props.onClosed && this.props.onClosed()
  }

  render = ()=>(
    <Modal visible={this.state.visible} transparent={true}>
      <ModalBox
        ref={"modal"}
        onClosed={this._onClased.bind(this)}
        backdropOpacity={0.35}
        animationDuration={250}
        backButtonClose={true}
        {...blacklist(this.props, 'ref', 'onClosed')}>
        {this.props.children}
      </ModalBox>
    </Modal>
  )

}
