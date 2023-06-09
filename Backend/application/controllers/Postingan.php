<?php
require APPPATH . 'libraries/RESTController.php';
class Person extends RESTController{
// construct
  public function __construct(){
    parent::__construct();
    $this->load->model('M_Postingan');
  }
// method index untuk menampilkan semua postingan menggunakan method get
  public function index_get(){
    $response = $this->M_Postingan->all_postingan();
    $this->response($response);
  }
// untuk menambah postingan menaggunakan method post
  public function add_post(){
    $response = $this->M_Postingan->add_postingan()(
        $this->post('id_kategori'),
        $this->post('judul'),
        $this->post('isi'),
        $this->post('gambar')
      );
    $this->response($response);
  }
// update postingan menggunakan method put
  public function update_put(){
    $response = $this->M_Postingan>update_postingan(
        $this->put('id_kategori'),
        $this->put('judul'),
        $this->put('isi'),
        $this->put('gambar')
      );
    $this->response($response);
  }
// hapus postingan menggunakan method delete
  public function delete_delete(){
    $response = $this->M_Postingan->delete_postingan(
        $this->delete('id_postingan')
      );
    $this->response($response);
  }
}
?>