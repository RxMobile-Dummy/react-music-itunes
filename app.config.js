const IS_DEV = process.env.APP_VARIANT === "development";

export default {
  name: IS_DEV ? "Muzik (Dev)" : "Muzik",
  slug: "Muzik",
  ios: {
    bundleIdentifier: IS_DEV ? "com.muzik.in.dev" : "com.muzik.in",
  },
  android: {
    package: IS_DEV ? "com.muzik.in.dev" : "com.muzik.in",
  },
};
