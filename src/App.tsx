import { defineComponent } from "vue";
import { VBtn } from "vuetify/components";

export default defineComponent({
  name: "App",
  render() {
    return (
      <div>
        <VBtn>test</VBtn>
        <VBtn color="red" onClick={() => alert("clicked test2")}></VBtn>
      </div>
    );
  },
});
