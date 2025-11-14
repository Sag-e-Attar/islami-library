import DefaultTheme from "vitepress/theme";
import Layout from "./Layout.vue";
import AudioPlayer from "./components/AudioPlayer.vue";
import BackToTopButton from "@miletorix/vitepress-back-to-top-button";
import "uno.css";
import "./rainbow.css";
import "./custom.css";
import "@miletorix/vitepress-back-to-top-button/style.css";
import { watch } from "vue";

let homePageStyle: HTMLStyleElement | undefined;

export default {
  ...DefaultTheme,
  Layout: Layout,
  enhanceApp({ app, router }) {
    app.component("AudioPlayer", AudioPlayer);
    BackToTopButton(app, {
      progressColor: "#10b983", // emerald color to match your theme
    });

    if (typeof window === 'undefined')
      return

    watch(
      () => router.route.data.relativePath,
      () => updateHomePageStyle(location.pathname === '/'),
      { immediate: true },
    )
  },
};

// Speed up the rainbow animation on home page (similar to UnoCSS)
function updateHomePageStyle(value: boolean) {
  if (value) {
    if (homePageStyle)
      return

    homePageStyle = document.createElement('style')
    homePageStyle.innerHTML = `
    :root {
      animation: rainbow 40s linear infinite;
    }`
    document.head.appendChild(homePageStyle)
    document.documentElement.classList.add('rainbow')
  }
  else {
    if (!homePageStyle)
      return

    homePageStyle.remove()
    homePageStyle = undefined
    document.documentElement.classList.remove('rainbow')
  }
}
