package com.lexicon.mobility

import android.os.Bundle
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import com.swmansion.rnscreens.fragment.restoration.RNScreensFragmentFactory

class MainActivity : ReactActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        installSplashScreen()
        supportFragmentManager.fragmentFactory = RNScreensFragmentFactory()
        super.onCreate(savedInstanceState)
    }

    override fun getMainComponentName(): String = "LEXICON"

    override fun createReactActivityDelegate(): ReactActivityDelegate =
        DefaultReactActivityDelegate(this, mainComponentName, fabricEnabled)
}
