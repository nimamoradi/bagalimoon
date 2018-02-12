class code {
    static serverAddress = 'https://baghali.cf/';
    static InternetCheckAddress = 'https://my.shatel.ir';
    static timeOut = 8000;
    static retryCount = 5;

    //other relevant code here

    static getServerAddress() {
        return this.serverAddress;
    }
    static getInternetCheckAddress() {
        return this.InternetCheckAddress;
    }

    static getTimeOut() {
        return this.timeOut;
    }

    static getReTry() {
        return this.retryCount;
    }

    static showLightBox(screen, passProps, context) {
        context.props.navigator.showLightBox({
            screen: screen,
            passProps: passProps,
            style: {
                backgroundBlur: 'dark',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                tapBackgroundToDismiss: true
            }
        })
    };

    static alert(title, text, context) {
        context.props.navigator.showLightBox({
            screen: 'example.alert',
            passProps: {title: title, text: text, onClose: () => this.dismissLightBox(context)},
            style: {
                backgroundBlur: 'dark',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                tapBackgroundToDismiss: true
            }
        })
    };

    static dismissLightBox(context) {
        context.props.navigator.dismissLightBox();
    };


    static retryParam(task, context, param) {
        context.props.navigator.push({
            screen: 'example.Types.reTry',
            navigatorStyle: {
                navBarHidden: true,
            },
            overrideBackPress: true,
            passProps: {
                task: task,
                param: param,
                backScreen: context
            },
        });
    }

    static retry(task, context) {
        context.props.navigator.push({
            screen: 'example.Types.reTry',
            navigatorStyle: {
                navBarHidden: true,
            },
            overrideBackPress: true,
            passProps: {
                task: task,
            },
        });
    }

    static  getIndex = (value, arr, prop) => {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i][prop] === value) {
                return i;
            }
        }
        return -1; //to handle the case where the value doesn't exist
    };

    static performTasks = (input, tasks) =>{
        if (tasks.length === 1)
            return tasks[0](input);
        tasks[0](input, function (output) {
            performTasks(output, tasks.slice(2)); //Performs the tasks in the 'tasks[]' array }); }
        });
    }

//     import { Dimensions } from 'react-native';
// const { width, height } = Dimensions.get('window');
//
// //Guideline sizes are based on standard ~5" screen mobile device
// const guidelineBaseWidth = 350;
// const guidelineBaseHeight = 680;
//
// const scale = size => width / guidelineBaseWidth * size;
// const verticalScale = size => height / guidelineBaseHeight * size;
// const moderateScale = (size, factor = 0.5) => size + ( scale(size) - size ) * factor;
        }

        export default code;