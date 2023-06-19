<?php
// extends class Model
class PertanyaanModel extends CI_Model
{
  public $id_pertanyaan;
  public $judul;
  public $isi;
  public $id;
  public $id_kategori;
  public $image;
  public $created_at;
  public $updated_at;
  public $upvote;
  public $downvote;

  // function untuk insert data ke tabel pertanyaan
  public function add_pertanyaan($pertanyaan)
  {
    // store to prop this model
    $this->id = $pertanyaan["id"];
    $this->id_kategori = $pertanyaan["id_kategori"];
    $this->judul = $pertanyaan["judul"];
    $this->isi = $pertanyaan["isi"];
    $this->image = $pertanyaan["imagePath"];
    $this->upvote = 0;
    $this->downvote = 0;
    $this->created_at = date("Y-m-d", time());
    $this->updated_at = date("Y-m-d", time());
    $this->id_pertanyaan = $pertanyaan["id_pertanyaan"];

    // recording this model to table pertanyaan in database
    try {
      $result = $this->db->insert("pertanyaan", $this);
      return $result;
    } catch (Exception $e) {
      throw new Exception("Unauthorized or Unregisted");
    }
  }

  //  mengambil data yang baru masuk
  public function newest_pertanyaan()
  {
    $newest = $this->db->query("SELECT * FROM `pertanyaan` ORDER BY no DESC LIMIT 1")->result();
    return $newest;
  }

  // mengambil pertanyaan berdasarkan id user
  public function getAllByUser($id){
    return $this->db->get_where("pertanyaan","id = $id")->result_object();
  }

  // mengambil semua pertanyaan
  public function all_pertanyaan()
  {
    $all = $this->db->order_by("no","DESC")->get("pertanyaan")->result();
    return $all;
  }

  // mengambil pertanyaan by id
  public function pertanyaanById($id)
  {
    $pertanyaan = $this->db->get_where("pertanyaan", "id_pertanyaan = '$id'")->result();
    return $pertanyaan;
  }

  public function delete_pertanyaan($id_pertanyaan)
  {
    $this->db->where('id', $id_pertanyaan);
    return $this->db->delete('pertanyaan');
  }

  public function upvotePertanyaan($id)
  {
    // UPDATE pertanyaan SET upvote='2' WHERE id_pertanyaan=1;
  }
}
