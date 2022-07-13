import "dotenv/config";
const IS_DEV = process.env.APP_VARIANT === "development";

export default {
  name: IS_DEV ? "Muzik (Dev)" : "Muzik",
  slug: "Muzik",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/app_icon.png",
  userInterfaceStyle: "light",
  ios: {
    bundleIdentifier: IS_DEV ? "com.muzik.in.dev" : "com.muzik.in",
    supportsTablet: true,
    buildNumber: "1.0.0",
  },
  android: {
    package: IS_DEV ? "com.muzik.in.dev" : "com.muzik.in",
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#FFFFFF",
    },
    versionCode: 1,
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  assetBundlePatterns: ["**/*"],
  web: {
    favicon: "./assets/favicon.png",
  },
  extra: {
    firebaseApiKey: process.env.FIREBASE_API_KEY,
    firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
    firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
    firebaseStorageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    firebaseMessagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    firebaseAppId: process.env.FIREBASE_APP_ID,
  },
};
