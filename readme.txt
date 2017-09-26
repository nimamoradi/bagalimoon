for android apk :
I deleted the index.android.* files in android/app/src/main/assets/ directory. Then in the project root, ran
{{react-native bundle --platform android --dev false --entry-file index.android.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res}}
Then I regenerated the signed APK and voila!