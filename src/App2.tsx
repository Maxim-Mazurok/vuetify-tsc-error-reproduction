// cspell:disable

import { defineComponent } from "vue";
import { VBtn } from "vuetify/components";

export default defineComponent({
  name: "App",
  render() {
    return (
      <div>
        <button onClick={() => alert("clicked button")}></button>

        {/* Vuetify doesn't say to TS that VBtn is supposed to have $children (inner content) - invalid error */}
        <VBtn>test</VBtn>

        {/* Vuetify doesn't say to TS that VBtn is supposed to have onClick - invalid error */}
        <VBtn variant="flat" onClick={() => alert("clicked VBtn")}></VBtn>

        {/* vareact is unknown prop - valid error */}
        <VBtn vareact="flat"></VBtn>
      </div>
    );
  },
});
