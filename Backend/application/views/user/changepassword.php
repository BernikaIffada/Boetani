<div class="container-fluid">

    <h1 class="h3 mb-4 text-gray-800"><?= $title; ?></h1>

    <div class="row">
        <div class="col-lg-6">
        <?= $this->session->flashdata('message'); ?>
        <form action="<?= base_url('user/changepassword'); ?>" method="post">
        <div class="form-group">
            <label for="current_password">Password Lama</label>
            <input type="password" class="form-control" id="current_password" name="current_password" placeholder="Masukkan password lama">
            <?= form_error('current_password', '<small class="text-danger pl-3">', '</small>'); ?>
        </div>
        <div class="form-group">
            <label for="new_password1">Password Baru</label>
            <input type="password" class="form-control" id="new_password1" name="new_password1" placeholder="Masukkan password baru">
            <?= form_error('new_password1', '<small class="text-danger pl-3">', '</small>'); ?>
        </div>
        <div class="form-group">
            <label for="new_password2">Konfirmasi Password</label>
            <input type="password" class="form-control" id="new_password2" name="new_password2" placeholder="Konfirmasi password baru">
            <?= form_error('new_password2', '<small class="text-danger pl-3">', '</small>'); ?>
        </div>
        <div class="form-group">
            <button type="submit" class="btn btn-success">Ubah Password</button>
        </div>
    </form>
        </div>
    </div>
</div>
</div>