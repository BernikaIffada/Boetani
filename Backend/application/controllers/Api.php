<?php
defined('BASEPATH') or exit('No direct script access allowed');

require APPPATH . 'libraries/RestController.php';

class Api extends RestController
{

  function __construct()
  {
    // Construct the parent class
    parent::__construct();
    $this->load->model('PertanyaanModel');
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
    $notFound = false;
    while ($id >= 0) {
      if ($this->hashId($id) === $hash) {
        break;
      }else if($id >= 99999){
       $notFound = true;
       break;
      }
      $id++;
    }

    if($notFound){
      throw new Exception("Not Found");
    }

    return $id;
  }

  // method untuk menampilkan semua pertanyaan 
  public function getAllPertanyaanResponse()
  {
    $pertanyaan = $this->PertanyaanModel->all_pertanyaan();
    $pertanyaanIds = []; // [ { id_pertanyaan: 1 }, { id_pertanyaan: 2 } ]

    // get id pertanyaan and user name 
    foreach ($pertanyaan as $index => $p) {
      array_push($pertanyaanIds, $p->id_pertanyaan);

      //   get user
      $user = $this->getUserById($p->id_user);
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
    try{
      $id = $this->getIdByHash($hash);
    }catch(Exception $e){
      return $this->response([
        "status" => "Fail",
        "error" => "true",
        "message" => "Not found",
      ], 404);
    }
    

    // getting pertanyan by id
    try{
      $pertanyaan = $this->PertanyaanModel->pertanyaanById($id)[0];
    }catch(Exception $e){
      return $this->response([
        "status" => "Fail",
        "error" => "true",
        "massege" => "Question not found",
      ], 404);
    }
    
    
    // get user
    $user = $this->getUserById($pertanyaan->id_user);
    $pertanyaan->user_name = $user->name;

    // getting jawaban by id_pertanyaan
    $jawabans = $this->JawabanModel->listByIdPertanyaan($id);

    // tambah properti balasan kedalam masing2 object jawaban (jika ada)
    foreach ($jawabans as $index => $jawaban) {
      $balasans = $this->BalasanModel->listByIdJawaban($jawaban->id_jawaban);

      // get user
      $user = $this->getUserById($jawaban->id_user);
      $jawaban->user_name = $user->name;
      $jawabans[$index] = $jawaban;




      if (count($balasans) !== 0) {
        // get user
        foreach ($balasans as $index => $balasan) {
          $user = $this->getUserById($balasan->id_user);
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
      "status" => "Success",
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
    // storing
    if ($query) {
      if ($query === "add") {
        // get body request
        $pertanyaan = $this->post("pertanyaan");

        // validating
        $wouldHave = ["judul","isi","id_user","id_kategori","image"] ;
        $isValidate = true;
        foreach ($wouldHave as $key) {
          if(!array_key_exists($key,$pertanyaan)){
            $response = [
              "data" => [
                "status" => "Fail",
                "error" => "true",
                "message" => "Object question doesn't have '$key' property"
              ],
              "statusCode" => 400
            ];
            $isValidate = false;
          }
        }
        
        // storing
        if($isValidate){
          try{
            $this->PertanyaanModel->add_pertanyaan($pertanyaan);
            $response = [
              "data" => [
                "status" => "Success",
                "error" => "false",
                "question" => $this->PertanyaanModel->newest_pertanyaan()
              ],
              "statusCode" => 201
            ];
          }catch(Exception $e){
            $response = [
              "data" => [
                "status" => "Fail",
                "error" => "true",
                "message" => "You must login or categori selected is unregisted"
              ],
              "statusCode" => 401
            ];
          }
        }
      }/*
        else if($query === "edit"){
          // lakukin edit

          // lakuin response
        }
      */
       else {
        $response = [
          "data" => [
            "status" => "Fail",
            "error" => "true",
            "message" => "This $query action is not the 'action'"
          ],
          "statusCode" => 400
        ];
      }
    } else {
      $response = [
        "data" => [
          "status" => "Fail",
          "error" => "true",
          "message" => "This URL and method is no action"
        ],
        "statusCode" => 400
      ];
    }

    // upvoting


    $this->response($response["data"], $response["statusCode"]);
  }

  // update pertanyaan handler
  public function pertanyaan_put(){
    $idHash = $this->get('id');
    $query = $this->query("action");

    if (!($idHash === null)) {
      // cek apakah hash nya berhasil di convert tidak 
      // jika ditemukan maka lanjutkan
      try{
        $id = $this->getIdByHash($idHash);
        if($query){
          if($query === "upvote"){
            
            $response = [
              "data" => [
                "status" => "Success",
                "error" => "false",
                "message" => "This is upvote action"
              ],
              "statusCode" => 200
            ];
          }else if($query === "downvote"){

            $response = [
              "data" => [
                "status" => "Success",
                "error" => "false",
                "message" => "This is downvote action"
              ],
              "statusCode" => 200
            ];
          }else{
            $response = [
              "data" => [
                "status" => "Fail",
                "error" => "true",
                "message" => "This $query action is not the 'action'"
              ],
              "statusCode" => 400
            ];
          }
        }else{
          $response = [
            "data" => [
              "status" => "Fail",
              "error" => "true",
              "message" => "This URL and method is no action"
            ],
            "statusCode" => 400
          ];
        }
      }
        // jika tidak jalankan ini
      catch(Exception $e){
        $response = [
          "data" => [
            "status" => "Fail",
            "error" => "true",
            "message" => "Id not found"
          ],
          "statusCode" => 404
        ];
      }
    } else {
      $response = [
        "data" => [
          "status" => "Fail",
          "error" => "true",
          "message" => "Not have id"
        ],
        "statusCode" => 400
      ];
    }

    $this->response($response["data"], $response["statusCode"]);
  }


}

/*
  done : 
    localhost/boetani/api/pertanyaan
    localhost/boetani/api/pertanyaan/id/<hash> (get)
    localhost/boetani/api/user/id/1
    localhost/boetani/api/pertanyaan/id/<hash>?action=upvote
    localhost/boetani/api/pertanyaan?action=add
 */
