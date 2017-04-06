/**
 * 分页加载
 */

import React, {PropTypes} from "react"
import {ListView, RefreshControl, Text} from "react-native"
import blacklist from "blacklist"

const styles = {
  footer: {
    color: '#CCC',
    textAlign: 'center',
    fontSize: 12,
    padding: 12,
  },
}

const __dataSources = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})

export default class PageList extends React.Component {

  static propTypes = {
    ...blacklist( ListView.propTypes, ...Object.keys(ListView.defaultProps), "dataSource" ),
    // page=>{}
    load: PropTypes.func,
    // ()=>{}bool
    canLoadMore: PropTypes.func,
    // 刷新前先清空列表
    cleanListBeforReload: PropTypes.bool,
  }

  state = {
    list: [],
    page: 1,
    loading: false,
    canLoadMore: true,
  }

  componentDidMount() {
    this._loadMore()
  }

  _load(page) {
    const self = this
    if (this.state.loading||(!this.state.canLoadMore&&page!==1)) { return }
    this.setState({loading: true})
    this.props.load && this.props.load(page).then(list=>{
      self.setState({
        loading: false,
        page: page+1,
        list: [...(page===1?[]:self.state.list), ...(list||[])],
        canLoadMore: this.props.canLoadMore ? this.props.canLoadMore(page) : (list&&list.length>0)
      })
    }).catch(err=>{
      console.error(err)
      self.setState({loading: false})
    })
  }

  _reload() {
    if (this.props.cleanListBeforReload) {
      this.setState({list:[]})
    }
    this._load(1)
  }

  _loadMore() {
    this._load(this.state.page)
  }

  _renderFooter() {
    let text = '上拉加载'
    if (this.state.loading) {
      text = this.state.page===1 ? null : '正在加载...'
    } else if (!this.state.canLoadMore){
      text = '没有更多数据'
    }
    return (<Text style={styles.footer}>{text}</Text>)
  }

  /**
   * 更新一个row，传入一个函数作为比较器，迭代到需要更新的row时返回true
   * list.updateRow(newRow, row=>{
   *   retrun row.id !== newRow.id
   * })
   */
  updateRow(row, cb) {
    this.setState({
      list: this.state.list.map(r=>cb(r)?row:r)
    })
  }

  _dataSource() {
    return __dataSources.cloneWithRows(this.state.list)
  }

  render = ()=>(
    <ListView
      dataSource={this._dataSource()}
      removeClippedSubviews={true}
      initialListSize={20}
      refreshControl={
        <RefreshControl
          refreshing={this.state.loading}
          onRefresh={this._reload.bind(this)}
          progressBackgroundColor="#ffff00" />
      }
      renderFooter={this._renderFooter.bind(this)}
      onEndReached={this._loadMore.bind(this)}
      onEndReachedThreshold={100}
      enableEmptySections={true}
      {...blacklist(this.props, "load", "canLoadMore")}
    />
  )
}