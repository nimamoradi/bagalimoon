import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, TouchableOpacity, ListView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class basketPreview extends React.Component {
    constructor(props) {
        super(props);
        const basket = this.props.basket;
        console.log(basket)
        let dataArray=[];
        for (let i = 0; i < basket.length; i++) {
            dataArray.push({'title': basket[''], 'price': '', 'count': ''})
        }

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSourceProducts: ds.cloneWithRows([dataArray])
        };
        // console.log(dataArray)
    }


    renderRow = (rowData) => {
        return (
            <View style={styles.row}>
                <Text style={styles.text}>{rowData['name']} :</Text>
                <Text style={styles.price}>{rowData.price} :</Text>
                <TouchableOpacity onPress={this.onUp}>
                    <Icon name="plus" size={30} color="#17C408" style={{margin: 10}}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.onDown}>
                    <Icon name="minus" size={30} color="#C42B2D" style={{margin: 10}}/>
                </TouchableOpacity>
                <Text style={styles.price}>{rowData.count}</Text>
            </View>
        );
    }

    render() {
        return (<ListView
                style={{flexDirection: 'column', width: '100%', height: '80%'}}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                dataSource={this.state.dataSourceProducts}
                renderRow={(rowData) =>
                    this.renderRow(rowData)}
            />
        );

    }
}

basketPreview.propTypes = {
    title: PropTypes.string.isRequired,
    des: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    row: {

        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.054)',
    },
    text: {
        fontSize: 16,
        margin: 20,
    },
    price: {
        fontSize: 16,
        margin: 20,
        color: '#28d715'
    }
});

export default basketPreview;
