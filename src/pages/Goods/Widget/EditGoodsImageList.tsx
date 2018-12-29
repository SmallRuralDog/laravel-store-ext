import React, { Component } from 'react';
import AddImageView from '@/components/Widget/AddImageView';
import { arrayMove } from 'react-sortable-hoc';
import * as _ from 'lodash';

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
    this.props.dispatch({
      type: 'media/show',
      payload: {
        callBack: (res: Models.MediaListItem[]) => {
          const images = _.clone(this.state.images);
          res.map(item => {
            images.push(item);
          });
          this.setState({
            'images': images,
          });
        },
      },
    });
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    const images = arrayMove(this.state.images, oldIndex, newIndex);

    console.log(images);
    this.setState({
      'images': images,
    });
  };

  render() {
    const { images } = this.state;

    return <div>

      <div onClick={this.onAddImageViewClick} style={{ display: 'inline-block' }}>
        <AddImageView width={90} height={90} border={true} />
      </div>
    </div>;
  }
}

export default EditGoodsImageList;
;
;