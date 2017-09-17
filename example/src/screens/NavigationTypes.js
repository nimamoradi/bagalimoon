import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import Row from '../components/Row';
import ImageRow from "../components/ImageRow";

class NavigationTypes extends React.Component {

    constructor(props) {
        super(props);
        // this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }


    toggleDrawer = () => {
        this.props.navigator.toggleDrawer({
            side: 'right',
            animated: true
        });
    };
    offer = () => {
        this.props.navigator.push({
            screen: 'example.Types.offer',
            title: 'hot offer',//todo add param
            passProps: {
                title: 'تنقلات',
                imageUrl: 'http://www.mihanfal.com/wp-content/uploads/2016/05/522-768x480.jpg',
                des: '95 درصد تخفیف مفت مفت!!' +
                'هدفون‌های بیتس اغلب به‌عنوان وسیله‌ای با صدایی شفاف و رسا شناخته می‌شوند. Studio Wirless  یکی از محصولات بی‌سیم بیتس است که در عین زیبایی و سبک‌وزنی، صدایی شفاف به همراه بیسی عالی ارائه می‌دهد. این دستگاه با وجود کارآمدبودن باتری ضعیفی دارد. آن را به افراد حرفه‌ای پیشنهاد می‌کنیم که می‌خواهند به موسیقی با صدایی رسا گوش دهند. در ادامه، بیشتر به این محصول خواهیم پرداخت'
            },


        });
    };


    pushScreen = () => {
        this.props.navigator.push({
            screen: 'example.Types.Push',
            title: 's',

        });
    };

    // pushCustomTopBarScreen = () => {
    //   this.props.navigator.push({
    //     screen: 'example.Types.CustomTopBarScreen'
    //   });
    // };

    // pushCustomButtonScreen = () => {
    //   this.props.navigator.push({
    //     screen: 'example.Types.CustomButtonScreen',
    //     title: 'Custom Buttons'
    //   });
    // };

    // pushTopTabsScreen = () => {
    //   this.props.navigator.push({
    //     screen: 'example.Types.TopTabs',
    //     title: 'Top Tabs',
    //     topTabs: [{
    //       screenId: 'example.Types.TopTabs.TabOne',
    //       title: 'Tab One',
    //     }, {
    //       screenId: 'example.Types.TopTabs.TabTwo',
    //       title: 'Tab Two',
    //     }],
    //   });
    // };

    // showModal = () => {
    //   this.props.navigator.showModal({
    //     screen: 'example.Types.Modal',
    //     title: 'Modal',
    //   });
    // };

    // showLightBox = () => {
    //     this.props.navigator.showLightBox({
    //         screen: "example.Types.LightBox",
    //         passProps: {
    //             title: 'LightBox',
    //             content: 'Hey there, I\'m a light box screen :D',
    //             onClose: this.dismissLightBox,
    //         },
    //         style: {
    //             backgroundBlur: 'dark',
    //             backgroundColor: 'rgba(0, 0, 0, 0.7)',
    //             tapBackgroundToDismiss: true
    //         }
    //     });
    // };

    // dismissLightBox = () => {
    //   this.props.navigator.dismissLightBox();
    // };

    // showInAppNotification = () => {
    //   this.props.navigator.showInAppNotification({
    //     screen: 'example.Types.Notification',
    //   });
    // };


    render() {
        return (
            <ScrollView style={styles.container}>
                <Row style={styles.row} title={'Toggle Drawer'} onPress={this.toggleDrawer}/>
                <ImageRow title={'offer'}
                          imageUrl={'http://www.mihanfal.com/wp-content/uploads/2016/05/522-768x480.jpg'}
                          onPress={this.offer}/>
                <ImageRow title={'top sell'}
                          imageUrl={'http://www.diskdoctoronline.com/uploads/news/360x350/1416120852.jpg'}
                          onPress={this.pushScreen}/>
            </ScrollView>


        );

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        height: 50,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0, 0, 0, 0.054)',
    },
    text: {
        fontSize: 16,
    },
});

export default NavigationTypes;
