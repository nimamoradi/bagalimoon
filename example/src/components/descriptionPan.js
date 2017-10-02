import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, ListView} from 'react-native';
import TableRow from './TableRowLong'

class descriptionPan extends React.Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            dataSourceDes: ds.cloneWithRows(this.props.data)
        };
    }

    render() {
        return (
            <View style={{flexDirection: 'column', alignItems: 'center'}}>
                <ListView
                    style={{flexDirection: 'row', justifyItems: 'center'}}
                    horizontal={false}
                    showsHorizontalScrollIndicator={false}
                    dataSource={this.state.dataSourceDes}
                    renderRow={(rowData) =>
                        <TableRow title={rowData.title} des={rowData.des}/>}/>
            </View>

        );
    }
}

descriptionPan.propTypes = {

    // size: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
    row: {
        height: 48,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.054)',
    },

});

export default descriptionPan;
