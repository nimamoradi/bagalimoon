import * as DeviceInfo from 'react-native-device-info';
import {vw, vh, vmin, vmax} from './viewport'
import {Navigation} from "react-native-navigation";
import {Platform} from 'react-native';

class code {
    static serverAddress = 'https://application.baghalimoon.com';


    static timeOut = 8000;
    static retryCount = 5;

    //push screen relevant code here
    static pushScreen(screen, title, passProps, context) {
        context.props.navigator.push({
            screen: screen,
            navigatorStyle: {
                navBarHidden: true,
                navBarTitleTextCentered: true,
            },
            title: title,
            passProps: passProps,
        });

    };

    static pushScreenNavBar(screen, title, passProps, context) {
        context.props.navigator.push({
            screen: screen,
            navigatorStyle: {
                navBarTranslucent: true,
                navBarTextFontFamily: 'B Yekan',// Changes the title font
                navBarTitleTextCentered: true,
            },
            title: title,
            passProps: passProps,
        });

    };

    static pushScreenTrans(screen, title, passProps, context) {
        context.props.navigator.push({
            screen: screen,
            navigatorStyle: {
                navBarBackgroundColor: 'transparent', // the background is white
                drawUnderNavBar: true,
                drawUnderTabBar: true,
                navBarTranslucent: false
            },
            title: title,
            passProps: passProps,
        });

    };

    static getServerAddress() {
        return this.serverAddress;
    }

    static getTimeOut() {
        return this.timeOut;
    }

    // static getReTry() {
    //     return this.retryCount;
    // }

    static showLightBox(screen, passProps, context) {
        Navigation.showLightBox({
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
        Navigation.showLightBox({
            screen: 'example.alert',
            passProps: {title: title, text: text, onClose: () => this.dismissLightBox(context)},
            style: {
                backgroundBlur: 'dark',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                tapBackgroundToDismiss: true
            }
        })
    };

    static alertAdvanced(title, text, context, onclose) {
        context.props.navigator.showLightBox({
            screen: 'example.alert',
            passProps: {title: title, text: text, onClose: onclose},
            style: {
                backgroundBlur: 'dark',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                tapBackgroundToDismiss: false
            }
        })
    };

    static dismissLightBox(context) {
        context.props.navigator.dismissLightBox();
    };


    static retryParam(task, context, param, massage) {
        context.props.navigator.push({
            screen: 'example.Types.reTry',
            navigatorStyle: {
                navBarHidden: true,
            },
            overrideBackPress: true,
            passProps: {
                task: task,
                param: param,
                massage: massage
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


    static deviceInfo(phoneNumber) {
        let data = {
            'screenHeight': 100 * vh,
            'screenWidth': 100 * vw,
            'isEmulator': DeviceInfo.isEmulator(),
            'Application_name': DeviceInfo.getApplicationName(),
            'APILevel': DeviceInfo.getAPILevel(),
            'Brand': DeviceInfo.getBrand(),
            'BuildNumber': DeviceInfo.getBuildNumber().toString(),
            'BundleId': DeviceInfo.getBundleId(),
            'Carrier': DeviceInfo.getCarrier(),
            'DeviceCountry': DeviceInfo.getDeviceCountry(),
            'DeviceId': DeviceInfo.getDeviceId(),
            'DeviceLocale': DeviceInfo.getDeviceLocale(),
            'DeviceName': DeviceInfo.getDeviceName(),
            'FirstInstallTime': DeviceInfo.getFirstInstallTime(),
            'FontScale': DeviceInfo.getFontScale(),
            'FreeDiskStorage': DeviceInfo.getFreeDiskStorage(),
            'IPAddress': DeviceInfo.getIPAddress().toString(),
            'InstanceID': DeviceInfo.getInstanceID(),
            'LastUpdateTime': DeviceInfo.getLastUpdateTime(),
            'MACAddress': DeviceInfo.getMACAddress().toString(),
            'Manufacturer': DeviceInfo.getManufacturer(),
            'MaxMemory': DeviceInfo.getMaxMemory(),
            'Model': DeviceInfo.getModel(),
            'PhoneNumber': phoneNumber,// DeviceInfo.getPhoneNumber().toString() not working
            'ReadableVersion': DeviceInfo.getReadableVersion(),
            'SerialNumber': DeviceInfo.getSerialNumber(),
            'SystemName': DeviceInfo.getSystemName(),
            'SystemVersion': DeviceInfo.getSystemVersion(),
            'Timezone': DeviceInfo.getTimezone(),
            'TotalDiskCapacity': DeviceInfo.getTotalDiskCapacity(),
            'TotalMemory': DeviceInfo.getTotalMemory(),
            'UniqueID': DeviceInfo.getUniqueID(),
            'Version': DeviceInfo.getVersion(),
            'is24Hour': DeviceInfo.is24Hour(),
            'isPinOrFingerprintSet': false,
            'isTablet': DeviceInfo.isTablet(),
        };
        //updating bool
        if (data.isEmulator === null)
            data.isEmulator = true;
        if (data.is24Hour === null)
            data.is24Hour = true;
        if (data.isTablet === null)
            data.isTablet = true;
        if (data.isTablet === null)
            data.isTablet = true;

        //updating numeric
        if (data.APILevel === null)
            data.APILevel = 1;
        if (data.FirstInstallTime === null)
            data.FirstInstallTime = 1;
        if (data.FontScale === null)
            data.FontScale = 1;
        if (data.FreeDiskStorage === null)
            data.FreeDiskStorage = 1;
        if (data.LastUpdateTime === null)
            data.LastUpdateTime = 1;
        if (data.MaxMemory === null)
            data.MaxMemory = 1;
        if (data.TotalDiskCapacity === null)
            data.TotalDiskCapacity = 1;
        if (data.TotalMemory === null)
            data.TotalMemory = 1;



        for (let key in data) {
            if (data.hasOwnProperty(key)) {
                if (data.key === null)
                    data.key = 'E';
            }
        }

        return data;
    }
}

export default code;