import postcssRTLCSS from 'postcss-rtlcss';

export default {
  plugins: [
    postcssRTLCSS({
      mode: 'combined',
      ltrPrefix: '[dir="ltr"]',
      rtlPrefix: '[dir="rtl"]',
      safeBothPrefix: true
    })
  ]
};
