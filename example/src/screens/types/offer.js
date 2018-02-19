import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    Image,
    ScrollView,
    TextInput,
    AsyncStorage
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {vw, vh, vmin, vmax} from '../../viewport'


class offer extends Component {

    constructor(props) {
        super(props);

        let productCount = '0';
        if (this.props.myNumber !== null && (this.props.myNumber !== 0))
            productCount = this.props.myNumber;
        this.state = {
            myNumber: productCount,
            wasEmpty: true,
        }
    }


    onPopToRoot = () => {
        this.props.navigator.popToRoot();
    };
    desPan = () => {
        this.props.navigator.push({
            screen: 'example.Types.descriptionPan',
            title: 'hot offer',
            passProps: {
                data: [{'title': 'شماره', 'des': '1'},
                    {'title': 'شماره', 'des': '1'},
                    {'title': 'شماره', 'des': '1'},
                    {'title': 'شماره', 'des': '1'},
                    {'title': 'شماره', 'des': '1'}],

            },
        });
    };
    opinion = () => {
        this.props.navigator.push({
            screen: 'example.Types.opinion',
            title: 'نظرات',
            passProps: {
                title: ' hi',
            },

        });
    };



    loadData = async () => {
        const data = await AsyncStorage.getItem('@CurrentBasket');
        if (data === null) return 0;
        const json = await  JSON.parse(data);

        let index = json.map(function (e) {
            return e.id;
        }).indexOf(this.props.id);

        if (index !== -1) {
            this.setState({myNumber: '' + json[index]['count'], wasEmpty: false});
        }
        // console.log(json);

    };

    static findIndex(array, id, id_number) {
        return array.map(function (e) {
            return e.id;
        }).indexOf(id_number);
    }

    onChanged = (text) => {
        let newText = '';
        let numbers = '0123456789';

        for (let i = 0; i < text.length; i++) {
            if (numbers.indexOf(text[i]) > -1) {
                newText = newText + text[i];
            }
            else {
                // your call back function
                alert("فقط عددد وارد کنید");
                break;
            }

        }
        this.setState({myNumber: newText});
    };
    onUp = () => {
        let num = Number.parseInt(this.state.myNumber, 10);
        this.setState({myNumber: String(num + 1)}, () => {
            this.props.onUP(num,this.props.id);
        });

    };
    onDown = () => {
        let num = Number.parseInt(this.state.myNumber, 10);
        if (num !== 0){
            this.props.onDown(num,this.props.id);
            this.setState({myNumber: String(num- 1)});}

        else this.setState({myNumber: '0'});


    };

    render() {
        return (
            <ScrollView>

                <View style={{
                    flex: 1, margin: 15, flexDirection: "column",
                    alignItems: "stretch",
                }}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{flex: 55*vw, flexDirection: 'column'}}>
                            <View
                                style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{
                                    color: '#17c408',
                                    fontFamily: 'B Yekan',
                                    fontSize: vw * 4
                                }}>{this.props.price} تومان</Text>
                                <Text style={{fontSize: vw * 4}}>قیمت :</Text>
                            </View>
                            {(this.props.off !== 0) ? <View
                                style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={styles.discount}>{this.props.disscount} تومان</Text>
                            </View> : null}
                            <View
                                style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                <TextInput
                                    maxLength={2}
                                    onChange={(event) => this.onChanged(event.nativeEvent.text)}
                                    keyboardType='numeric' style={{
                                    fontSize: vw * 4,
                                    fontFamily: 'B Yekan', textAlign: 'center'
                                }}>
                                    {this.state.myNumber}
                                </TextInput>
                                <View style={{flex: 1, flexDirection: 'column'}}>
                                    <TouchableOpacity onPress={this.onUp}>
                                        <Icon name="plus" size={vw * 5} color="#17C408" style={{margin: 10}}/>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={this.onDown}>
                                        <Icon name="minus" size={vw * 5} color="#C42B2D" style={{margin: 10}}/>
                                    </TouchableOpacity>
                                </View>

                            </View>

                        </View>
                        <Image source={{uri: this.props.imageUrl}}
                               style={styles.image}/>

                    </View>
                    <View style={{flex: 0.35, justifyContent: "center", alignItems: "center"}}>
                        <View style={styles.flexRow}>
                            <TouchableOpacity
                                style={styles.flex}
                                // onPress={this.opinion}
                            >
                                <Text style={styles.buttonText}>
                                    نظرات کاربران
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.flex}
                                // onPress={this.desPan}
                            >
                                <Text style={styles.buttonText}>
                                    مشخصات محصول
                                </Text>
                            </TouchableOpacity>

                        </View>


                    </View>
                    <View style={styles.flex}>
                        <Text style={{fontFamily: 'B Yekan', fontSize: vw * 4,}}>{this.props.des}</Text>
                    </View>
                </View>
            </ScrollView>
        );
    }

    dismissLightBox = async (sendTOHome) => {
        this.props.navigator.dismissLightBox();
        if (sendTOHome)
            this.props.navigator.pop();

    };

}

offer.propTypes = {
    title: PropTypes.string.isRequired,
    imageUrl: PropTypes.string.isRequired,
    des: PropTypes.string.isRequired,
    price: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
    flex: {
        flex: 1,

    },
    flexRow: {flexDirection: 'row'},

    title: {
        fontFamily: 'B Yekan',
        padding: 15,
        fontSize: vw * 5,
        textAlign: 'center'

    }
    , des: {},
    image: {
        flexDirection:'row',
        width: vw * 45,
        height: vh * 40,
        borderRadius: 20,
        borderColor: '#bec4be',
        borderWidth: 0.5,
    },
    buttonText: {
        fontFamily: 'B Yekan',
        textAlign: 'center',
        margin: 10,
        fontSize: vw * 4,
        backgroundColor: '#a7adba50',
        borderRadius: 10,
        borderColor: '#bec4be',
        borderWidth: 0.5,


    },
    discount: {
        fontFamily: 'B Yekan',
        textDecorationLine: 'line-through', fontSize: vw * 4, color: '#d94c3d',
    },
});

export default offer;
