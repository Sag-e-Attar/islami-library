import DefaultTheme from "vitepress/theme";
import Layout from "./Layout.vue";
import AudioPlayer from "./components/AudioPlayer.vue";
import BackToTopButton from "@miletorix/vitepress-back-to-top-button";
import "uno.css";
import "./custom.css";
import "@miletorix/vitepress-back-to-top-button/style.css";

export default {
  ...DefaultTheme,
  Layout: Layout,
  enhanceApp({ app }) {
    app.component("AudioPlayer", AudioPlayer);
    BackToTopButton(app, {
      progressColor: "#10b983", // emerald color to match your theme
    });
  },
};
