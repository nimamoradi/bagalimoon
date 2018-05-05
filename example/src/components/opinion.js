import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import SingleOpinion from './singleOpinion';
import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';
import {vw, vh, vmin, vmax} from '../viewport'
let navigator;

dismissLightBox = () => {
    navigator.dismissLightBox();
};
showLightBox = () => navigator.showLightBox({
    screen: 'example.Types.newComment',
    title: 'نظرات',
    passProps: {
        title: 'پیغام جدید',
        content: 'Hey there, I\'m a light box screen :D',
        onClose: this.dismissLightBox,
    },
});
const CustomButton = () => (
    <TouchableOpacity
        style={[styles.buttonContainer]}
        onPress={() => showLightBox()}>

        <Icon name="plus" size={vw*6} color="#FF4500" />

    </TouchableOpacity>);
Navigation.registerComponent('plus', () => CustomButton);


export default class opinion extends React.Component {


    static navigatorButtons = {
        rightButtons: [
            {
                id: 'plus',
                component: 'plus',
                passProps: {
                    text: 'افزودن پیام'
                }
            }
        ]
    };


    componentWillMount() {
        navigator = this.props.navigator;
    }

    render() {
        return (
            <ScrollView>

                <View style={styles.container}>
                    <SingleOpinion style={styles.opinion} title={'افتضاح'} name={'نیما'}
                                   opinion={'این دوره آموزشی نحوه ساخت انیمیشن های مبارزه ای پویا و مهیج را به روش انیمیشن ساز های حرفه ای را به صورت قدم به قدم می آموزد. پایه های اصلی انیمیشن های مبارزه ای را زمان بندی هجومی، جذبه و ظاهر قدرتمند تشکیل می دهند. مدرس دوره Jason Shum آموزش این دوره را از ابتدا که مرحله ایده پردازی می باشد آغاز کرده به پیش می رود. وی دوره را با معرفی تجهیزات Gnomon Bounty Hunter در نرم افزار Maya آغاز می کند. سپس درباره خصوصیات یک مبارز مانند انرژی و شخصیت توضیح می دهد. سپس یک شخصیت را ایده'}/>

                    <SingleOpinion style={styles.opinion} title={'افتضاح'} name={'نیما'}
                                   opinion={'این دوره آموزشی نحوه ساخت انیمیشن های مبارزه ای پویا و مهیج را به روش انیمیشن ساز های حرفه ای را به صورت قدم به قدم می آموزد. پایه های اصلی انیمیشن های مبارزه ای را زمان بندی هجومی، جذبه و ظاهر قدرتمند تشکیل می دهند. مدرس دوره Jason Shum آموزش این دوره را از ابتدا که مرحله ایده پردازی می باشد آغاز کرده به پیش می رود. وی دوره را با معرفی تجهیزات Gnomon Bounty Hunter در نرم افزار Maya آغاز می کند. سپس درباره خصوصیات یک مبارز مانند انرژی و شخصیت توضیح می دهد. سپس یک شخصیت را ایده'}/>

                    <SingleOpinion style={styles.opinion} title={'افتضاح'} name={'نیما'}
                                   opinion={'این دوره آموزشی نحوه ساخت انیمیشن های مبارزه ای پویا و مهیج را به روش انیمیشن ساز های حرفه ای را به صورت قدم به قدم می آموزد. پایه های اصلی انیمیشن های مبارزه ای را زمان بندی هجومی، جذبه و ظاهر قدرتمند تشکیل می دهند. مدرس دوره Jason Shum آموزش این دوره را از ابتدا که مرحله ایده پردازی می باشد آغاز کرده به پیش می رود. وی دوره را با معرفی تجهیزات Gnomon Bounty Hunter در نرم افزار Maya آغاز می کند. سپس درباره خصوصیات یک مبارز مانند انرژی و شخصیت توضیح می دهد. سپس یک شخصیت را ایده'}/>

                    <SingleOpinion style={styles.opinion} title={'افتضاح'} name={'نیما'}
                                   opinion={'این دوره آموزشی نحوه ساخت انیمیشن های مبارزه ای پویا و مهیج را به روش انیمیشن ساز های حرفه ای را به صورت قدم به قدم می آموزد. پایه های اصلی انیمیشن های مبارزه ای را زمان بندی هجومی، جذبه و ظاهر قدرتمند تشکیل می دهند. مدرس دوره Jason Shum آموزش این دوره را از ابتدا که مرحله ایده پردازی می باشد آغاز کرده به پیش می رود. وی دوره را با معرفی تجهیزات Gnomon Bounty Hunter در نرم افزار Maya آغاز می کند. سپس درباره خصوصیات یک مبارز مانند انرژی و شخصیت توضیح می دهد. سپس یک شخصیت را ایده'}/>
                </View>
            </ScrollView>
        );
    }


    componentWillUnmount() {
        navigator = null;
    }
}
opinion.propTypes = {
    title: PropTypes.string.isRequired,

};

const styles = StyleSheet.create({
    container: {
        margin: 5,
        flex: 1,
        flexDirection:'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
    },
    buttonContainer: {
        width: 48,
        height: 48,
        justifyContent: 'center',
        alignItems: 'center'
    },
    button: {
        width: 34,
        height: 34,
        borderRadius: 34 / 2,
        fontFamily: 'B Yekan',
        justifyContent: 'center',
        alignItems: 'center'
    },
    opinion:{
        fontFamily: 'B Yekan',
            }

});
