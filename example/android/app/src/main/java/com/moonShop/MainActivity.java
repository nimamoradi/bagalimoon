package com.moonShop;


import com.crashlytics.android.Crashlytics;
import com.facebook.react.modules.i18nmanager.I18nUtil;

import com.reactnativenavigation.controllers.SplashActivity;


import android.os.Bundle;
import android.widget.LinearLayout;
import android.graphics.Color;

import android.widget.ImageView;

import com.microsoft.codepush.react.CodePush;
import com.reactnativenavigation.controllers.SplashActivity;

import io.fabric.sdk.android.Fabric;

public class MainActivity extends SplashActivity {


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        Fabric.with(this, new Crashlytics());
    }

    @Override
    public LinearLayout createSplashLayout() {
        I18nUtil sharedI18nUtilInstance = I18nUtil.getInstance();
        sharedI18nUtilInstance.allowRTL(getApplicationContext(), false);
        LinearLayout view = new LinearLayout(this);
        ImageView imageView1 = new ImageView(this);

        view.setBackgroundColor(Color.parseColor("#ffffff"));
        view.setOrientation(LinearLayout.VERTICAL);
        imageView1.setImageResource(R.drawable.login);

//setting image position
        imageView1.setLayoutParams(new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT,
                LinearLayout.LayoutParams.MATCH_PARENT));


        view.addView(imageView1);
        // TODO: Move this to where you establish a user session
        // logUser();

        return view;
    }

    private void logUser() {
        // TODO: Use the current user's information
        // You can call any combination of these three methods
        Crashlytics.setUserIdentifier("12345");
        Crashlytics.setUserEmail("user@fabric.io");
        Crashlytics.setUserName("Test User");
    }


}
