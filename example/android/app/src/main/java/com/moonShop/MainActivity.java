package com.moonShop;

import com.facebook.react.ReactInstanceManager;
import com.facebook.react.modules.i18nmanager.I18nUtil;

import com.google.android.gms.common.GooglePlayServicesNotAvailableException;
import com.google.android.gms.common.GooglePlayServicesRepairableException;
import com.google.android.gms.security.ProviderInstaller;
import com.onesignal.OneSignal;
import com.reactnativenavigation.controllers.SplashActivity;

import android.os.Build;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.util.Log;
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

import java.io.IOException;
import java.net.InetAddress;
import java.net.ServerSocket;
import java.util.ArrayList;
import java.util.List;

import javax.net.ServerSocketFactory;
import javax.net.ssl.SSLContext;

import okhttp3.ConnectionSpec;
import okhttp3.OkHttpClient;
import okhttp3.TlsVersion;

import static com.facebook.FacebookSdk.getApplicationContext;

public class MainActivity extends SplashActivity {
//    @Override
//    public void onCreate(Bundle savedInstanceState){
//        super.onCreate(savedInstanceState);
////        ServerSocketFactory serverSocketFactory
//
//        try {
//            ProviderInstaller.installIfNeeded(getApplicationContext());
//        } catch (GooglePlayServicesRepairableException e) {
//            e.printStackTrace();
//        } catch (GooglePlayServicesNotAvailableException e) {
//            e.printStackTrace();
//        }
//    }
}
