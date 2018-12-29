import React, { Component } from "react";
import { Button, Icon, List } from "antd";
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { connect } from 'dva';
import Link from "umi/link";

interface IProps {
  goods: Models.Goods;
  loading: boolean;
  dispatch: Functions.dispatch;
}

@connect(({ goods, loading }) => {
  return {
    goods,
    loading: loading.effects['goods/list'],
  }
})
class GoodsList extends Component<IProps, {}> {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'goods/list',
      payload: {
        count: 8,
      },
    });
  }
  render() {
    const {
      goods: { list },
      loading,
    } = this.props;
    const content = (
      <div>
        <p>段落示意：蚂蚁金服务设计平台 ant.design，用最小的工作量，无缝接入蚂蚁金服生态， 提供跨越设计与开发的体验解决方案。</p>
        <Link to={'/goods/edit'}>
          <Button type='primary'><Icon type="plus-circle" /> 添加产品</Button>
        </Link>

      </div>
    )
    return (
      <PageHeaderWrapper title='产品列表' content={content}>

        <div>
          <List
            rowKey="id"
            loading={loading}
            dataSource={list}
            renderItem={item => (
              <List.Item>
                <div>123</div>
              </List.Item>
            )}
          />
        </div>
      </PageHeaderWrapper >
    )
  }
}
export default GoodsList;
