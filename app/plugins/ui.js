import Vue from "vue";

import AppHeader from "~/components/layouts/Header.vue";
import TextArea from "~/components/ui/TextArea.vue";
import SubmitButton from "~/components/ui/SubmitButton.vue";
import InputComponent from "~/components/ui/InputText.vue";
import InputPhoto from "~/components/ui/InputPhoto.vue";
import EditProfile from "~/components/pages/editProfile.vue";
import ChangePassword from "~/components/pages/changePassword.vue";
import Logout from "~/components/pages/logout.vue";
import CommentArea from "~/components/ui/commentArea.vue";
import CommentModal from "~/components/ui/commentModal.vue";

Vue.mixin({
  components:{
    AppHeader,
    TextArea,
    SubmitButton,
    InputComponent,
    InputPhoto,
    EditProfile,
    ChangePassword,
    Logout,
    CommentArea,
    CommentModal

  }
})
