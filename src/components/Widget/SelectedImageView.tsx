import React, { Component } from 'react';
import { Icon } from 'antd';
const styles = require('./styles/SelectedImageView.less')
interface IProps {
  /**
   * 布局宽
   */
  width: number;
  /**
   * 布局高
   */
  height: number;
  /**
   * 是否显示边框
   */
  border?: boolean;

  /**
   * 媒体对象
   */
  item: Models.MediaListItem;
  /**
   * 类
   */
  className?: string;
  /**
   * 是否显示删除按钮
   */
  showDelBtn?: boolean;
  /**
   * 删除回调
   */
  onDel?: (item: Models.MediaListItem) => void;
}

interface IState {

}

class SelectedImageView extends Component<IProps, IState> {


  render() {
    const { width, height, border, item, className, showDelBtn, onDel } = this.props;
    return <div className={`add-image-view ${className} ` + styles.image_view}
      style={{ border: border ? '1px solid #d9d9d9' : null }}>
      <div className={styles.image_item} style={{ width: width, height: height, overflow: 'hidden', backgroundImage: `url(${item.thumb})` }}></div>
      {showDelBtn ? <a className={styles.del_btn} onClick={() => { onDel(item) }}><Icon type="close-circle" theme='twoTone' style={{ fontSize: 15 }} /></a> : null}
    </div>;
  }
}

export default SelectedImageView;
