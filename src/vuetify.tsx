import { defineComponent, type DefineComponent, type IntrinsicElementAttributes } from "vue";
import VuetifyComponents from "vuetify/components";

/**
 * To use new Vuetify component (VAnotherComponent, for example):
 *  1. Add its name to `type VuetifyComponentsToDefine`, like so: `type VuetifyComponentsToDefine = Extends<keyof typeof VuetifyComponents, "VBtn" | "VCard" | "VAnotherComponent">;`
 *  2. Check default tag prop of that component in Vuetify documentation link looks like this: https://next.vuetifyjs.com/en/api/v-another-component/#props-tag
 *  3. Declare the new component like so: `export const WAnotherComponent = defineComponentWithTag("VAnotherComponent", "div");`
 */

/**
 * If you wish to use a Vuetify component not on the list - add it here.
 * You might get errors saying something like `Exported variable 'WBtn' has or is using name 'GroupProvide' from external module "bla/node_modules/vuetify/lib/components/index" but cannot be named.`,
 * in that case you need to edit `node_modules/vuetify/lib/components/index.d.ts` and export the interface from the error message, `GroupProvide` in this case. Then run `npx patch-package vuetify` to update the patch. Ensure that you keep comments on top of the patch file, check git diff.
 * This is an attempt for optimization to speed up declarations generation, not sure if it actually helps tho.
 * Also this lets us avoid some repetition, we can import all Vuetify components in one go and don't get a ton of errors mentioned above.
 */
type VuetifyComponentsToDefine = Extends<keyof typeof VuetifyComponents, "VBtn" | "VCard">;
// prettier-ignore // to keep the last code line that is explained intact
/**
 * Used to convert Vuetify components into components with better type safety.
 * It creates a wrapper over the original VBtn component that comes from Vuetify.
 * The goal is to make it behave exactly the same during the runtime as the original one, while providing better type safety during development.
 *
 * This helps us in a following ways:
 *   - We don't have to rely on `vue-tsc` patching jsx.d.ts on the fly and allowing unknown props, see https://github.com/vuetifyjs/vuetify/issues/16190#issuecomment-1333087978
 *   - We get better type safety by disabling that patching and banning unknown props
 *   - We can use `vueCompilerOptions.strictTemplates: true`
 *   - We can catch common mistakes, such as passing result of function call instead of a function itself: `onClick={alert("clicked WWBtn")}`
 *   - We can catch common mistakes, such as using wrong props `option="flat"` vs `variant="flat"`
 *   - Maintains all the features of the default approach (type safety, autocomplete in IDE and runtime features)
 *
 * NOTE: To better understand types and/or debug:
 *   - set `noErrorTruncation: true` in `compilerOptions` section of tsconfig.json
 *   - use [kimuson.ts-type-expand](https://marketplace.visualstudio.com/items?itemName=kimuson.ts-type-expand) VS Code extension
 *
 * This used to have some serious performance issues, probably because it needed to generate too many combinations for type declarations for every native element, not sure, but optimized versions seems to work fine.
 */
const defineComponentWithTag = <T extends keyof IntrinsicElementAttributes>(
  vuetifyComponentName: VuetifyComponentsToDefine, // "VBtn", "VCard", etc.
  tagName: T // "div", "button", etc. Learn more about Generics: https://www.typescriptlang.org/docs/handbook/2/generics.html
) => {
  const VuetifyComponent = VuetifyComponents[vuetifyComponentName];
  // const tag = defaultTags[vuetifyComponentName];
  return defineComponent({
    name: vuetifyComponentName.replace(/^V/, "W"), // rename VBtn to WBtn, etc.
    render() {
      return (
        <VuetifyComponent
          {...this.$attrs} // passthrough (hopefully) all the props/listeners/etc., see https://vuejs.org/guide/components/attrs.html
          v-slots={this.$slots} // passthrough (hopefully) all slots (named/scoped/default), see https://github.com/vuejs/babel-plugin-jsx#slot
          tag={tagName} // this is important because we're forcing TS into thinking that, for example, VBtn will also accept props from native <button>, see https://next.vuetifyjs.com/en/api/v-btn/#props-tag
        />
      );
    },
    inheritAttrs: false, // without this one, `tag=button` prop override doesn't seem to work, not entirely sure why or what are implications, check out https://vuejs.org/guide/components/attrs.html#disabling-attribute-inheritance
    /*
           ╔═[ we're saying "forget all the typings this component had or inferred, we will specify/override them manually/forcefully" ]
           ║
           ║                  ╔═[ this will be a huge interface from the original VBtn ]
           ║                  ║
           ║                  ║            ╔═[ this combines/extends interfaces, so `{bla: number} & {qwe: string}` will be `{bla: number; qwe: string}` ]
           ║                  ║            ║
           ║                  ║            ║                      ╔═[ creating a Vue component interface, using native HTML element attributes as props, essentially creating type of the native <button> ]
           ║                  ║            ║                      ║
    ╔══════╩══════╗╔══════════╩══════════╗╔╩╗╔════════════════════╩═══════════════════════╗ */
  }) as unknown as typeof VuetifyComponent & DefineComponent<IntrinsicElementAttributes[T]>;
};

export const WBtn = defineComponentWithTag("VBtn", "button");
export const WCard = defineComponentWithTag("VCard", "div");

type Extends<T, U extends T> = U;

// // prettier-ignore
// /**
//  * Create WBtn component, which is kinda wrapper over the original VBtn component that comes from Vuetify.
//  * The goal is to make it behave exactly the same during the runtime as the original one, while providing better type safety during development.
//  *
//  * This helps us in a following ways:
//  *   - We don't have to rely on `vue-tsc` patching jsx.d.ts on the fly and allowing unknown props, see https://github.com/vuetifyjs/vuetify/issues/16190#issuecomment-1333087978
//  *   - We get better type safety by disabling that patching and banning unknown props
//  *   - We can use `vueCompilerOptions.strictTemplates: true`
//  *   - We can catch common mistakes, such as passing result of function call instead of a function itself: `onClick={alert("clicked WWBtn")}`
//  *   - We can catch common mistakes, such as using wrong props `option="flat"` vs `variant="flat"`
//  *   - Maintains all the features of the default approach (type safety, autocomplete in IDE and runtime features)
//  *
//  * NOTE: To better understand types and/or debug:
//  *   - set `noErrorTruncation: true` in `compilerOptions` section of tsconfig.json
//  *   - use [kimuson.ts-type-expand](https://marketplace.visualstudio.com/items?itemName=kimuson.ts-type-expand) VS Code extension
//  */
// const VBtnDefaultTag = "button"; // from https://next.vuetifyjs.com/en/api/v-btn/#props-tag
// export const WBtn = defineComponent({
//   name: "WBtn",
//   render() {
//     return (
//       <VBtn
//         {...this.$attrs} // passthrough (hopefully) all the props/listeners/etc., see https://vuejs.org/guide/components/attrs.html
//         v-slots={this.$slots} // passthrough (hopefully) all slots (named/scoped/default), see https://github.com/vuejs/babel-plugin-jsx#slot
//         tag={VBtnDefaultTag} // this is important because we're forcing TS into thinking that VBtn will also accept props from native <button>, see https://next.vuetifyjs.com/en/api/v-btn/#props-tag
//       />
//     );
//   },
//   inheritAttrs: false, // without this one, `tag=button` prop override doesn't seem to work, not entirely sure why or what are implications, check out https://vuejs.org/guide/components/attrs.html#disabling-attribute-inheritance
//   /*
//    ╔═[ we're saying "forget all the typings this component had or inferred, we will specify/override them manually/forcefully" ]
//    ║
//    ║                ╔═[ this will be a huge interface from the original VBtn ]
//    ║                ║
//    ║                ║               ╔═[ this combines/extends interfaces, so `{bla: number} & {qwe: string}` will be `{bla: number; qwe: string}` ]
//    ║                ║               ║
//    ║                ║               ║                        ╔═[ creating a Vue component interface, using `ButtonHTMLAttributes` as props, essentially creating type of the native <button> ]
//    ║                ║               ║                        ║
//   ╔╩═╗╔═════════════╩═════════════╗╔╩╗╔══════════════════════╩════════════════════════╗ */
// }) as typeof VBtn & DefineComponent<IntrinsicElementAttributes[typeof VBtnDefaultTag]>;

// const VCardDefaultTag = "div"; // from https://next.vuetifyjs.com/en/api/v-card/#props-tag
// export const WCard = defineComponent({
//   name: "WCard",
//   render() {
//     return <VCard {...this.$attrs} v-slots={this.$slots} tag={VCardDefaultTag} />;
//   },
//   inheritAttrs: false,
// }) as typeof VCard & DefineComponent<IntrinsicElementAttributes[typeof VCardDefaultTag]>;
