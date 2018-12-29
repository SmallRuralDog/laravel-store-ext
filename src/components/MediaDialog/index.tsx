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

  onHide = () => {
    this.setState({
      'selected': [],
    });
    this.props.dispatch({
      type: 'media/hide',
    });

  };

  onOk = () => {
    this.props.media.callBack(this.state.selected);
    this.onHide()
  };


  onItemClick = (item: Models.MediaListItem) => {
    const selected = _.clone(this.state.selected);
    if (_.indexOf(selected, item) >= 0) {
      _.pull(selected, item);
    } else {
      selected.push(item);
    }
    this.setState({
      'selected': selected,
    });
  };


  render() {
    const { media: { visible, list }, loading } = this.props;

    const Title = () => (<Row type={'flex'} justify={'space-between'} align={'middle'}>
      <Col><span>已选择：{this.state.selected.length}</span></Col>
      <Col>
        <Upload showUploadList={false}><Button type='primary'>上传图片</Button></Upload>
      </Col>
    </Row>);

    const Check = ({ item }) => {

      const index = _.indexOf(this.state.selected, item);

      return index > -1 ? <a
        className={styles.attachment_selected}
        onClick={() => {
          this.onItemClick(item);
        }}>
        <i className={styles.selected_index}>{index + 1}</i>
      </a> : null;
    };

    const Item = ({ item }) => {
      return (<Card className={styles.media_item}
                    bodyStyle={{ padding: 0 }}
                    cover={<a onClick={() => {
                      this.onItemClick(item);
                    }}><img src={item.thumb} style={{ width: '100%' }}
                    /></a>}
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


