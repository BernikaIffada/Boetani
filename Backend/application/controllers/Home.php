
<?php
defined ('BASEPATH') or exit('No direct script access allowed');

class Home extends CI_Controller
{ 
   public function index()
{
    $data =  $this->db->query('SELECT * FROM postingan')->result();
    $this->output->set_content_type('application/json');
    

    $this->output->set_output(json_encode($data));
}   
}
 