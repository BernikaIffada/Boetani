<?php
// extends class Model
class BalasanModel extends CI_Model
{
public $id_jawaban;
  public $isi;
  public $id;
  public $created_at;
  public $updated_at;
  // public $upvote;
  // public $downvote;

  // function untuk insert data ke tabel balasan
  public function add_balasan($balasan)
  {
    // store to prop this model
    $this->id_jawaban = $balasan["id_jawaban"];
    $this->id = $balasan["id"];
    $this->isi = $balasan["isi"];
    // $this->upvote = 0;
    // $this->downvote = 0;
    $this->created_at = date("Y-m-d", time());
    $this->updated_at = date("Y-m-d", time());

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
      $newest = $this->db->query("SELECT * FROM `balasan` ORDER BY id_balasan DESC LIMIT 1")->result();
      return $newest;
    }

    //menghapus balasan
    public function delete_balasan($id_balasan)
    {
      $this->db->where('id', $id_balasan);
      return $this->db->delete('balasan');
    }
}