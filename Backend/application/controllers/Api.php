<?php
defined('BASEPATH') or exit('No direct script access allowed');

require APPPATH . 'libraries/RESTController.php';

class Api extends RestController
{

  function __construct()
  {
    // Construct the parent class
    parent::__construct();
    $this->load->model('M_Pertanyaan');
    $this->load->model('JawabanModel');
    $this->load->model('BalasanModel');
  }

  //   fungsi untuk hash id or dehash

  private function hashId($id)
  {
    $salt = "%45%";
    $idSalted = $salt . $id . $salt;
    return md5($idSalted);
  }

  //  method get user by id 
  private function getUserById($id)
  {
    return $this->db->get_where('user', "id=$id")->result()[0];
  }

  // method get id by hash 
  private function getIdByHash($hash)
  {
    // getting id
    $id = 0;
    while ($id >= 0) {
      if ($this->hashId($id) === $hash) {
        break;
      }
      $id++;
    }

    return $id;
  }

  // method untuk menampilkan semua pertanyaan 
  public function getAllPertanyaanResponse()
  {
    $pertanyaan = $this->M_Pertanyaan->all_pertanyaan();
    $pertanyaanIds = []; // [ { id_pertanyaan: 1 }, { id_pertanyaan: 2 } ]

    // get id pertanyaan and user name 
    foreach ($pertanyaan as $index => $p) {
      array_push($pertanyaanIds, $p->id_pertanyaan);

      //   get user
      $user = $this->getUserById($p->id);
      $p->user_name = $user->name;
      $pertanyaan[$index] = $p;
    }

    $jawaban = $this->JawabanModel->listByPertanyaanIds($pertanyaanIds); // [ { id_pertanyaan: 1, id_jawaban: 1 }, { id_pertanyaan: 2, id_jawaban: 2 } ]

    // jawaban dalam pertanyaan sesuai dengan id_pertanyaan
    foreach ($jawaban as $j) {
      foreach ($pertanyaan as $index => $p) {
        if ($j->id_pertanyaan == $p->id_pertanyaan) {
          if (property_exists($p, 'jawaban')) {
            array_push($pertanyaan[$index]->jawaban, $j);
          } else {
            $pertanyaan[$index]->jawaban = [$j];
          }

          break;
        }
      }
    }

    // overide prop jawaban dengan jumlah jawabannya
    foreach ($pertanyaan as $index => $p) {
      if (property_exists($p, 'jawaban')) {
        $answers = $p->jawaban;
        $countAnswers = count($answers);

        // overiding
        $pertanyaan[$index]->jawaban = $countAnswers;
      } else {
        $pertanyaan[$index]->jawaban = 0;
      }

      // overide id pertanyaan menjadi hash
      $pertanyaan[$index]->id_pertanyaan = $this->hashId($pertanyaan[$index]->id_pertanyaan);
    }

    // overide id pertanyaan menjadi hash


    // setting response
    $response = [
      "status" => "Success",
      "error" => "false",
      "pertanyaan" => $pertanyaan
    ];

    return $response;
  }

  // method untuk menampilkan tergantung id
  public function getDetailPertanyaanResponse($hash)
  {

    // getting id
    $id = $this->getIdByHash($hash);

    // getting pertanyan by id
    $pertanyaan = $this->M_Pertanyaan->pertanyaanById($id)[0];

    // get user
    $user = $this->getUserById($pertanyaan->id);
    $pertanyaan->user_name = $user->name;

    // getting jawaban by id_pertanyaan
    $jawabans = $this->JawabanModel->listByIdPertanyaan($id);

    // tambah properti balasan kedalam masing2 object jawaban (jika ada)
    foreach ($jawabans as $index => $jawaban) {
      $balasans = $this->BalasanModel->listByIdJawaban($jawaban->id_jawaban);

      // get user
      $user = $this->getUserById($jawaban->id);
      $jawaban->user_name = $user->name;
      $jawabans[$index] = $jawaban;




      if (count($balasans) !== 0) {
        // get user
        foreach ($balasans as $index => $balasan) {
          $user = $this->getUserById($balasan->id);
          $balasan->user_name = $user->name;
          $balasans[$index] = $balasan;
        }

        if (property_exists($jawaban, 'balasans')) {
          array_push($jawabans[$index]->$balasans, $balasans);
        } else {
          $jawaban->balasans = $balasans;
          $jawabans[$index] = $jawaban;
        }
      } else {
        $jawaban->balasans = null;
        $jawabans[$index] = $jawaban;
      }
    }


    // tambah properti jawaban kedalam pertanyaan
    if (property_exists($pertanyaan, 'jawabans')) {
      array_push($pertanyaan->jawabans, $jawabans);
    } else {
      $pertanyaan->jawabans = $jawabans;
    }
    return $this->response([
      "status" => "success",
      "error" => "false",
      "pertanyaan" => $pertanyaan,
    ], 200);
  }

  //   get pertanyaan handler
  public function pertanyaan_get()
  {
    $id = $this->get('id');

    if ($id === null) {
      $response = $this->getAllPertanyaanResponse();
      $this->response($response, 200);
    } else {
      $response = $this->getDetailPertanyaanResponse($id);
      $this->response($response, 200);
    }
  }

  //  get user handler
  public function user_get()
  {
    $id = $this->get('id');
    $user = $this->getUserById($id);

    // public
    $user = [
      "id" => $user->id,
      "name" => $user->name,
      "image" => $user->image,
      "email" => $user->email,
    ];

    $this->response(
      [
        "status" => "succes",
        "error" => "false",
        "user" => $user
      ],
      200
    );
  }

  //  post pertanyaan handler
  public function pertanyaan_post()
  {
    $query = $this->query("action");
    if ($query) {
      if ($query === "add") {
    // lakuin nambah pertanyaan
        $pertanyaan = array(
          'judul' => $this->post('judul'),
          'id_kategori' => $this->post('id_kategori'),
          'isi' => $this->post('isi'),
          'image' => $this->post('image'),
          'id_kategori' => $this->post('id_kategori')
        )
        
        $pertanyaan = $this->M_Pertanyaan->add_pertanyaan($data);
        $this->response(["status" => "oke", "message" => "Pertanyaan berhasil diposting", "action" => $query], 200);
      }/*
        else if($query === "edit"){
          // lakukin edit

          // lakuin response
        }
      */
       else {
        $this->response(["status" => "Fail", "error" => "true", "message" => "This $query action is not the 'action'"], 400);
      }
    } else {
      $this->response(["status" => "Fail", "error" => "true", "message" => "This URL and method is no action"], 400);
    }
  }

  // menghapus pertanyaan
  public function pertanyaan_delete($id) {
    $deleted = $this->M_Pertanyaan->delete_pertanyaan($id);

    if ($deleted) {
      $this->response(array('status' => 'success', 'message' => 'Pertanyaan berhasil dihapus'), 200);
    } else {
      $this->response(array('status' => 'error', 'message' => 'Postingan gagal dihapus'), 500);
    }
  }
}

/*
  done : 
    localhost/boetani/api/pertanyaan
    localhost/boetani/api/pertanyaan/id/<hash>
    localhost/boetani/api/user/id/1
    localhost/boetani/api/pertanyaan?action=add
 */
