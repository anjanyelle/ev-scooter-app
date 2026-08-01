package com.lexicon.mobility

import android.app.Notification
import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.Context
import android.graphics.Color
import android.os.Build
import com.facebook.react.bridge.Promise
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class LexiconNotificationsModule(
    private val reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {
    override fun getName(): String = "LexiconNotifications"

    @ReactMethod
    fun createChannels(promise: Promise) {
        try {
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
                val manager = reactContext.getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager

                val vehicleAlerts = NotificationChannel(
                    "vehicle-alerts",
                    "Vehicle security alerts",
                    NotificationManager.IMPORTANCE_HIGH
                ).apply {
                    description = "Security and vehicle-state alerts"
                    enableVibration(true)
                    vibrationPattern = longArrayOf(0, 250, 180, 250)
                    enableLights(true)
                    lightColor = Color.rgb(184, 220, 0)
                    lockscreenVisibility = Notification.VISIBILITY_PRIVATE
                }

                val chargingUpdates = NotificationChannel(
                    "charging-updates",
                    "Charging updates",
                    NotificationManager.IMPORTANCE_DEFAULT
                ).apply {
                    description = "Charging progress and completion updates"
                    enableLights(true)
                    lightColor = Color.rgb(184, 220, 0)
                    lockscreenVisibility = Notification.VISIBILITY_PRIVATE
                }

                val serviceReminders = NotificationChannel(
                    "service-reminders",
                    "Service reminders",
                    NotificationManager.IMPORTANCE_DEFAULT
                ).apply {
                    description = "Scheduled maintenance and service reminders"
                    enableLights(true)
                    lightColor = Color.rgb(184, 220, 0)
                }

                manager.createNotificationChannels(
                    listOf(vehicleAlerts, chargingUpdates, serviceReminders)
                )
            }
            promise.resolve(null)
        } catch (error: Exception) {
            promise.reject("LEXICON_NOTIFICATION_CHANNELS", error)
        }
    }
}
