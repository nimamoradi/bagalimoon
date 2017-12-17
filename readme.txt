for android apk :
I deleted the index.android.* files in android/app/src/main/assets/ directory. Then in the project root, ran
{{react-native bundle --platform android --dev false --entry-file index.android.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res}}
Then I regenerated the signed APK and voila!

to update app

npm i -g npm-check-updates
npm-check-updates -u
npm install

//a bug is wix add this to lightbox class

  public void destroy() {
        // content.unmountReactView();
        dismiss();
    }
