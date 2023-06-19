const BASE_URL = "http://boetani.infinityfreeapp.com/back/api";
const IMAGE_URL = "http://boetani.infinityfreeapp.com/back/images/";

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
    // create form data
    const formData = new FormData();
    formData.append("id", question.id);
    formData.append("judul", question.judul);
    formData.append("isi", question.isi);
    formData.append("image[]", question.image);
    formData.append("id_kategori", 9);

    const options = {
      method: "POST",
      mode: "cors",
      body: formData,
    };
    const response = await fetch(`${BASE_URL}/pertanyaan?action=add`, options);
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

  async addAnswer(answer) {
    // create form data
    const formData = new FormData();
    formData.append("id_user", answer.id_user);
    formData.append("id_pertanyaan", answer.id_pertanyaan);
    formData.append("isi", answer.isi);

    const options = {
      method: "POST",
      mode: "cors",
      body: formData,
    };
    const response = await fetch(`${BASE_URL}/jawaban?action=add`, options);
    const responseJSON = await response.json();
    return responseJSON;
  },

  async getJawabanByUser(id) {
    const response = await fetch(`${BASE_URL}/jawaban/user/${id}`);
    const responseJSON = await response.json();
    return responseJSON;
  },
};

export default APIHELPER;
