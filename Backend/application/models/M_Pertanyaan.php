<?php
// extends class Model
class M_Pertanyaan extends CI_Model{
// response jika field ada yang kosong
  public function empty_response(){
    $response['status']=502;
    $response['error']=true;
    $response['message']='Field tidak boleh kosong';
    return $response;
  }

// function untuk insert data ke tabel pertanyaan
  public function add_pertanyaan($data) {
    $kategori_id = $data['id_kategori'];
    unset($data['id_kategori']);

    $data['created_at'] = date('Y-m-d H:i:s');
    $this->db->insert('pertanyaan', $data);
    return $this->db->insert_id();

    $kategori = $this->db->select('nama_kategori')->from('kategori')->where('id_kategori', $kategori_id)
    ->get()->row();

    if ($kategori) {
      $this->db->where('id_kategori', $kategori_id)->update('pertanyaan', array('nama_kategori' => $kategori->nama_kategori));
    }
    return $kategori_id;
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

// hapus data pertanyaan
  public function delete_pertanyaan($id_pertanyaan){
    $this->db->where('id_pertanyaan', $id_pertanyaan);
    $this->db->delete("pertanyaan");

    return $this->db->affected_rows() > 0;
}






// gausah
  public function update_pertanyaan($id_kategori ,$judul, $isi, $gambar){
if($id_kategori == '' || empty($judul) || empty($isi) || empty($gambar)){
      return $this->empty_response();
    }else{
      $where = array(
        "id_pertanyaan" => $id_pertanyaan
      );
$set = array(
        "id_kategori" => $id_kategori,
        "judul" => $judul,
        "isi" => $isi,
        "gambar" => $gambar,
      );
$this->db->where($where);
      $update = $this->db->update("pertanyaan",$set);
      if($update){
        $response['status']=200;
        $response['error']=false;
        $response['message']='Pertanyaan berhasil diubah.';
        return $response;
      }else{
        $response['status']=502;
        $response['error']=true;
        $response['message']='Pertanyaan gagal diubah.';
        return $response;
      }
    }
}
}
