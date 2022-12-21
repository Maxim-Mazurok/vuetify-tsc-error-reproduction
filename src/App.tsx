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
import { WBtn, WBtn2 } from "./vuetify";
// import { GroupProvide } from 'vuetify/lib/components/index';

export const ButtonWrapper = defineComponent({
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
        <ButtonWrapper tag="a" variant="flat" onClick={() => alert("1")}>
          testing 1
        </ButtonWrapper>
        <WBtn tag="a" variant="flat" onClick={() => alert("2")}>
          testing 2
        </WBtn>
        <WBtn2 tag="a" variant="flat" onClick={() => alert("3")}>
          testing 3
        </WBtn2>
      </div>
    );
  },
});
