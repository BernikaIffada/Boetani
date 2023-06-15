<?php
// extends class Model
class User extends CI_Model
{
    public $name;
    public $email;
    public $image;


    public function edit_profile($data){
        $this->name = $data["name"];
        $this->email = $data["email"];
        $this->image = $data["image"];
        
        // updating
        $this->db->where('id', $data["id"]);
        $this->db->update('user',$this);
    }
}