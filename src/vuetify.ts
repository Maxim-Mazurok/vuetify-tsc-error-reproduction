import type { ButtonHTMLAttributes, DefineComponent } from "vue";
import components from "vuetify/components";

const VBtn = components.VBtn as typeof components.VBtn &
  DefineComponent<ButtonHTMLAttributes>;
