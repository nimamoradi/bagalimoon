package com.moonShop;

import com.facebook.react.modules.i18nmanager.I18nUtil;
import com.reactnativenavigation.controllers.SplashActivity;

import android.view.View;
import android.widget.LinearLayout;
import android.graphics.Color;
import android.widget.TextView;
import android.view.Gravity;
import android.util.TypedValue;
import android.widget.ImageView;

import com.reactnativenavigation.controllers.SplashActivity;

public class MainActivity extends SplashActivity {
//    @Override
//    public void onCreate() {
//        super.onCreate();
//
//        // FORCE LTR
//
//
//    }

    @Override
    public LinearLayout createSplashLayout() {
        I18nUtil sharedI18nUtilInstance = I18nUtil.getInstance();
        sharedI18nUtilInstance.allowRTL(getApplicationContext(), false);
        LinearLayout view = new LinearLayout(this);
        ImageView imageView1 = new ImageView(this);
        ImageView imageView2 = new ImageView(this);
        ImageView imageView3 = new ImageView(this);
        view.setBackgroundColor(Color.parseColor("#ffffff"));
        view.setOrientation(LinearLayout.VERTICAL);
        imageView1.setImageResource(R.drawable.login);

//setting image position
        imageView1.setLayoutParams(new LinearLayout.LayoutParams(LinearLayout.LayoutParams.MATCH_PARENT,
                LinearLayout.LayoutParams.MATCH_PARENT));


        view.addView(imageView1);

        return view;
    }

}
