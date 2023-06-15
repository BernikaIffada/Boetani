<?php
defined('BASEPATH') or exit('No direct script access allowed');

require APPPATH . 'libraries/RESTController.php';
class Pertanyaan extends RESTController
{

  public function __construct()
  {
    parent::__construct();
    $this->load->model('PertanyaanModel');
    $this->load->model('JawabanModel');
    $this->load->model('BalasanModel');
  }

  // method untuk menampilkan semua pertanyaan 
  public function getAllPertanyaanResponse()
  {
    $pertanyaan = $this->PertanyaanModel->all_pertanyaan();
    $pertanyaanIds = []; // [ { id_pertanyaan: 1 }, { id_pertanyaan: 2 } ]

    foreach ($pertanyaan as $p) {
      array_push($pertanyaanIds, $p->id_pertanyaan);
    }

    $jawaban = $this->JawabanModel->listByPertanyaanIds($pertanyaanIds); // [ { id_pertanyaan: 1, id_jawaban: 1 }, { id_pertanyaan: 2, id_jawaban: 2 } ]

    // naro jawaban ke dalam pertanyaan sesuai dengan id_pertanyaan
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
    }

    // setting response
    $response = [
      "status" => "Success",
      "error" => "false",
      "pertanyaan" => $pertanyaan
    ];

    return $response;
  }


  // get handler
  // public function index_get()
  // {
  //   $id = $this->get('id');

  //   if ($id === null) {
  //     $response = $this->getAllPertanyaanResponse();
  //     $this->response($response, 200);
  //   } else {
  //     $this->response([
  //       "id" => $id,
  //     ], 200);
  //   }
  // }

  // "/boetani/pertanyaan/id/1"



  // get detail pertanyaan
  public function get_detail_question($id)
  {
    // untuk mengambil balasan
    // $jawaban = $response['jawaban']; // [ { id_jawaban: 1 }, { id_jawaban: 2 } ]
    // $jawabanIds = [];

    // foreach ($jawaban as $j) {
    //   array_push($jawabanIds, $j->id_jawaban);
    // }

    // $balasan = $this->BalasanModel->listByJawabanIds($jawabanIds); // [ { id_jawaban: 1, id_balasan: 1 }, { id_jawaban: 2, id_balasan: 2 } ]

    // foreach ($balasan as $r) {
    //   foreach ($jawaban as $index => $j) {
    //     if ($r->id_jawaban == $j->id_jawaban) {
    //       if (property_exists($j, 'balasan')) {
    //         array_push($jawaban[$index]->balasan, $r);
    //       } else {
    //         $jawaban[$index]->balasan = [$r];
    //       }

    //       break;
    //     }
    //   }
    // }

    // $this->response($response);

    $this->responseJSON(200, json_encode([
      "id" => $id,
    ]));
  }

  public function detail_get()
  {
    $this->response(["status" => "detail"], 200);
  }

  // untuk menambah pertanyaan menaggunakan method post
  public function add_post()
  {
    $response = $this->PertanyaanModel->add_pertanyaan()(
      $this->post('id_kategori'),
      $this->post('judul'),
      $this->post('isi'),
      $this->post('gambar')
    );
    $this->response($response);
  }
  // update pertanyaan menggunakan method put
  public function update_put()
  {
    $response = $this->PertanyaanModel->update_pertanyaan(
      $this->put('id_kategori'),
      $this->put('judul'),
      $this->put('isi'),
      $this->put('gambar')
    );
    $this->response($response);
  }
  // hapus pertanyaan menggunakan method delete
  public function pertanyaan_delete()
  {
    $response = $this->PertanyaanModel->delete_pertanyaan(
      $this->delete('id_pertanyaan')
    );
    $this->response($response);
  }
}
