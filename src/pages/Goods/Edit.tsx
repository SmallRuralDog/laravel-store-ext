import React from "react";
import { connect } from 'dva';
import PageHeaderWrapper from '@/components/PageHeaderWrapper'
import FooterToolbar from '@/components/FooterToolbar'
import { Card, Button, Steps, Icon, Affix, Form, Input } from "antd";
import ShareDescExtra from './Widget/ShareDescExtra'
import EditGoodsImageList from './Widget/EditGoodsImageList'
import MediaDialog from '@/components/MediaDialog'
const styles = require('./Edit.less')
interface IProps {

}
interface IState {

}
@connect(({ media }) => {
  return {

  }
})
class GoodsEdit extends React.Component<IProps, IState> {
  componentDidMount() {

  }
  render() {
    const formItemLayout = {
      labelCol: { span: 2 },
      wrapperCol: { span: 22 },
    };

    const FormTitle = ({ title }) => {
      return <div className={styles.formTitle}>{title}</div>
    };

    return (
      <PageHeaderWrapper>
        <Card bodyStyle={{ padding: 20 }}>
          <div style={{ padding: '8px 10px', background: '#f5f7fa' }}>
            <Steps size='small'>
              <Steps.Step title="编辑基本信息" icon={<Icon type="form" />} />
              <Steps.Step title="编辑商品详情" icon={<Icon type="profile" />} />
              <Steps.Step title="完成" icon={<Icon type="check-circle" />} />
            </Steps>
          </div>

          <Form >
            <Affix>
              <FormTitle title='基本信息' />
            </Affix>
            <Form.Item {...formItemLayout} label='商品名' required extra={'商品标题长度至少3个字，最长50个汉字'}>
              <Input style={{ maxWidth: 500 }} />
            </Form.Item>
            <Form.Item {...formItemLayout} label='分享描述' extra={<ShareDescExtra />}>
              <Input style={{ maxWidth: 500 }} />
            </Form.Item>
            <Form.Item {...formItemLayout} label='商品图' required extra={'建议尺寸：800*800像素，你可以拖拽图片调整顺序，最多上传15张'}>
              <EditGoodsImageList {...this.props} />
            </Form.Item>
          </Form>
          <Affix>
            <FormTitle title='价格库存' />
          </Affix>

        </Card>
        <FooterToolbar extra="extra information">
          <Button >保存并查看</Button>
          <Button type='primary'>下一步</Button>
        </FooterToolbar>
        <MediaDialog />
      </PageHeaderWrapper>
    )
  }
}
export default GoodsEdit;

