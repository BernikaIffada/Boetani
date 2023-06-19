import $ from "jquery";
import APIHELPER from "../../data/api-helper";
import Auth from "../../routes/middleware";

const posting = {
  pre() {
    this.dataLoad = Auth.index();
  },
  index({ root }) {
    $("nav .menu_container a").removeClass("isActive");
    $("nav .menu_container .nav_fix a:last-of-type").addClass("isActive");
    this.pre();

    const html = `
            <div id="add_posting_page" class="bg-gray-100 min-h-screen flex items-center justify-center px-4">
        <div class="container ">
        <section class="bg-white border border-gray-300 p-4">
            <h2 class="text-lg font-semibold text-white bg-lime-950 rounded-md w-44 text-center">Ajukan Pertanyaan</h2>
            <div class="mt-4 md:flex">
            <div class="md:w-1/2 pr-4">
                <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-300 hover:bg-gray-100 dark:border-gray-300 dark:hover:border-gray-300 dark:hover:bg-gray-200">
                    <div id="dropzone_holder" class="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg xmlns="http://www.w3.org/2000/svg" width="15" height="16" viewBox="0 0 15 16" fill="none">
                            <path d="M6.42857 15.5V9.07143H0V6.92857H6.42857V0.5H8.57143V6.92857H15V9.07143H8.57143V15.5H6.42857Z" fill="#143317" />
                        </svg>
                        <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Tekan untuk tambahkan gambar</p>
                    </div>

                    <input id="dropzone-file" type="file" class="hidden" />
                </label>
            </div>
            <div class="md:w-1/2 pl-4">
                <div class="mb-4">
                <input type="text" id="judul" class="mt-1 p-2 block w-full border border-gray-300 rounded" placeholder="Masukkan Judul Pertanyaan">
                </div>
                <div class="mb-4">
                <textarea id="pertanyaan" class="mt-1 p-2 block w-full border border-gray-300 rounded" rows="3" placeholder="Ketik Pertanyaan Anda"></textarea>
                </div>
                <div class="mb-4">
                <input type="text" id="katakunci" class="mt-1 p-2 block w-full border border-gray-300 rounded" placeholder="Masukkan Kata Kunci">
                </div>
                <button id="sending_postingan" class="px-4 py-2 md:ml-4 bg-[#BA7144] text-white rounded float-right flex-shrink-0 md:w-full">Kirim</button>
            </div>
            </div>
        </section>
        </div>
    </div>
  `;

    $(root).html(html);
    // handler
    $("#dropzone-file").change(this.addFotoHandler);
    $("#add_posting_page #sending_postingan").click(this.send);
  },

  async send(ev) {
    const user = posting.dataLoad;

    ev.preventDefault();
    if (!user?.id) {
      return true;
    }

    // collecting input
    const insertOBJ = {
      judul: $("#add_posting_page input#judul").val(),
      isi: $("#add_posting_page textarea#pertanyaan").val(),
      image: posting.fileArr?.length ? posting.fileArr[0] : [],
      id: user.id,
    };

    // do send
    const response = await APIHELPER.addQuestion(insertOBJ);
    if (response.error === "true") {
      alert(response.message);
    } else {
      alert(response.message);
      window.location = `/#/questions`;
    }
  },

  addFotoHandler() {
    posting.fileArr = [...this.files];
    let validateFile;

    // validating and push file
    posting.fileArr.forEach((file) => {
      if (file?.type?.includes("image")) {
        validateFile = file;
      } else {
        alert("Must image format (jpg/jpeg/png)");
        validateFile = false;
      }
    });

    if (!validateFile) {
      return 0;
    }

    // review file
    $("label[for='dropzone-file'] > #dropzone_holder").addClass("hidden");

    const label = $("label[for='dropzone-file']");

    if ($(label).find("img").length === 0) {
      const img = document.createElement("img");
      $(img).addClass("review_images");
      img.src = URL.createObjectURL(validateFile);
      label.append(img);
    } else {
      $(label).find("img").attr("src", URL.createObjectURL(validateFile));
    }
  },
};

export default posting;
