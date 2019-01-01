import React, { Component } from "react";
import { Select } from "antd";

class SkuSelect extends Component<IProps, IState> {

    state = {
        defaultOpen: true
    } as IState;


    onDropdownVisibleChange = () => {
        this.setState({
            defaultOpen: false
        })
    }

    render() {
        const { defaultOpen } = this.state

        const { value } = this.props
        return <Select
            {...this.props}
            defaultOpen={defaultOpen && !value}
            onDropdownVisibleChange={this.onDropdownVisibleChange}
        >
            {this.props.children}
        </Select>
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