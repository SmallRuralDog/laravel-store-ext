import React, { Component } from "react";
import { Button, Icon, Card, Table, Avatar, Tag, Row, Col, Popover } from "antd";
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { connect } from 'dva';
import Link from "umi/link";
import { ColumnProps } from "antd/lib/table";
import Ellipsis from "@/components/Ellipsis";
import ButtonGroup from "antd/lib/button/button-group";

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
  rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }),
  };
  content = (
    <div>
      <Link to={'/goods/edit'}>
        <Button type='primary'><Icon type="plus-circle" /> 添加产品</Button>
      </Link>
    </div>
  )
  ListTitle = (
    <div>
      <ButtonGroup>
        <Button>出售中</Button>
        <Button>已兽馨</Button>
        <Button>仓库中</Button>
      </ButtonGroup>
    </div>
  )


  render() {
    const {
      goods: { list },
      loading,
    } = this.props;

    return (
      <PageHeaderWrapper content={this.content}>
        <Card bordered={false} bodyStyle={{ padding: 0 }}>
          <Table
            bordered={false}
            rowKey="item_id"
            size="middle"
            columns={columns}
            dataSource={list}
            loading={loading}
            rowClassName={() => 'font-12'}
            rowSelection={this.rowSelection}
            title={() => this.ListTitle}
          />
        </Card>
      </PageHeaderWrapper >
    )
  }
}
export default GoodsList;

const columns: ColumnProps<Models.GoodsListItem>[] = [
  {
    key: 'title',
    title: '商品',
    dataIndex: 'title',
    width: '30%',
    sorter: true,
    render: (text, record, index) => {
      return <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ width: 64, flexShrink: 0 }}>
          <Avatar src={record.image_url} shape="square" size={64} />
        </div>
        <div className='ml-10'>
          <Row type='flex' justify='space-between' style={{ height: 64 }}>
            <Col style={{ height: 36, lineHeight: '18px', fontSize: '12px' }}><Ellipsis lines={2}>{record.title}</Ellipsis></Col>
            <Col style={{ display: 'flex', alignItems: 'center' }} >
              <Tag color='#4b8'>分销</Tag>
              <span style={{ color: '#f60' }}>￥ {record.price}</span>
            </Col>
          </Row>
        </div>

      </div>
    }
  },
  {
    title: '访问量',
    render: (text, item) => {
      return <div className='font-12'>
        <div>浏览量：{item.visit_count_pv}</div>
        <div>访客数：{item.visit_count_uv}</div>
      </div>
    }
  },
  {
    title: '库存',
    dataIndex: 'stock_num',
    sorter: true,
    key: 'stock_num'
  },
  {
    title: '总销量',
    sorter: true,
    dataIndex: 'sold_num',
    key: 'sold_num'
  },
  {
    title: '创建时间',
    sorter: true,
    dataIndex: 'created_time',
    key: 'created_time'
  },
  {
    title: '序号',
    dataIndex: 'is_used',
    sorter: true,
    key: 'is_used'
  },
  {
    title: '操作',
    width: '25%',
    align: 'right',
    key: 'action',
    render: (text, item, index) => {
      return <div>
        <Button size='small'>编辑</Button>
        <Button size='small'>下架</Button>
      </div>
    }
  }
]
