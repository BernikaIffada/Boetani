<?php
// extends class Model
class BalasanModel extends CI_Model
{
  public $id_jawaban;
  public $isi;
  public $id;
  public $created_at;
  public $updated_at;
  public $upvote;
  public $downvote;

  // function untuk insert data ke tabel balasan
  public function add_balasan($balasan)
  {
    // store to prop this model
    $this->id_jawaban = $balasan["id_jawaban"];
    $this->isi = $balasan["isi"];
    $this->id = $balasan["id_user"];
    $this->upvote = 0;
    $this->downvote = 0;
    $this->created_at = date("Y-m-d", time());
    $this->updated_at = date("Y-m-d", time());
    $this->id_balasan = $balasan["id_balasan"];

    // recording this model to table balasan in database
    try {
      $result = $this->db->insert("balasan", $this);
      return $result;
    } catch (Exception $e) {
      throw new Exception("Unauthorized or Unregisted");
    }
  }

  //  mengambil data yang baru masuk
  public function newest_balasan()
  {
    $newest = $this->db->query("SELECT * FROM `balasan` ORDER BY no DESC LIMIT 1")->result();
    return $newest;
  }

  // mengambil balasan berdasarkan id user
  public function getAllByUser($id)
  {
    return $this->db->get_where("balasan", "id = $id")->result_object();
  }

  // mengambil semua balasan
  public function all_balasan()
  {
    $all = $this->db->get("balasan")->result();
    return $all;
  }

  // mengambil balasan by id
  public function balasanById($id)
  {
    $balasan = $this->db->get_where("balasan", "id_balasan = '$id'")->result();
    return $balasan;
  }

  public function delete_balasan($id_balasan)
  {
    $this->db->where('id', $id_balasan);
    return $this->db->delete('balasan');
  }

  public function upvoteBalasan($id)
  {
    // UPDATE balasan SET upvote='2' WHERE id_jawaban=1;
  }
}
