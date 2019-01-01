import React, { Component } from 'react';
import AddImageView from '@/components/Widget/AddImageView';
import { arrayMove } from 'react-sortable-hoc';
import * as _ from 'lodash';
import SelectedImageView from '@/components/Widget/SelectedImageView';

interface IState {
  images: Models.MediaListItem[]
}


class EditGoodsImageList extends Component<any, IState> {
  state = {
    images: [],
  } as IState;

  constructor(props) {
    super(props);
  }

  onAddImageViewClick = () => {
    const { images } = this.state;
    this.props.dispatch({
      type: 'media/show',
      payload: {
        max: 10 - images.length,
        selected: images,
        callBack: (res: Models.MediaListItem[]) => {
          const SelfImages = _.cloneDeep(images);
          res.map(item => {
            SelfImages.push(item);
          });
          this.setState({
            'images': SelfImages,
          });
        },
      },
    });
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    const images = arrayMove(this.state.images, oldIndex, newIndex);
    this.setState({
      'images': images,
    });
  };

  render() {
    const { images } = this.state;

    const ImageList = images ? images.map((item, index) => {
      return <SelectedImageView
        key={index}
        width={94}
        height={94}
        item={item} border={true}
        className='mr-10 mb-10'
        showDelBtn={true}
        onDel={(delItem) => {
          let SelfImages = _.cloneDeep(this.state.images)
          SelfImages.splice(index, 1)
          this.setState({
            images: SelfImages
          })
        }}
      />;
    }) : null;

    return <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {ImageList}
      {images.length < 10 ? <div onClick={this.onAddImageViewClick} style={{ display: 'inline-block' }}>
        <AddImageView width={100} height={100} border={true} />
      </div> : null}
    </div>;
  }
}

export default EditGoodsImageList;
