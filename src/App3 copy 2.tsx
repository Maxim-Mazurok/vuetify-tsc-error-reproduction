// cspell:disable

import vue, { type ButtonHTMLAttributes, defineComponent } from "vue";
import { VBtn } from "vuetify/components";

// We're reclaring a new variable (component)
const WWBtn
// assigning it to a VBtn (the original Vuetify component), so it'll behave exactly the same in runtime
= VBtn
// we're saying "forget all the typing it had, we will specify them manually"
as
// this will be a huge interface from the original VBtn
typeof VBtn
// this means to combine/extend interfaces, so `{bla: number} & {qwe: string}` will be `{bla: number; qwe: string}`
&
// here we're creating a Vue component interface, using `ButtonHTMLAttributes` as props
vue.DefineComponent<ButtonHTMLAttributes>;

export default defineComponent({
  name: "App",
  render() {
    return (
      <div>
        <button onClick={() => alert("clicked button")}></button>
        <WWBtn>test</WWBtn>

        {/* TS knows that onClick prop from ButtonHTML is supposed to be a function */}
        <WWBtn onClick="so much typos"></WWBtn>

        {/* It also knows that prop vareact doesn't belong to either VBtn, nor regular <button> so it must be a mistake */}
        <WWBtn vareact="flat"></WWBtn>

        {/* Furthermore, it knows that this function accepts payload of type MouseEvent even though we didn't specify that in the handler explicitly */}


        <WWBtn variant="flat" onClick={alert("clicked WWBtn")}></WWBtn>
      </div>
    );
  },
});
