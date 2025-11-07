import DefaultTheme from "vitepress/theme";
import Layout from "./Layout.vue";
import AudioPlayer from "./components/AudioPlayer.vue";
import "uno.css";
import "./custom.css";

export default {
  ...DefaultTheme,
  Layout: Layout,
  enhanceApp({ app }) {
    app.component("AudioPlayer", AudioPlayer);
  },
};
