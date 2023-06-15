const BASE_URL = "http://localhost:8000/boetani/Backend/api";
const IMAGE_URL = "http://localhost:8000/boetani/Backend/images/";

const APIHELPER = {
  async getAllQuestions() {
    const response = await fetch(`${BASE_URL}/pertanyaan`);
    const responseJSON = await response.json();
    return responseJSON;
  },

  async getDetailQuestion(hash) {
    const response = await fetch(`${BASE_URL}/pertanyaan/id/${hash}`);
    const responseJSON = await response.json();
    return responseJSON;
  },

  async addQuestion(question) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(question),
    };
    const response = await fetch(`${BASE_URL}/endpoint?action="add"`, options);
    const responseJSON = await response.json();
    return responseJSON;
  },

  async login(data) {
    // create form data
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);

    const options = {
      method: "POST",
      mode: "cors",
      body: formData,
    };
    const response = await fetch(`${BASE_URL}/login`, options);
    const responseJSON = await response.json();
    return responseJSON;
  },

  async register(data) {
    // create form data
    const formData = new FormData();
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("name", data.fullname);

    const options = {
      method: "POST",
      mode: "cors",
      body: formData,
    };
    const response = await fetch(`${BASE_URL}/register`, options);
    const responseJSON = await response.json();
    return responseJSON;
  },

  async getQuestionByUser(id) {
    const response = await fetch(`${BASE_URL}/pertanyaan/user/${id}`);
    const responseJSON = await response.json();
    return responseJSON;
  },

  async getUser(id) {
    const response = await fetch(`${BASE_URL}/user/id/${id}`);
    const responseJSON = await response.json();
    return responseJSON;
  },

  async editProfile(data) {
    // create form data
    const formData = new FormData();
    formData.append("id", data.id);
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("image[]", data.image);

    const options = {
      method: "POST",
      mode: "cors",
      body: formData,
    };
    const response = await fetch(`${BASE_URL}/profile?action=edit`, options);
    const responseJSON = await response.json();
    return responseJSON;
  },

  getImagePath(filename) {
    if (filename) {
      return `${IMAGE_URL}${filename}`;
    }
    return null;
  },
};

export default APIHELPER;
