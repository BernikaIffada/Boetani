<?php
defined('BASEPATH') or exit('No direct script access allowed');

class JawabanModel extends CI_Model
{
    protected $table = 'jawaban';
    protected $primaryKey = 'id_jawaban';

    protected $returnType = 'object';
    protected $useSoftDeletes = false;

    protected $allowedFields = ['id_pertanyaan', 'id', 'isi'];

    protected $useTimestamps = true;
    protected $createdField = 'created_at';
    protected $updatedField = 'updated_at';
    protected $deletedField = 'deleted_at';

    protected $validationRules = [];
    protected $validationMessages = [];
    protected $skipValidation = false;

    public function updateWaktu($id_jawaban)
    {
        return $this->query('UPDATE jawaban SET updated = NOW() WHERE id_jawaban = ?', [$id_jawaban]);
    }

    public function listByIdPertanyaan($id_pertanyaan)
    {
        return $this->db->get_where("jawaban", "id_pertanyaan = $id_pertanyaan")->result();
    }

    // public function listById($id_pertanyaan)
    // {
    //     return $this->query('SELECT a.id AS id_jawaban, a.isi as b.id AS id_balasan, b.isi AS isi_balasan, b.nama AS FROM jawaban a
    //     LEFT JOIN balasan b ON a.id = b.id_jawaban
    //     WHERE a.id_pertanyaan = ?
    //     ORDER BY a.created, b.created', [$id_pertanyaan])->getResult();
    // }

    public function listByPertanyaanIds($pertanyaanIds)
    {
        return $this->db->query('SELECT a.* FROM jawaban a
        WHERE a.id_pertanyaan IN ?
        ORDER BY a.created_at', [$pertanyaanIds])->result();
    }
}
