<?php
// extends class Model
class JawabanModel extends CI_Model
{
    public $id_pertanyaan;
  public $isi;
  public $id;
  public $created_at;
  public $updated_at;
  // public $upvote;
  // public $downvote;

  // function untuk insert data ke tabel jawaban
  public function add_balasan($balasan)
  {
    // store to prop this model
    $this->id_pertanyaan = $balasan["id_pertanyaan"];
    $this->id = $balasan["id"];
    $this->isi = $balasan["isi"];
    // $this->upvote = 0;
    // $this->downvote = 0;
    $this->created_at = date("Y-m-d", time());
    $this->updated_at = date("Y-m-d", time());

    // recording this model to table jawaban in database
    try {
      $result = $this->db->insert("balasan", $this);
      return $result;
    } catch (Exception $e) {
      throw new Exception("Unauthorized or Unregisted");
    }
  }

      //  mengambil data yang baru masuk
      public function newest_jawaban()
      {
        $newest = $this->db->query("SELECT * FROM `jawaban` ORDER BY id_jawaban DESC LIMIT 1")->result();
        return $newest;
      }
      
    public function delete_jawaban($id_jawaban)
    {
      $this->db->where('id', $id_jawaban);
      return $this->db->delete('jawaban');
    }
}
