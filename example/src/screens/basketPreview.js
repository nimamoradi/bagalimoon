import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, TouchableOpacity, ListView,} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class basketPreview extends React.Component {
    constructor(props) {
        super(props);
        let basket = JSON.parse(this.props.basket);
        console.log(basket);

        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            basket: basket,
            dataSourceProducts: ds,
            totalPrice: '?'
        };
        // console.log(dataArray)
    }

    componentDidMount() {
        let totalPrice = 0;
        let basket = this.state.basket;
        for (let i = 0; i < basket.length; i++) {
            totalPrice += Number.parseInt(basket[i]['price']) * Number.parseInt(basket[i]['count'])

        }
        this.setState({
            dataSourceProducts: this.state.dataSourceProducts.cloneWithRows(this.state.basket),
            totalPrice: totalPrice,
        });
    }
    address = () => {
        this.props.navigator.push({
            screen: 'example.mapView',
            title: 'آدرس',
            passProps: {
                basket:this.state.basket
            },
        });
    };
    onUp = (rowdata) => {
        rowdata.count = Number.parseInt(rowdata.count);
        let updatedState = this.state.basket;
        let data = this.state.basket;
        updatedState[data.indexOf(rowdata)]['count']++;
        console.log(updatedState);
        this.setState({basket: updatedState});
        this.onCountChanged(rowdata, false);
    };
    onDown = (rowdata) => {
        rowdata.count = Number.parseInt(rowdata.count);
        let updatedState = this.state.basket;
        let data = this.state.basket;
        if (updatedState[data.indexOf(rowdata)]['count'] !== 0) {
            updatedState[data.indexOf(rowdata)]['count']--;
            this.onCountChanged(rowdata, true);
        }
        console.log(updatedState);
        this.setState({basket: updatedState});

    };
    onCountChanged = (rowdata, down) => {
        let priceChange;
        if (down)
            priceChange = -Number.parseInt(rowdata.price, 10);
        else priceChange = Number.parseInt(rowdata.price, 10);
        priceChange = priceChange + Number.parseInt(this.state.totalPrice, 10);
        this.setState({totalPrice: priceChange});

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
                    style={{flexDirection: 'column', width: '100%', height: '70%'}}
                    horizontal={false}
                    showsHorizontalScrollIndicator={false}
                    dataSource={this.state.dataSourceProducts}
                    renderRow={(rowData) =>
                        this.renderRow(rowData)}
                />
                <View style={{flexDirection: 'row', alignItems: 'center', height: '10%'}}>
                    <View style={{flex: 1}}/>
                    <Text style={styles.price}>
                        {this.state.totalPrice}
                    </Text>
                    <Text style={styles.text}>
                        جمع خرید
                    </Text>
                    <View style={{flex: 1}}/>
                </View>
                <View style={{flexDirection: 'row', alignContent: 'center', height: '20%'}}>
                    <TouchableOpacity style={{flex: 1}}
                    onPress={this.address}>
                        <View style={styles.button}>
                            <Icon name="shopping-cart" size={30} color="#00ff0050"  style={{flex:1}}/>
                            <View style={{flex:0.5}}/>
                            <Text style={{flex:1}}>پرداخت</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex: 1}}>
                        <View style={styles.buttonCancel}>

                            <Text  style={{flex:1}}>حذف سفارش</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );

    }
}

basketPreview.propTypes = {
    basket: PropTypes.string.isRequired,//encoded array in json

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
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        borderWidth: 0.5,
        borderRadius: 10,
        padding: 5,
        marginTop:20,
        margin:2,
        marginLeft:20,
        marginBottom:60,
        alignContent:'center',
        borderColor: '#23d429',
        backgroundColor: '#23d42920'
    },
    buttonCancel: {
        flex: 1,
        flexDirection: 'row',
        borderWidth: 0.5,
        borderRadius: 10,
        padding: 5,
        margin:2,
        marginTop:20,
        alignContent:'center',
        marginRight:20,
        marginBottom:60,
        borderColor: '#d46e62',
        backgroundColor: '#d46e6220'
    }

});

export default basketPreview;
