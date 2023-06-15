<?php
// extends class Model
class PertanyaanModel extends CI_Model{
  public $judul;
  public $isi;
  public $id_user;
  public $id_kategori;
  public $image;
  public $created_at;
  public $updated_at;  
  public $upvote;
  public $downvote;

// function untuk insert data ke tabel pertanyaan
 public function add_pertanyaan($pertanyaan){
    // store to prop this model
    $this->id_user = $pertanyaan["id_user"];
    $this->id_kategori = $pertanyaan["id_kategori"];
    $this->judul = $pertanyaan["judul"];
    $this->isi = $pertanyaan["isi"];
    $this->image = $pertanyaan["image"];
    $this->upvote = 0;
    $this->downvote = 0;
    $this->created_at = date("Y-m-d",time());
    $this->updated_at = date("Y-m-d",time());

    // recording this model to table pertanyaan in database
    try{
      $result = $this->db->insert("pertanyaan", $this);
      return $result;
    }catch(Exception $e){
      throw new Exception("Unauthorized or Unregisted");
    }
    
 }

  //  mengambil data yang baru masuk
  public function newest_pertanyaan(){
    $newest = $this->db->query("SELECT * FROM `pertanyaan` ORDER BY id_pertanyaan DESC LIMIT 1")->result();
    return $newest;
  }

// mengambil semua pertanyaan
  public function all_pertanyaan(){
    $all = $this->db->get("pertanyaan")->result();
    return $all;
  }

  // mengambil pertanyaan by id
  public function pertanyaanById($id){
    $pertanyaan = $this->db->get_where("pertanyaan","id_pertanyaan = $id")->result();
    return $pertanyaan;
  }

  public function upvotePertanyaan($id){
    // UPDATE pertanyaan SET upvote='2' WHERE id_pertanyaan=1;
  }


}
