import React, { Component } from 'react';
import { Select, Divider, Input } from 'antd';

class SkuSelect extends Component<IProps, IState> {

  state = {
    defaultOpen: true,
  } as IState;


  onDropdownVisibleChange = () => {
    this.setState({
      defaultOpen: false,
    });
  };

  render() {
    const { defaultOpen } = this.state;

    const { value } = this.props;
    return <Select
      {...this.props}
      defaultOpen={defaultOpen && !value}
      onDropdownVisibleChange={this.onDropdownVisibleChange}
      dropdownRender={menu => (
        <div>
          {menu}
          <Divider style={{ margin: '4px 0' }} />
          <div style={{ padding: '0px 4px 4px', cursor: 'pointer' }}>
            <Input
              placeholder='添加规格回车保存'
              onChange={(e) => {
                console.log(e);

              }}
              onPressEnter={(e) => {
                console.log(e);

              }}
            />
          </div>
        </div>
      )}
    >
      {this.props.children}
    </Select>;
  }
}

interface IProps {
  children?;
  style?;
  value?;
  onChange?;
}

interface IState {
  defaultOpen: boolean;
}

export default SkuSelect;
