import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, View, Text, ScrollView} from 'react-native';
import SingleOpinion from './singleOpinion';

function opinion({title}) {

    return (
        <ScrollView>

            <View style={styles.container}>
                <SingleOpinion style={styles.sopinion} title={'افتضاح'} name={'نیما'}
                               opinion={'این دوره آموزشی نحوه ساخت انیمیشن های مبارزه ای پویا و مهیج را به روش انیمیشن ساز های حرفه ای را به صورت قدم به قدم می آموزد. پایه های اصلی انیمیشن های مبارزه ای را زمان بندی هجومی، جذبه و ظاهر قدرتمند تشکیل می دهند. مدرس دوره Jason Shum آموزش این دوره را از ابتدا که مرحله ایده پردازی می باشد آغاز کرده به پیش می رود. وی دوره را با معرفی تجهیزات Gnomon Bounty Hunter در نرم افزار Maya آغاز می کند. سپس درباره خصوصیات یک مبارز مانند انرژی و شخصیت توضیح می دهد. سپس یک شخصیت را ایده'}/>

                <SingleOpinion style={styles.sopinion} title={'افتضاح'} name={'نیما'}
                               opinion={'این دوره آموزشی نحوه ساخت انیمیشن های مبارزه ای پویا و مهیج را به روش انیمیشن ساز های حرفه ای را به صورت قدم به قدم می آموزد. پایه های اصلی انیمیشن های مبارزه ای را زمان بندی هجومی، جذبه و ظاهر قدرتمند تشکیل می دهند. مدرس دوره Jason Shum آموزش این دوره را از ابتدا که مرحله ایده پردازی می باشد آغاز کرده به پیش می رود. وی دوره را با معرفی تجهیزات Gnomon Bounty Hunter در نرم افزار Maya آغاز می کند. سپس درباره خصوصیات یک مبارز مانند انرژی و شخصیت توضیح می دهد. سپس یک شخصیت را ایده'}/>

                <SingleOpinion style={styles.sopinion} title={'افتضاح'} name={'نیما'}
                               opinion={'این دوره آموزشی نحوه ساخت انیمیشن های مبارزه ای پویا و مهیج را به روش انیمیشن ساز های حرفه ای را به صورت قدم به قدم می آموزد. پایه های اصلی انیمیشن های مبارزه ای را زمان بندی هجومی، جذبه و ظاهر قدرتمند تشکیل می دهند. مدرس دوره Jason Shum آموزش این دوره را از ابتدا که مرحله ایده پردازی می باشد آغاز کرده به پیش می رود. وی دوره را با معرفی تجهیزات Gnomon Bounty Hunter در نرم افزار Maya آغاز می کند. سپس درباره خصوصیات یک مبارز مانند انرژی و شخصیت توضیح می دهد. سپس یک شخصیت را ایده'}/>

                <SingleOpinion style={styles.sopinion} title={'افتضاح'} name={'نیما'}
                               opinion={'این دوره آموزشی نحوه ساخت انیمیشن های مبارزه ای پویا و مهیج را به روش انیمیشن ساز های حرفه ای را به صورت قدم به قدم می آموزد. پایه های اصلی انیمیشن های مبارزه ای را زمان بندی هجومی، جذبه و ظاهر قدرتمند تشکیل می دهند. مدرس دوره Jason Shum آموزش این دوره را از ابتدا که مرحله ایده پردازی می باشد آغاز کرده به پیش می رود. وی دوره را با معرفی تجهیزات Gnomon Bounty Hunter در نرم افزار Maya آغاز می کند. سپس درباره خصوصیات یک مبارز مانند انرژی و شخصیت توضیح می دهد. سپس یک شخصیت را ایده'}/>
            </View>
        </ScrollView>
    );
}

opinion.propTypes = {
    title: PropTypes.string.isRequired,

};

const styles = StyleSheet.create({
    container: {

        flex: 1,
        paddingHorizontal: 16,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.054)',
    },
    sopinion: {
        borderRadius: 10,
        borderColor: '#bec4be',
        borderWidth: 0.5,
        marginTop:5,
        padding: 10,
        borderBottomWidth: 5,
        borderBottomColor: 'rgba(0, 0, 0, 0.1)',
    },
});

export default opinion;
