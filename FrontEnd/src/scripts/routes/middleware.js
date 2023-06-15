import APIHELPER from "../data/api-helper";
export default {
  index() {
    const userJSON = localStorage.getItem("user");
    const user = userJSON ? JSON.parse(userJSON) : null;
    return user;
  },

  async login(user = { email: "", password: "" }) {
    const response = await APIHELPER.login(user);
    if (response.data) {
      const HOUR_12 = 60 * 60 * 1000 * 12;
      const expired = Date.now() + HOUR_12;
      const data = {
        expired: expired,
        ...response.data,
      };
      localStorage.setItem("user", JSON.stringify(data));
      return this.index();
    }
  },

  async registration(user = { fullname: "", email: "", password: "" }) {
    const response = await APIHELPER.register(user);
    if (response.status === "success") {
      return {
        error: "false",
        msg: response.message,
      };
    }
    return {
      error: "true",
      msg: "Email telah digunakan",
    };
  },
};
