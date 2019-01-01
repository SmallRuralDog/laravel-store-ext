import React, { Component } from 'react';
import { Button, Card } from 'antd';
import * as _ from 'lodash';
import SkuListEdit from './SkuListEdit';

const styles = require('./styles.less');

class EditGoodsSku extends Component<IProps, IState> {
  state = {
    sku_group: [],
  } as IState;

  addGroupItem = () => {
    const selfSkuGroup = _.cloneDeep(this.state.sku_group);
    selfSkuGroup.push(_.cloneDeep(GroupItem));
    this.changeSkuGroup(selfSkuGroup);
  };


  changeSkuGroup = (data) => {
    this.setState({
      sku_group: data
    })
  }



  render() {
    const { sku_group } = this.state;
    const { goods, maxGroup } = this.props

    return <Card bodyStyle={{ padding: 0 }}>
      <SkuListEdit
        {...this.props}
        sku_group={sku_group}
        goods={goods}
        SkuItem={SkuItem}
        changeSkuGroup={this.changeSkuGroup}
      />
      <div className={styles.sku_group_title}>
        <Button disabled={sku_group.length >= maxGroup} type='primary' onClick={this.addGroupItem}>添加商品规格</Button>
        {sku_group.length > 0 ? <a className='ml-10'>自定义排序</a> : null}
      </div>
    </Card>;
  }
}


interface IProps {
  goods: Models.Goods;
  /**
   * 最大规格数
   */
  maxGroup: number;
}

interface IState {
  sku_group: Models.IGroupItem[]
}



const SkuItem: Models.ISkuItem = {
  id: null,
  name: '',
  image: null,
  defaultOpen: true
};
const GroupItem: Models.IGroupItem = {
  id: null,
  name: '',
  is_image: false,
  defaultOpen: true,
  sku_list: [_.clone(SkuItem)],
};
const Text = {
  add_image: '仅支持为第一组规格设置规格图片，买家选择不同规格会看到对应规格图片，建议尺寸：800 x 800像素'
}
export default EditGoodsSku;
