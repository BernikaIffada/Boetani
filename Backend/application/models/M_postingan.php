<?php
// extends class Model
class M_Postingan extends CI_Model{
// response jika field ada yang kosong
  public function empty_response(){
    $response['status']=502;
    $response['error']=true;
    $response['message']='Field tidak boleh kosong';
    return $response;
  }
// function untuk insert data ke tabel table postingan
  public function add_postingan($id_kategori ,$judul, $isi, $gambar){
if(empty($id_kategori) || empty($judul) || empty($isi) || empty($gambar)){
      return $this->empty_response();
    }else{
      $data = array(
        "id_kategori"=> $id_kategori,
        "judul"=> $judul,
        "isi"=> $isi,
        "gambar"=> $gambar,
      );
$insert = $this->db->insert("postingan", $data);
if($insert){
        $response['status']=200;
        $response['error']=false;
        $response['message']='Postingan ditambahkan.';
        return $response;
      }else{
        $response['status']=502;
        $response['error']=true;
        $response['message']='Postingan gagal ditambahkan.';
        return $response;
      }
    }
}
// mengambil semua postingan
  public function all_postingan(){
$all = $this->db->get("postingan")->result();
    $response['status']=200;
    $response['error']=false;
    $response['postingan']=$all;
    return $response;
}
// hapus data person
  public function delete_postingan($id_postingan){
if($id_postingan == ''){
      return $this->empty_response();
    }else{
      $where = array(
        "id_postingan" => $id_postingan
      );
$this->db->where($where);
      $delete = $this->db->delete("postingan");
      if($delete){
        $response['status']=200;
        $response['error']=false;
        $response['message']='Postingan dihapus.';
        return $response;
      }else{
        $response['status']=502;
        $response['error']=true;
        $response['message']='Postingan gagal dihapus.';
        return $response;
      }
    }
}
// update person
  public function update_postingan($id_kategori ,$judul, $isi, $gambar){
if($id_kategori == '' || empty($judul) || empty($isi) || empty($gambar)){
      return $this->empty_response();
    }else{
      $where = array(
        "id_postingan" => $id_postingan
      );
$set = array(
        "id_kategori" => $id_kategori,
        "judul" => $judul,
        "isi" => $isi,
        "gambar" => $gambar,
      );
$this->db->where($where);
      $update = $this->db->update("postingan",$set);
      if($update){
        $response['status']=200;
        $response['error']=false;
        $response['message']='Postingan berhasil diubah.';
        return $response;
      }else{
        $response['status']=502;
        $response['error']=true;
        $response['message']='Postingan gagal diubah.';
        return $response;
      }
    }
}
}
?>