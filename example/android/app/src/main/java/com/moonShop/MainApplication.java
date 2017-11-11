package com.moonShop;

import android.support.annotation.Nullable;
import com.airbnb.android.react.maps.MapsPackage;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.reactnativenavigation.NavigationApplication;
import com.reactnativenavigation.bridge.NavigationReactPackage;


import com.slowpath.hockeyapp.RNHockeyAppModule; // <--- import
import com.slowpath.hockeyapp.RNHockeyAppPackage;  // <--- import


import java.util.Arrays;
import java.util.List;

public class MainApplication extends NavigationApplication {
    @Override
    public boolean isDebug() {
        return BuildConfig.DEBUG;
    }

    @Nullable
    @Override
    public List<ReactPackage> createAdditionalReactPackages() {
        return Arrays.<ReactPackage>asList(
                new MainReactPackage(),
                 new RNHockeyAppPackage(MainApplication.this),
            new VectorIconsPackage(),
            new NavigationReactPackage(),
            new MapsPackage()

        );
    }

}
