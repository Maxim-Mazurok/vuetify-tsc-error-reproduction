// cspell:disable

// import { ButtonHTMLAttributes, DefineComponent, defineComponent } from "vue";
import { VBtn, VBtnToggle } from "vuetify/components";

// const WWBtn = defineComponent({
//   name: "WWBtn",
//   render() {
//     return <VBtn tag="button">{this.$children}</VBtn>;
//   },
// }) as typeof VBtn & DefineComponent<ButtonHTMLAttributes>;

// export default defineComponent({
//   name: "App",
//   render() {
//     return (
//       <div>
//         <h1>App</h1>
//         <WWBtn>testing </WWBtn>
//       </div>
//     );
//   },
// });

import { ButtonHTMLAttributes, DefineComponent, defineComponent } from "vue";

const ButtonWrapper = defineComponent({
  name: "ButtonWrapper",
  render() {
    return <VBtn {...this.$attrs} v-slots={this.$slots} tag="button" />;
  },
  inheritAttrs: false,
}) as typeof VBtn & DefineComponent<ButtonHTMLAttributes>;

export default defineComponent({
  name: "App",
  render() {
    return (
      <div>
        <h1>App</h1>
        <ButtonWrapper tag="a">testing 1</ButtonWrapper>
        <ButtonWrapper variant="flat">testing 2</ButtonWrapper>
      </div>
    );
  },
});
