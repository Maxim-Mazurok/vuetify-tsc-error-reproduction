// cspell:disable

import { defineComponent } from "vue";
import { VBtn } from "vuetify/components";

export default defineComponent({
  name: "App",
  render() {
    return (
      <div>
        <button onClick={() => alert("clicked button")}></button>
        <VBtn>test</VBtn>



        <VBtn variant="flat" onClick={() => alert("clicked VBtn")}></VBtn>
        <VBtn vareact="flat" onClick="so much typos"></VBtn>
      </div>
    );
  },
});
