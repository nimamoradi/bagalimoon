package com.moonShop;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.modules.i18nmanager.I18nUtil;

import com.onesignal.OneSignal;
import com.reactnativenavigation.controllers.SplashActivity;

import android.os.Bundle;
import android.view.View;
import android.widget.LinearLayout;
import android.graphics.Color;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.view.Gravity;
import android.util.TypedValue;
import android.widget.ImageView;
// 1. Import the plugin class.
import com.microsoft.codepush.react.CodePush;
import com.reactnativenavigation.controllers.SplashActivity;

import static com.facebook.FacebookSdk.getApplicationContext;

public class MainActivity extends SplashActivity {


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
        ProgressBar progressBar = new ProgressBar(this);
        progressBar.setLayoutParams(new LinearLayout.LayoutParams(LinearLayout.LayoutParams.WRAP_CONTENT,
                LinearLayout.LayoutParams.WRAP_CONTENT));


        view.addView(imageView1);
        view.addView(progressBar);
        return view;
    }

}
