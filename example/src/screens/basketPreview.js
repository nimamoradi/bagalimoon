import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, TouchableOpacity, ListView} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class basketPreview extends React.Component {
    constructor(props) {
        super(props);
        let basket = JSON.parse(this.props.basket);
        console.log(basket);

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            basket: basket,
            dataSourceProducts: ds
        };
        // console.log(dataArray)
    }

    componentDidMount() {
        this.setState({
            dataSourceProducts: this.state.dataSourceProducts.cloneWithRows(this.state.basket),

        });
    }


    onUp = (rowdata) => {
        rowdata.count = Number.parseInt(rowdata.count);
        let updatedState = this.state.basket;
        let data = this.state.basket;
        updatedState[data.indexOf(rowdata)]['count']++;
        console.log(updatedState);
        this.setState({basket: updatedState});
    };
    onDown = (rowdata) => {
        rowdata.count = Number.parseInt(rowdata.count);
        let updatedState = this.state.basket;
        let data = this.state.basket;
        if(updatedState[data.indexOf(rowdata)]['count']!==0)
        updatedState[data.indexOf(rowdata)]['count']--;
        console.log(updatedState);
        this.setState({basket: updatedState});

    };


    renderRow = (rowData) => {
        return (
            <View style={{flexDirection: 'row'}}>
                <Text style={styles.text}>{rowData['name']}</Text>
                <Text style={styles.price}>{rowData.price}</Text>
                <Text style={styles.price}>{rowData.count}</Text>
                <TouchableOpacity onPress={() => this.onUp(rowData)}>
                    <Icon name="plus" size={30} color="#17C408" style={styles.text}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.onDown(rowData)}>
                    <Icon name="minus" size={30} color="#C42B2D" style={styles.text}/>
                </TouchableOpacity>

            </View>
        );
    };

    render() {
        return (
            <View style={{flexDirection: 'column'}}>
                <View>
                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.tableHeader}>نام</Text>
                        <Text style={styles.tableHeader}>قیمت واحد</Text>
                        <Text style={styles.tableHeader}>تعداد</Text>
                        <View style={{flex: 1}}/>

                    </View>

                </View>

                <ListView
                    style={{flexDirection: 'column', width: '100%', height: '80%'}}
                    horizontal={false}
                    showsHorizontalScrollIndicator={false}
                    dataSource={this.state.dataSourceProducts}
                    renderRow={(rowData) =>
                        this.renderRow(rowData)}
                />
                <View>
                    <Text style={{textAlign: 'center'}}>
                        جمع خرید
                    </Text>

                </View>
            </View>
        );

    }
}

basketPreview.propTypes = {
    basket: PropTypes.array.isRequired,

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
        flex: 1,
        margin: 10,
        textAlign: 'center'
    },
    price: {
        margin: 10,
        fontSize: 16,
        flex: 1,
        textAlign: 'center'
    },
    tableHeader: {
        fontSize: 20,
        flex: 1,
        margin: 10,
        color: '#000',
        textAlign: 'center'
    }
});

export default basketPreview;
