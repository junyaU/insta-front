import Vue from "vue";

import AppHeader from "~/components/layouts/Header.vue";
import TextArea from "~/components/ui/TextArea.vue";
import SubmitButton from "~/components/ui/SubmitButton.vue";
import InputComponent from "~/components/ui/InputText.vue";

Vue.mixin({
  components:{
    AppHeader,
    TextArea,
    SubmitButton,
    InputComponent
  }
})
