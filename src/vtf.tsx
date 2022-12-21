/* eslint-disable vue/multi-word-component-names */
import { type ButtonHTMLAttributes, type DefineComponent, defineComponent } from "vue";
import { VBtn } from "vuetify/components";

export const Button = defineComponent({
  name: "Button",
  render() {
    return <VBtn {...this.$attrs} v-slots={this.$slots} tag="button" />;
  },
  inheritAttrs: false,
}) as typeof VBtn & DefineComponent<ButtonHTMLAttributes>;
