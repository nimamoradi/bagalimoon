import React from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import Row from '../components/Row';
import ImageRow from "../components/ImageRow";

class NavigationTypes extends React.Component {

    constructor(props) {
        super(props);
         this.props.navigator.setOnNavigatorEvent(this.onNavigatorEvent.bind(this));
    }


    toggleDrawer = () => {
        this.props.navigator.toggleDrawer({
            side: 'right',
            animated: true
        });
    };
    offer = (title,imageUrl,des) => {
        this.props.navigator.push({
            screen: 'example.Types.offer',
            title: 'hot offer',
            passProps: {
                title:title ,
                imageUrl: imageUrl,
                des: des
            },


        });
    };


    pushScreen = () => {
        this.props.navigator.push({
            screen: 'example.Types.test',
            title: 'list view',

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
    onNavigatorEvent(event) { // this is the onPress handler for the two buttons together

        if (event.type == 'NavBarButtonPress') { // this is the event type for button presses
            if (event.id == 'back') { // this is the same id field from the static navigatorButtons definition
                this.toggleDrawer()
            }
            if (event.id == 'edit') {
                // AlertIOS.alert('NavBar', 'Add button pressed');
            }
        }
    }


    render() {
        return (
            <ScrollView style={styles.container}>

                <ImageRow title={'offer'}
                          imageUrl={'http://www.mihanfal.com/wp-content/uploads/2016/05/522-768x480.jpg'}
                          onPress={()=>this.offer('تنقلات' ,
                              'http://www.mihanfal.com/wp-content/uploads/2016/05/522-768x480.jpg' ,
                              'دستگاه «PIXMA G2400» ساخت شرکت «Canon» پرینتری جوهرافشان است که علاوه‌بر پرینت، قابلیت‌های دیگری مانند اسکن و کپی را هم به همراه دارد. این پرینتر اگرچه چندکاره طراحی شده ' +
                              'است، قابلیت‌ چاپ عکس را به ‌صورت اختصاصی هم دارد. درنتیجه می‌توانید این پرینتر را برای چاپ عکس با کیفیت بالا خرید' +
                              'اری کنید و از قابلیت‌های اسکن و کپی هم در آن بهره ببرید. این دستگاه از سیستم مخزن جوهر یا همان تانکر استف' +
                              'اده می‌کند که در مدیریت هزینه‌ها تأثیر بسیار زیادی دارد و با اتمام جوهر، نیازی به تعویض کارتریج آن نیست؛ تن' +
                              'ها کافی است جوهر موردنیاز را در مخزن مناسب خود بریزید. انواع کاغذ‌های مخصوص چاپ عکس در این پرینتر قابل ‌اس' +
                              'تفاده هستند که می‌توانید شرح آن‌ها را در قسمت مشخصات فنی محصول مشاهده فرمایید. یکی از ویژگی‌های مثبت ای' +
                              'ن دستگاه، قابلیت چاپ بدون حاشیه است که درنتیجه‌ی آن می‌توانید عکس‌های تمام‌صفحه روی کاغذ مخ' +
                              'صوص عکس، چاپ کنید. برای اتصال این دستگاه به رایانه باید از درگاه USB استفاده کرد.'
                          )}/>
                <ImageRow title={'top sell'}
                          imageUrl={'http://www.diskdoctoronline.com/uploads/news/360x350/1416120852.jpg'}
                          onPress={this.pushScreen}/>
                <Row style={styles.row} title={'Toggle Drawer'} onPress={this.toggleDrawer}/>
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
