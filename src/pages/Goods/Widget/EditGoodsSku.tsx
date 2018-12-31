import React, { Component } from 'react';
import { Button, Card, Checkbox, Icon, Tooltip } from 'antd';
import * as _ from 'lodash';

const styles = require('./styles.less');

class EditGoodsSku extends Component<IProps, IState> {
  state = {
    sku_group: [],
  } as IState;

  addGroupItem = () => {
    const selfSkuGroup = _.clone(this.state.sku_group);
    selfSkuGroup.push(_.clone(GroupItem));
    this.setState({
      sku_group: selfSkuGroup,
    });
  };


  render() {
    const { sku_group } = this.state;
    const SkuListEdit = () => {
      return <div>
        {sku_group.map((item, index) => {
          return <div key={index}>
            <div className={styles.sku_group_title}>
              <span>规格名：</span>
              {index === 0 ? <div className={'f-c-c'}><Checkbox>添加规格图片</Checkbox><Tooltip title={Text.add_image}><Icon theme='twoTone' type="info-circle" /></Tooltip></div> : null}
            </div>
            <div className={styles.sku_group_container}>
              <span>规格值：</span>
            </div>
          </div>;
        })}
      </div>;
    };
    return <Card bodyStyle={{ padding: 0 }}>
      <SkuListEdit />
      <div className={styles.sku_group_title}>
        <Button type='primary' onClick={this.addGroupItem}>添加商品规格</Button>
      </div>
    </Card>;
  }
}


interface IProps {

}

interface IState {
  sku_group: IGroupItem[]
}

interface ISkuItem {
  id: number;
  name: string;
  image: string;
}

interface IGroupItem {
  id: number;
  name: string;
  is_image: boolean;
  sku_list: ISkuItem[]
}

const SkuItem: ISkuItem = {
  id: null,
  name: '',
  image: '',
};
const GroupItem: IGroupItem = {
  id: null,
  name: '',
  is_image: false,
  sku_list: [_.clone(SkuItem)],
};
const Text = {
  add_image:'仅支持为第一组规格设置规格图片（最多40张图），买家选择不同规格会看到对应规格图片，建议尺寸：800 x 800像素'
}
export default EditGoodsSku;
