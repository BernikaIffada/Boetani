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
    $this->load->model('User');
  }

  // fungsi untuk memformat tanggal
  private function dateFormat($date){
    $explodeDate = explode("-",$date);
    $year= $explodeDate[0];
    $month = (int)$explodeDate[1];
    $d = $explodeDate[2];
    
    $monthList = [" ","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

    return "$d $monthList[$month] $year";
  }

  //   fungsi untuk hash id 
  private function hashId($id)
  {
    $salt = "%45%";
    $idSalted = $salt . $id . $salt;
    return md5($idSalted);
  }

  //  method get user by id 
  private function getUserById($id)
  {
    $user = $this->db->get_where('user', "id = $id")->result_object();

  
    if(count($user)<=0){
      return [];
    }else{
      return $user;
    }
  }

  // method get kategori by id

  private function getKategoriById($id){
    return $this->db->get_where("kategori", "id_kategori = $id")->result()[0];
  }

  // method untuk menampilkan semua pertanyaan 
  public function getAllPertanyaanResponse()
  {
    $pertanyaan = $this->PertanyaanModel->all_pertanyaan();

    if(count($pertanyaan)<=0){
      return [
        "status" => "Success",
        "error" => "false",
        "pertanyaan" => []
      ];
    }

    // get jawaban and user name  and kategori name
    foreach ($pertanyaan as $index => $p) {
      //   get user
      $user = $this->getUserById($p->id)[0];
      $p->user_name = $user->name;
      $pertanyaan[$index] = $p;

      // get kategori
      $kategori = $this->getKategoriById($p->id_kategori);
      $p->kategori = [$kategori -> nama_kategori];
      $pertanyaan[$index] = $p;

      // get jumlah jawaban
      $pertanyaan[$index]->jawaban = count($this->JawabanModel->jawabanByPertanyaanId($p->id_pertanyaan));

      // overide tanggal
      $pertanyaan[$index]->created_at = $this->dateFormat($p->created_at);
      $pertanyaan[$index]->updated_at = $this->dateFormat($p->updated_at);
    }

    

    // setting response
    $response = [
      "status" => "Success",
      "error" => "false",
      "pertanyaan" => $pertanyaan
    ];

    return $response;
  }

  // method untuk menampilkan tergantung id
  public function getDetailPertanyaanResponse($id)
  {

    // getting pertanyan by id
    $pertanyaan = $this->PertanyaanModel->pertanyaanById($id);

    if(!count($pertanyaan)){
      $this->response([
        "status" => "Fail",
        "error" => "true",
        "message" => "Question not found",
      ], 404);
    }

    $pertanyaan = $pertanyaan[0];

    // overide date
    $pertanyaan->created_at =  $this->dateFormat($pertanyaan->created_at);
    $pertanyaan->updated_at =  $this->dateFormat($pertanyaan->updated_at);


    // get user
    $user = $this->getUserById($pertanyaan->id)[0];
    $pertanyaan->user_name = $user->name;

    // getting jawaban by id_pertanyaan
    $jawabans = $this->JawabanModel->jawabanByPertanyaanId($id);

    // tambah properti balasan kedalam masing2 object jawaban (jika ada)
    foreach ($jawabans as $index => $jawaban) {
      $balasans = $this->BalasanModel->listByIdJawaban($jawaban->id_jawaban);
     
      // get user
      $user = $this->getUserById($jawaban->id)[0];
      $jawaban->user_name = $user->name;
      $jawabans[$index] = $jawaban;

      // overide date
      $jawabans[$index]->created_at =  $this->dateFormat($jawaban->created_at);
      $jawabans[$index]->updated_at =  $this->dateFormat($jawaban->updated_at);



      if (count($balasans) !== 0) {
        // get user
        foreach ($balasans as $ib => $balasan) {
          $user = $this->getUserById($balasan->id)[0];
          $balasan->user_name = $user->name;
          $balasans[$ib] = $balasan;
        }

        if (property_exists($jawaban, 'balasans')) {
          array_push($jawabans[$index]->$balasans, $balasans);
        } else {
          $jawaban->balasans = $balasans;
          $jawabans[$index] = $jawaban;
        }
      }else {
        $jawaban->balasans = [];
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

  // method untuk menampilkan semua pertanyaan yang berdasarkan id user
  private function getAllPertanyaanByUser($id){
    $pertanyaan = $this->PertanyaanModel->getAllByUser($id);

    if(count($pertanyaan) <= 0 ){
      return [
        "data"=>[
          "status"=>"fail",
          "error"=>"true",
          "msg"=>"Not Found"
        ],
        "statusCode" => 404
      ];
    }
    // get id pertanyaan and user name  and kategori name
    foreach ($pertanyaan as $index => $p) {
      // get kategori
      $kategori = $this->getKategoriById($p->id_kategori);
      $p->kategori = [$kategori -> nama_kategori];
      $pertanyaan[$index] = $p;

      // overide tanggal 
      $pertanyaan[$index]->created_at = $this->dateFormat($p->created_at);
      $pertanyaan[$index]->updated_at = $this->dateFormat($p->updated_at);
    }

    // return response 
    return [
      "data"=>[
        "status"=>"success",
        "error"=>"false",
        "pertanyaan"=>$pertanyaan
      ],
      "statusCode"=>200
    ];
  }

  //   get pertanyaan handler
  public function pertanyaan_get()
  {
    $id = $this->get('id');
    $user = $this->get('user');

    if ($id !== null) {
      $response = $this->getDetailPertanyaanResponse($id);
      $this->response($response, 200);
    }else if($user !== null){
      $response = $this->getAllPertanyaanByUser($user);
      $this->response($response["data"],$response["statusCode"]);
    }else {
      $response = $this->getAllPertanyaanResponse();
      $this->response($response, 200);
    }
  }

  // fungsi untuk upload gambar
  private function imageUploads(){
    
    $filePaths = [];
    if(!empty($_FILES)) {
      $count = 0; 
      
      foreach ($_FILES["image"]["name"] as $filename) 
      {

          $temp = explode(".", $_FILES["image"]["name"][$count]);
          $newfilename = md5(microtime()) . '.' . end($temp);
          $vtmp = $_FILES["image"]["tmp_name"][$count];
          $ntmp = FCPATH."images/".$newfilename;
          move_uploaded_file($vtmp,$ntmp);
          $count++;

          
          array_push($filePaths,$newfilename);
      }
    } 

    return $filePaths;
  } 

  

  //  get user handler
  public function user_get()
  {
    $id = $this->get('id');
    $user = $this->getUserById($id);

    if(count($user)<=0){
      $this->response(
        [
          "status" => "succes",
          "error" => "false",
          "user" => []
        ],
        200
      );
    }
    // public
    $user[0] = [
      "id" => $user[0]->id,
      "name" => $user[0]->name,
      "image" => $user[0]->image,
      "email" => $user[0]->email,
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
        $pertanyaan = $this->post();
        // validating
        $wouldHave = ["judul", "isi", "id","id_kategori"];
        $isValidate = true;
        foreach ($wouldHave as $key) {
          if (!array_key_exists($key, $pertanyaan)) {
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
       
        // file uploading
         $filePaths =$this->imageUploads();
        // storing
        if ($isValidate) {
          try {
            $pertanyaan["id_pertanyaan"] = $this->hashId(time());
            $pertanyaan["imagePath"] = json_encode($filePaths);
            $this->PertanyaanModel->add_pertanyaan($pertanyaan);
            $response = [
              "data" => [
                "status" => "Success",
                "error" => "false",
                "message"=>"Pertanyaan kamu berhasil di upload",
                "question" => $this->PertanyaanModel->newest_pertanyaan()
              ],
              "statusCode" => 201
            ];
          } catch (Exception $e) {
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
        // end storing
      }/*
        else if($query === "edit"){
          // lakukin edit

          // lakuin response
        }
      */ else {
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
  public function pertanyaan_put()
  {
    $id = $this->get('id');
    $query = $this->query("action");

    if (!($id === null)) {
      // cek apakah hash nya berhasil di convert tidak 
      // jika ditemukan maka lanjutkan
      try {
    
        if ($query) {
          if ($query === "upvote") {

            $response = [
              "data" => [
                "status" => "Success",
                "error" => "false",
                "message" => "This is upvote action"
              ],
              "statusCode" => 200
            ];
          } else if ($query === "downvote") {

            $response = [
              "data" => [
                "status" => "Success",
                "error" => "false",
                "message" => "This is downvote action"
              ],
              "statusCode" => 200
            ];
          } else {
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
      }
      // jika tidak jalankan ini
      catch (Exception $e) {
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

  // hapus pertanyaan

  public function pertanyaan_delete()
  {
    $pertanyaan_id = $this->uri->segment(3);
    try {
      $id = $pertanyaan_id;
      $this->PertanyaanModel->delete_pertanyaan($id);

      $response = [
        "data" => [
          "status" => "Success",
          "error" => "false",
          "message" => "Data has been deleted"
        ],
        "statusCode" => 200
      ];
      $this->response($response['data'], $response['statusCode']);
    } catch (\Throwable $th) {
      $response = [
        "data" => [
          "status" => "Fail",
          "error" => "true",
          "message" => "Data cannot be deleted"
        ],
        "statusCode" => 400
      ];
      $this->response($response['data'], $response['statusCode']);
    }
  }

  public function login_post()
  {
    $email = $this->post('email');
    $password = $this->post('password');

    // Retrieve the user from the database based on the provided email
    $user = $this->db->get_where('user', ['email' => $email])->row_array();

    if (!$user) {
      $this->response([
        'status' => 'error',
        'message' => 'Invalid credentials',
        'data' => null
      ], RestController::HTTP_UNAUTHORIZED);
      return;
    }

    // Verify the password
    if (!password_verify($password, $user['password'])) {
      $this->response([
        'status' => 'error',
        'message' => 'Invalid credentials',
        'data' => null
      ], RestController::HTTP_UNAUTHORIZED);
      return;
    }

    

    // Return a success response
    $this->response([
      'status' => 'success',
      'message' => 'Login successful',
      'data' => [
        "id"=>$user["id"],
        "name"=>$user["name"]
      ]
    ], RestController::HTTP_OK);
  }

  private function generateToken($payload)
  {
    $header = json_encode(['alg' => 'HS256', 'typ' => 'JWT']);
    $header = base64_encode($header);

    $payload = json_encode($payload);
    $payload = base64_encode($payload);

    $key = '18726861283847128';

    $signature = hash_hmac('sha256', "$header.$payload", $key, true);
    $signature = base64_encode($signature);

    $token = "$header.$payload.$signature";

    return $token;
  }

  public function register_post()
  {
    $name = $this->post('name');
    $email = $this->post('email');
    $password = $this->post('password');

    // Retrieve the user from the database based on the provided email
    $data =
      [
        'name' => $name,
        'email' => $email,
        'password' => password_hash(
          $password,
          PASSWORD_DEFAULT
        ),
        'image' => " "
      ];
    $this->db->insert('user', $data);

    $this->response([
      'status' => 'success',
      'message' => 'Registrasi successful',
    ], RestController::HTTP_OK);
  }

  public function profile_post()
  {
    $data = $this->post();
    $query = $this->query("action");

    if (!($data["id"] === null)) {
      // cek apakah hash nya berhasil di convert tidak 
      // jika ditemukan maka lanjutkan
      try {
        if ($query) {
          if ($query === "edit") {
            // uploading
            $data["image"] = $this->imageUploads();
            $data["image"] = count($data["image"]) === 0 ? "": $data["image"][0];
            $this->User->edit_profile($data);
            $response = [
              "data" => [
                "status" => "Success",
                "error" => "false",
                "msg" => "Berhasil di ubah"
              ],
              "statusCode" => RestController::HTTP_CREATED
            ];
          } else {
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
      }
      // jika tidak jalankan ini
      catch (Exception $e) {
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


  //  post jawaban handler
  public function jawaban_post()
  {
    $query = $this->query("action");
    // storing
    if ($query) {
      if ($query === "add") {
        // get body request
        $jawaban = $this->post();

        // validating
        $wouldHave = ["isi","id_user","id_pertanyaan"];
        $isValidate = true;
        foreach ($wouldHave as $key) {
          if (!array_key_exists($key, $jawaban)) {
            $response = [
              "data" => [
                "status" => "Fail",
                "error" => "true",
                "message" => "Object jawaban doesn't have '$key' property"
              ],
              "statusCode" => 400
            ];
            $isValidate = false;
          }
        }
        // storing
        if ($isValidate) {
          try {
            $jawaban["id_jawaban"] = $this->hashId(time());
            $this->JawabanModel->add_jawaban($jawaban);
            $response = [
              "data" => [
                "status" => "Success",
                "error" => "false",
                "question" => $this->JawabanModel->newest_jawaban(),
                "message"=>"Komentar berhasil ditambahkan"
              ],
              "statusCode" => 201
            ];
          } catch (Exception $e) {
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
      }
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
     
    }else {
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

  // hapus jawaban
  public function jawaban_delete()
  {
    $jawaban_id = $this->uri->segment(3);
    try {
      $id = $jawaban_id;
      $this->JawabanModel->delete_jawaban($id);

      $response = [
        "data" => [
          "status" => "Success",
          "error" => "false",
          "message" => "Answer has been deleted"
        ],
        "statusCode" => 200
      ];
      $this->response($response['data'], $response['statusCode']);
    } catch (\Throwable $th) {
      $response = [
        "data" => [
          "status" => "Fail",
          "error" => "true",
          "message" => "Answer cannot be deleted"
        ],
        "statusCode" => 400
      ];
      $this->response($response['data'], $response['statusCode']);
    }
  }

  //  post balasan handler
  public function balasan_post()
  {
    $query = $this->query("action");
    // storing
    if ($query) {
      if ($query === "add") {
        // get body request
        $balasan = $this->post();

        // validating
        $wouldHave = ["isi"];
        $isValidate = true;
        foreach ($wouldHave as $key) {
          if (!array_key_exists($key, $balasan)) {
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
        if ($isValidate) {
          try {
            $this->BalasanModel->add_balasan($balasan);
            $response = [
              "data" => [
                "status" => "Success",
                "error" => "false",
                "question" => $this->BalasanModel->newest_balasan()
              ],
              "statusCode" => 201
            ];
          } catch (Exception $e) {
            $response = [
              "data" => [
                "status" => "Fail",
                "error" => "true",
                "message" => "You must login or categori selected is unregisted"
              ],
              "statusCode" => 401
            ];
          }
        } else {
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
  }

  // hapus balasan
  public function balasan_delete()
  {
    $balasan_id = $this->uri->segment(3);
    try {
      $id = $balasan_id;
      $this->BalasanModel->delete_balasan($id);

      $response = [
        "data" => [
          "status" => "Success",
          "error" => "false",
          "message" => "Reply has been deleted"
        ],
        "statusCode" => 200
      ];
      $this->response($response['data'], $response['statusCode']);
    } catch (\Throwable $th) {
      $response = [
        "data" => [
          "status" => "Fail",
          "error" => "true",
          "message" => "Reply cannot be deleted"
        ],
        "statusCode" => 400
      ];
      $this->response($response['data'], $response['statusCode']);
    }
  }

  // get jawaban handler 
  public function jawaban_get(){
    $user = $this->get("user");

    if($user){
      $jawabans = $this->JawabanModel->getAllByUser($user);

      

      if(count($jawabans) <=0){
        $response = [
          "data" =>[
            "status"=>"Not found",
            "error"=>"true",
          ],
          "statusCode"=>404
        ];
      }else{
        
        foreach ($jawabans as $index => $jawaban) {
          // overide tanggal 
          $jawabans[$index]->created_at = $this->dateFormat($jawaban->created_at);
          $jawabans[$index]->updated_at = $this->dateFormat($jawaban->updated_at);
        }
        $response = [
        "data" =>[
          "status"=>"success",
          "error"=>"false",
          "jawaban"=>$jawabans,
        ],
        "statusCode"=>200
      ];
      }
      
    }

    $this->response($response["data"],$response["statusCode"]);
  }
}



/*
  done : 
    localhost/boetani/api/pertanyaan
    localhost/boetani/api/pertanyaan/id/<hash> (get)
    localhost/boetani/api/user/id/1
    localhost/boetani/api/pertanyaan/id/<hash>?action=upvote
    localhost/boetani/api/pertanyaan?action=add
    localhost/boetani/api/pertanyaan?action=delete
    localhost/boetani/api/login
    localhost/boetani/api/register


    <<< belum dicoba >>>
    localhost/boetani/api/jawaban?action=add
    localhost/boetani/api/jawaban?action=delete
    localhost/boetani/api/balasan?action=add
    localhost/boetani/api/balasan?action=delete

    $BASE_URL_IMAGES = "http://localhost:8000/boetani/backend/images/";
 */


//  if (!empty($_FILES['image'])) {
//   $uploadedFile = $_FILES['image'];

//   // Access file properties
//   $tempFilePath = $uploadedFile['tmp_name'];

//   // Read the file contents
//   $fileContents = file_get_contents($tempFilePath);

//   // Convert the file contents to base64
//   $base64File = base64_encode($fileContents);

//   // Add the base64 encoded file to the $pertanyaan array
//   $base64_format = 'data:image/png;base64,';
//   $pertanyaan['image'] = $base64_format . $base64File;
// }
