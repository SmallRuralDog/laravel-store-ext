import React, { Component } from 'react';

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

  item: Models.MediaListItem;

}

interface IState {

}

class SelectedImageView extends Component<IProps, IState> {


  render() {
    const { width, height, border, item } = this.props;
    return <li className='add-image-view'
                style={{ width: width + 'px', height: height + 'px', border: border ? '1px solid #f8f8f8' : null }}>
      <img src={item.thumb} style={{width:'100%'}} />
    </li>;
  }
}

export default SelectedImageView;
