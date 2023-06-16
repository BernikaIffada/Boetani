<?php
// extends class Model
class JawabanModel extends CI_Model
{
  public $id_pertanyaan;
  public $isi;
  public $id;
  public $created_at;
  public $updated_at;
  public $upvote;
  public $downvote;

  // function untuk insert data ke tabel jawaban
  public function add_jawaban($jawaban)
  {
    // store to prop this model
    $this->id_pertanyaan = $jawaban["id_pertanyaan"];
    $this->isi = $jawaban["isi"];
    $this->id = $jawaban["id_user"];
    $this->upvote = 0;
    $this->downvote = 0;
    $this->created_at = date("Y-m-d", time());
    $this->updated_at = date("Y-m-d", time());
    $this->id_jawaban = $jawaban["id_jawaban"];

    // recording this model to table jawaban in database
    try {
      $result = $this->db->insert("jawaban", $this);
      return $result;
    } catch (Exception $e) {
      throw new Exception("Unauthorized or Unregisted");
    }
  }

  //  mengambil data yang baru masuk
  public function newest_jawaban()
  {
    $newest = $this->db->query("SELECT * FROM `jawaban` ORDER BY no DESC LIMIT 1")->result();
    return $newest;
  }

  // mengambil jawaban berdasarkan id user
  public function getAllByUser($id){
    return $this->db->get_where("jawaban","id = $id")->result_object();
  }

  // mengambil semua jawaban
  public function all_jawaban()
  {
    $all = $this->db->get("jawaban")->result();
    return $all;
  }

  // mengambil jawaban by id
  public function jawabanById($id)
  {
    $jawaban = $this->db->get_where("jawaban", "id_jawaban = '$id'")->result();
    return $jawaban;
  }

  public function delete_jawaban($id_jawaban)
  {
    $this->db->where('id', $id_jawaban);
    return $this->db->delete('jawaban');
  }

  public function upvoteJawaban($id)
  {
    // UPDATE jawaban SET upvote='2' WHERE id_jawaban=1;
  }
}
