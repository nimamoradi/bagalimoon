class code {
    static serverAddress = 'http://10.0.2.2/superserver/public';
    static imageAddress = 'http://10.0.2.2/superserver/public/';

    //other relevant code here

    static getServerAddress() {
        return this.serverAddress;
    }

    static showLightBox(screen, passProps, this_class) {
        this_class.props.navigator.showLightBox({
            screen: screen,
            passProps: passProps,
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
}

export default code;