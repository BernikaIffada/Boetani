export default {
  index() {
    const userJSON = sessionStorage.getItem("user");
    const user = userJSON ? JSON.parse(userJSON) : null;
    console.log(user);
    return user;
  },

  async login(user = { email: "", password: "" }) {
    const response = user;

    if (response) {
      sessionStorage.setItem("user", JSON.stringify(response));
      return this.index();
    }

    return "Email or Password Invalid";
  },

  async registration(user = { fullname: "", email: "", password: "" }) {
    const respons = user;
    return respons;
  },
};
