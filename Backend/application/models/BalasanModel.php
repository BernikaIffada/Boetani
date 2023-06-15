<?php
defined('BASEPATH') or exit('No direct script access allowed');

class BalasanModel extends CI_Model
{
    protected $table = 'balasan';
    protected $primaryKey = 'id_balasan';

    protected $returnType = 'object';
    protected $useSoftDeletes = false;

    protected $allowedFields = ['id_jawaban', 'id', 'isi'];

    protected $useTimestamps = true;
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';
    protected $deletedField = 'deleted_at';

    protected $validationRules = [];
    protected $validationMessages = [];
    protected $skipValidation = false;

    public function updateWaktu($id_balasan)
    {
        return $this->query('UPDATE balasan SET updated = NOW() WHERE id_balasan = ?', [$id_balasan]);
    }

    public function listByIdJawaban($id_jawaban)
    {
        return $this->db->get_where("balasan", "id_jawaban = $id_jawaban")->result();
    }

    public function listById($id_jawaban)
    {
        return $this->query('SELECT a.id AS id_jawaban, a.isi as b.id AS id_balasan, b.isi AS isi_balasan, b.nama AS FROM balasan a
        LEFT JOIN balasan b ON a.id = b.id_jawaban
        WHERE a.id_jawaban = ?
        ORDER BY a.created, b.created', [$id_jawaban])->getResult();
    }

    public function listByJawabanIds($jawabanIds)
    {
        return $this->db->query('SELECT a.* FROM balasan a
        WHERE a.id_jawaban IN ?
        ORDER BY a.created_at', [$jawabanIds])->result();
    }

    public function delete_balasan($id_balasan)
    {
      $this->db->where('id', $id_balasan);
      return $this->db->delete('balasan');
    }
}