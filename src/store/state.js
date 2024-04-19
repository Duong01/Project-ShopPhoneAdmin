export default function state() {
  return {
    empInfor: {
      id: "",
      email: "",
      fullname: "",
      dob: "",
      password: "",
      role_id: "",
      status: "",
      address: "",
    },
    curi18n: {
      curElLang: "", // current Lang i18n for Element plus
      curLang: "", //current lang i18n for system
    },
    isLoading: false, // show loading icon full screen when call api
  };
}
