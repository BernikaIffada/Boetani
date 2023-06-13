const BASE_URL = "";

const APIHELPER = {
  async getAllQuestions() {
    const response = await fetch(`${BASE_URL}/endpoint`);
    const responseJSON = await response.json();
    return responseJSON;
  },

  async getDetailQuestion(hash) {
    const response = await fetch(`${BASE_URL}/endpoint/${hash}`);
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
};
