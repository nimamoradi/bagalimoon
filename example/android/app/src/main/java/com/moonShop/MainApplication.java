package com.moonShop;

import android.support.annotation.Nullable;
import com.airbnb.android.react.maps.MapsPackage;

import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;

import com.microsoft.appcenter.reactnative.analytics.AppCenterReactNativeAnalyticsPackage;
import com.microsoft.appcenter.reactnative.appcenter.AppCenterReactNativePackage;
import com.microsoft.appcenter.reactnative.crashes.AppCenterReactNativeCrashesPackage;
import com.microsoft.appcenter.reactnative.crashes.BuildConfig;
import com.oblador.vectoricons.VectorIconsPackage;

import com.microsoft.codepush.react.CodePush;

//import com.slowpath.hockeyapp.RNHockeyAppModule; // <--- import
import com.onesignal.OneSignal;
import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.bridge.NavigationReactPackage;
import com.slowpath.hockeyapp.RNHockeyAppPackage;  // <--- import

import com.facebook.soloader.SoLoader;
import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {
    @Override
    public boolean isDebug() {
        return BuildConfig.DEBUG;
    }
    // MainApplication class
    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, /* native exopackage */ false);
        OneSignal.startInit(this)
                .inFocusDisplaying(OneSignal.OSInFocusDisplayOption.Notification)
                .unsubscribeWhenNotificationsAreDisabled(true)
                .init();

        // Call syncHashedEmail anywhere in your app if you have the user's email.
        // This improves the effectiveness of OneSignal's "best-time" notification scheduling feature.
        // OneSignal.syncHashedEmail(userEmail);
    }



    @Nullable
    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return Arrays.<ReactPackage>asList(
                new MainReactPackage(),
            new AppCenterReactNativeCrashesPackage(MainApplication.this, getResources().getString(R.string.appcenterCrashes_whenToSendCrashes)),
            new AppCenterReactNativeAnalyticsPackage(MainApplication.this, getResources().getString(R.string.appcenterAnalytics_whenToEnableAnalytics)),
            new AppCenterReactNativePackage(MainApplication.this),
            new RNHockeyAppPackage(this),

            new CodePush(getResources().getString(R.string.reactNativeCodePush_androidDeploymentKey),this, BuildConfig.DEBUG),
            new VectorIconsPackage(),
            new NavigationReactPackage(),
            new MapsPackage()


        );
    }

}
