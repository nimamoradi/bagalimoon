import React from 'react';
import {
    View,
    StyleSheet,
    Text,
    ScrollView,
    TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import SingleOpinion from './singleOpinion';
import {Navigation} from 'react-native-navigation';


let navigator;

dismissLightBox = () => {
    navigator.dismissLightBox();
};
const CustomButton = ({text}) =>
    <TouchableOpacity
        style={[styles.buttonContainer]}
        onPress={() => navigator.showLightBox({
            screen: 'example.Types.newComment',
            title: 'نظرات',
            passProps: {
                            title: 'پیغام جدید',
                            content: 'Hey there, I\'m a light box screen :D',
                            onClose: this.dismissLightBox,
                        },
        })}>
        <View style={styles.button}>
            <Text style={{color: 'black'}}>{text}</Text>
        </View>
    </TouchableOpacity>;
Navigation.registerComponent('CustomButton', () => CustomButton);


export default class opinion extends React.Component {


    static navigatorButtons = {
        rightButtons: [
            {
                id: 'custom-button',
                component: 'CustomButton',
                passProps: {
                    text: 'htc,nk kzv'
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
        backgroundColor: 'tomato',
        width: 34,
        height: 34,
        borderRadius: 34 / 2,
        overflow: 'hidden',
        justifyContent: 'center',
        alignItems: 'center'
    },

});
