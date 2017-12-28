import React, { Component } from 'react';
import {
    Dimensions,
    StyleSheet,
    View,
    TouchableWithoutFeedback
} from "react-native";
import PropTypes from 'prop-types';

let window = Dimensions.get('window');

let styles = StyleSheet.create({
    outerCircle: {
        height: 20,
        width: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2 / window.scale,
        borderRadius: 10,
        backgroundColor: 'transparent'
    },
    innerCircle: {
        height: 16,
        width: 16,
        borderRadius: 8
    }
});

class Circle extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { color, isSelected, selectedColor } = this.props;

        let innerCircle;
        let appliedColor;

        if (isSelected) {
            appliedColor = selectedColor;
            innerCircle = <View style={[styles.innerCircle, { backgroundColor: appliedColor }]}/>;
        } else {
            appliedColor = color;
            innerCircle = null;
        }

        return (
            <View style={{ padding: 10 }}>
                <View style={[styles.outerCircle, { borderColor: appliedColor }]}>
                    {innerCircle}
                </View>
            </View>
        );
    }
}

Circle.propTypes = {
    color: PropTypes.string,
    selectedColor:PropTypes.string,
    isSelected: PropTypes.bool
};

Circle.defaultProps = {
    isSelected: false
};

class Radio extends Component {
    constructor(props) {
        super(props);
        this.state = { selectedIndex: -1 }
    }

    _onSelect(index) {
        let { onSelect } = this.props;
        this.setState({
            selectedIndex: index
        });
        onSelect(index);
    }

    render() {
        let { selectedIndex } = this.state;
        let targetIndex = selectedIndex !== -1? selectedIndex : this.props.defaultSelect;

        let children = React.Children.map(this.props.children, (child, index) => {
            if (child.type === Option) {
                return React.cloneElement(child, {
                    onPress: () => this._onSelect(index),
                    isSelected: index == targetIndex
                });
            }

            return child;
        });

        return (
            <View>
                {children}
            </View>
        );
    }
}

Radio.propTypes = {
    onSelect: PropTypes.func.isRequired,
    defaultSelect: PropTypes.number
};

Radio.defaultProps = {
    defaultSelect: -1
};

class Option extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { onPress, isSelected, color, selectedColor, children } = this.props;

        return (
            <TouchableWithoutFeedback onPress={onPress}>
                <View style={{flexDirection: 'row'}}>
                    <Circle color={color} selectedColor={selectedColor} isSelected={isSelected}/>
                    <View style={{ flex: 1 }}>
                        {children}
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

Option.propTypes = {
    onPress: PropTypes.func,
    isSelected: PropTypes.bool,
    color: PropTypes.string,
    selectedColor: PropTypes.string
};

Radio.Option = Option;
module.exports = Radio;