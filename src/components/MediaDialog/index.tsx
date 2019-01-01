import React, { Component } from 'react';
import { Button, Card, Col, Icon, List, Modal, Pagination, Row, Upload } from 'antd';
import { connect } from 'dva';
import * as _ from 'lodash';

const styles = require('./styles.less');

interface IProps {
  media?: Models.Media;
  loading?: boolean;
  dispatch?: Functions.dispatch;
}

interface IState {
  selectedInit: boolean;
  selected: Models.MediaListItem[]
}

@connect(({ media, loading }) => {
  return {
    media,
    loading: loading.effects['media/list'],
  };
})
class MediaDialog extends Component<IProps, IState> {
  state = {
    selected: [],
  } as IState;

  /*static getDerivedStateFromProps(props: IProps, state: IState) {
    const { media } = props
    if (media.selected.length > 0 && !state.selectedInit) {
      console.log('xxxx');

      return {
        'selectedInit': true,
        'selected': media.selected
      }
    }
    return null
  }*/


  onHide = () => {
    this.props.dispatch({
      type: 'media/hide',
    });
    this.setState({
      'selected': [],
      'selectedInit': false
    });
  };

  onOk = () => {
    this.props.media.callBack(this.state.selected);
    this.onHide()
  };


  onItemClick = (item: Models.MediaListItem) => {


    let selected: Models.MediaListItem[] = _.clone(this.state.selected);
    const { media: { max } } = this.props

    const CheckItem = _.filter(selected, (s) => {
      return s.id === item.id
    })
    if (max == 1) {
      if (CheckItem.length > 0) {
        _.pullAll(selected, CheckItem);
      } else {
        selected = [item];
      }
    } else if (max > 1) {
      if (CheckItem.length > 0) {
        _.pullAll(selected, CheckItem);
      } else {
        selected.push(item);
      }
    }
    if (selected.length > max) {
      return;
    }
    this.setState({
      'selected': selected,
    });
  };


  render() {
    const { media: { visible, list, max }, loading } = this.props;

    const Title = () => (<Row type={'flex'} justify={'space-between'} align={'middle'}>
      <Col><span>已选择：{this.state.selected.length} 最多可选择：{max}</span></Col>
      <Col>
        <Upload showUploadList={false}><Button type='primary'>上传图片</Button></Upload>
      </Col>
    </Row>);

    const Check = ({ item }) => {
      const { media: { max } } = this.props
      const index = _.indexOf(this.state.selected, item);
      return index > -1 ? <a
        className={styles.attachment_selected}
        onClick={() => {
          this.onItemClick(item);
        }}>
        {max > 1 ?
          <i className={styles.selected_index}>{index + 1}</i> :
          <span className={styles.selected_index}><Icon type="check" style={{ color: '#fff' }} /></span>

        }
      </a> : null;
    };

    const Item = ({ item }) => {
      return (<Card className={styles.media_item}
        bodyStyle={{ padding: 0 }}
        cover={<a onClick={() => {
          this.onItemClick(item);
        }}>
          <div className={styles.image_item} style={{ width: '100%', height: 182.12, overflow: 'hidden', backgroundImage: `url(${item.thumb})` }}></div>
        </a>}
        actions={[
          <Icon key={'setting'} type={'setting'} />,
          <Icon key={'del'} type={'close-circle'} />,
          <Icon key={'info'} type={'info-circle'} />,
        ]}

      >
        <Check item={item} />
      </Card>);
    };

    return <Modal
      title={<Title />}
      visible={visible}
      width={1200}
      closable={false}
      centered={true}
      maskClosable={false}
      wrapClassName={'media-dialog'}
      bodyStyle={{ padding: 10 }}
      onCancel={this.onHide}
      onOk={this.onOk}
    >
      <div className={styles.media_list}>
        <List
          loading={loading}
          grid={{ gutter: 10, column: 6 }}
          dataSource={list}
          renderItem={(item: Models.MediaListItem) => {
            return <List.Item>
              <Item item={item} />
            </List.Item>;
          }}
        />
        <div className={styles.page_view}><Pagination /></div>
      </div>
    </Modal>;
  }
}

export default MediaDialog;


