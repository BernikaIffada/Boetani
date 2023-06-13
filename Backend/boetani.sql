-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 13, 2023 at 05:14 PM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 7.4.16

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `boetani`
--

-- --------------------------------------------------------

--
-- Table structure for table `balasan`
--

CREATE TABLE `balasan` (
  `id_balasan` int(11) NOT NULL,
  `id_jawaban` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `isi` text NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL,
  `deleted_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `balasan`
--

INSERT INTO `balasan` (`id_balasan`, `id_jawaban`, `id`, `isi`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, 3, 'Tetapi kadang kala untuk mendapatkan hasil yang diperoleh lebih baik dan sehat bahan tanam ubi jalar yang digunakan adalah umbi atau perbanyakan secara generative.', '2023-06-03', '0000-00-00', '0000-00-00');

-- --------------------------------------------------------

--
-- Table structure for table `jawaban`
--

CREATE TABLE `jawaban` (
  `id_jawaban` int(11) NOT NULL,
  `id_pertanyaan` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `isi` text NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL,
  `deleted_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `jawaban`
--

INSERT INTO `jawaban` (`id_jawaban`, `id_pertanyaan`, `id`, `isi`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, 4, 'Hai kak! Ubi merupakan salah satu tanaman yang bisa ditanam pada dataran rendah sampai dataran tinggi. Cara menanam ubi yang baik, yaitu dengan mengecek iklim yang ada pada daerah dengan suhu 21-27 derajat C, lalu sediakan media tanam yang baik, dan pada dataran tinggi cocok ditanam dengan ketinggian 1.000 mdpl yaa...', '2023-06-01', '0000-00-00', '0000-00-00'),
(2, 2, 1, 'Setau saya ni bro, masa panen pisang butuh sekitar 8-9 bulan masa tanam. Kalo pada jenis pisang lokal butuh sekitar waktu 1 - 1.5 tahun. Jadi kemungkinan yang ditanam oleh kakekmu itu pisang jenis lokal, yang sebentar lagi akan panen.', '2023-06-02', '0000-00-00', '0000-00-00'),
(4, 1, 2, 'Ada berbagai jenis bahan tanam yang dapat digunakan dalam budidaya ubi jalar yaitu dengan cara generatif yaitu menggunakan umbi dan dengan cara vegetatif yaitu menggunakan batang nya. Boleh dicoba keduanya untuk tau perbedaan hasilnya, kak.', '2023-06-01', '0000-00-00', '0000-00-00');

-- --------------------------------------------------------

--
-- Table structure for table `kategori`
--

CREATE TABLE `kategori` (
  `id_kategori` int(11) NOT NULL,
  `nama_kategori` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `kategori`
--

INSERT INTO `kategori` (`id_kategori`, `nama_kategori`) VALUES
(1, 'Umbi-umbian'),
(2, 'Padi'),
(3, 'Tebu'),
(4, 'Sayur'),
(5, 'Buah'),
(6, 'Peralatan Tani'),
(7, 'Pupuk'),
(8, 'Benih');

-- --------------------------------------------------------

--
-- Table structure for table `pertanyaan`
--

CREATE TABLE `pertanyaan` (
  `id_pertanyaan` int(11) NOT NULL,
  `id` int(11) NOT NULL,
  `judul` varchar(128) NOT NULL,
  `id_kategori` int(11) NOT NULL,
  `isi` text NOT NULL,
  `image` varchar(100) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL,
  `deleted_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pertanyaan`
--

INSERT INTO `pertanyaan` (`id_pertanyaan`, `id`, `judul`, `id_kategori`, `isi`, `image`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, 'Menanam ubi yang baik pada dataran tinggi', 1, 'Halo kak... Jadi saya kemarin lagi coba menanam ubi tapi saya tinggal di dataran tinggi. Apakah akan berpengaruh pada perkembangan tanaman saya? terima kasih :D', 'https://img.freepik.com/free-photo/man-holding-parsnip-harvest_23-2148253315.jpg?w=826&t=st=16854166', '2023-06-01', '0000-00-00', '0000-00-00'),
(2, 2, 'Pohon pisang tidak berbuah selama 1 tahun', 5, 'Kenapa yaa pohon pisang di rumah kakek saya tidak berbuah? kurang lebih dari 1 tahun kemarin. apa ada tahapan tertentu yang dilewatkan? mohon jawabannya, makasih', 'https://img.freepik.com/free-photo/banana-trees-growing-stone-wall_1353-65.jpg?w=826&t=st=1685416735', '2023-06-02', '0000-00-00', '0000-00-00'),
(3, 3, 'Menanam Padi di dalam polybag', 2, 'Apa saja keuntungan dan manfaat menanam padi di dalam polybag?', 'https://img.freepik.com/free-photo/different-types-grains-beans-groceries-bags-market_23-2148209841.', '2023-06-02', '0000-00-00', '0000-00-00'),
(4, 4, 'Alat membajak sawah', 6, 'Apa saja alat yang dibawa petani untuk membajak sawah', 'https://img.freepik.com/free-photo/still-life-with-gardening-concept_23-2148127837.jpg?w=360&t=st=16', '2023-06-03', '0000-00-00', '0000-00-00');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(128) NOT NULL,
  `email` varchar(128) NOT NULL,
  `password` varchar(256) NOT NULL,
  `image` varchar(128) NOT NULL,
  `role_id` int(11) NOT NULL,
  `is_active` int(1) NOT NULL,
  `date_created` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`, `image`, `role_id`, `is_active`, `date_created`) VALUES
(1, 'Intan sari duano', 'intan.duano@gmail.com', '$2y$10$jhGcBmz5HJ3OxQkvuRHDUuToxPZXWG86BO7NtSj.Gnb8UcNNXLpni', 'undraw_Mobile_apps_re_3wjf.png', 2, 1, 1685341977),
(2, 'Lukman', 'lukmanullh23@gmail.com', '$2y$10$89Yk2iT1kHr9Rdt3BwtN6u2fz1b.QDCqpHo/qC2wF55Mo0C4ohDj6', 'default.jpg', 2, 1, 1685522858),
(3, 'BERNIKA IRNADIANIS IFFADA', 'bernikaiffada@gmail.com', '$2y$10$e4TxRUnjkEB8gVW.lE7hlekzmnHt7hjcIounEJcNXFPkr2Ep0gzsm', 'indonesia.png', 1, 1, 1686116388),
(4, 'Rasyad', 'rasyadamhar2001@gmail.com', '$2y$10$uDI3WsdpaHeLPV7HJu2XROZc1ydAb3Qz7mjmhIGtQNH/Q4NnOFP0S', 'default.jpg', 2, 1, 1686031354),
(5, 'Zakariya', 'm.zakariya311@gmail.com', '$2y$10$E9DOlAwlnlOg/TCg/ZXSZe6gIdCgVpbrQP6UMGIIQvv6JD2jfxh/a', 'default.jpg', 2, 1, 1686058629),
(23, 'Martika Isna Lidya', 'titik30martika@gmail.com', '$2y$10$3kGEMpSNYNdKBJkOnQINt.8jsA8vQgRgyT51XMwODnjqKwVdlZUUW', 'indonesia1.png', 2, 1, 1686493756);

-- --------------------------------------------------------

--
-- Table structure for table `user_access_menu`
--

CREATE TABLE `user_access_menu` (
  `id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `menu_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_access_menu`
--

INSERT INTO `user_access_menu` (`id`, `role_id`, `menu_id`) VALUES
(1, 1, 1),
(2, 1, 2),
(3, 2, 2),
(4, 1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `user_menu`
--

CREATE TABLE `user_menu` (
  `id` int(11) NOT NULL,
  `menu` varchar(128) CHARACTER SET utf8 NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_menu`
--

INSERT INTO `user_menu` (`id`, `menu`) VALUES
(1, 'Admin'),
(2, 'User'),
(3, 'Menu'),
(4, 'Submenu Management');

-- --------------------------------------------------------

--
-- Table structure for table `user_role`
--

CREATE TABLE `user_role` (
  `id` int(11) NOT NULL,
  `role` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_role`
--

INSERT INTO `user_role` (`id`, `role`) VALUES
(1, 'Administrator'),
(2, 'Member');

-- --------------------------------------------------------

--
-- Table structure for table `user_sub_menu`
--

CREATE TABLE `user_sub_menu` (
  `id` int(11) NOT NULL,
  `menu_id` int(11) NOT NULL,
  `title` varchar(128) NOT NULL,
  `url` varchar(128) NOT NULL,
  `icon` varchar(128) NOT NULL,
  `is_active` int(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_sub_menu`
--

INSERT INTO `user_sub_menu` (`id`, `menu_id`, `title`, `url`, `icon`, `is_active`) VALUES
(1, 1, 'Dashboard', 'admin', 'fas fa-fw fa-tachometer-alt', 1),
(2, 2, 'My Profile', 'user', 'fas fa-fw fa-user', 1),
(3, 2, 'Edit Profile', 'user/edit', 'fas fa-fw fa-user-edit', 1),
(4, 3, 'Menu Management', 'menu', 'fas fa-fw fa-folder', 1),
(5, 3, 'Submenu Management', 'menu/submenu', 'fas fa-fw fa-folder-open', 1),
(7, 1, 'Role', 'admin/role', 'fas fa-fw fa-user-tie', 1),
(8, 2, 'Ubah Password ', 'user/changepassword', 'fas fa-fw fa-key', 1);

-- --------------------------------------------------------

--
-- Table structure for table `user_token`
--

CREATE TABLE `user_token` (
  `id` int(11) NOT NULL,
  `email` varchar(128) NOT NULL,
  `token` varchar(128) NOT NULL,
  `date_created` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user_token`
--

INSERT INTO `user_token` (`id`, `email`, `token`, `date_created`) VALUES
(6, 'rasyad@gmail.com', 'V4I1VQjvw3n8zLuTVkjYpElRDtEn2sXVxFDWUe1yuQI=', 1686031354),
(7, 'm.zakariya311@gmail.com', '48pRTDMHk92z02jvm6nmUf+0BvAFOwGmMOzB4Y5EwGo=', 1686058629),
(8, 'bernikaiffada@gmail.com', 'hvPd1gDgq45pDxignynBmjSfuJnZk6lunK3sIcCeU4Y=', 1686116388),
(9, 'titik30martika@gmail.com', 'tAeYtKhauW69r0drxsQvfp5A/cKPklDuxAXVg1uXyO4=', 1686183055),
(10, 'titik30martika@gmail.com', 'Hjr9KWvaX+Nw09aoQQKXythtvSwGR8WR3A0ebwqoaPo=', 1686183207),
(11, 'titik30martika@gmail.com', 'SVeX9E/Rvdd0oG1Ga4YcjWr58XLMR6zcIzyiKgSEHME=', 1686388524),
(12, 'titik30martika@gmail.com', '7/TfSfb8osaYiyNCmzci0FePl+2DV3I0riLQHXvOeH8=', 1686388695);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `balasan`
--
ALTER TABLE `balasan`
  ADD PRIMARY KEY (`id_balasan`),
  ADD KEY `id_jawaban` (`id_jawaban`,`id`),
  ADD KEY `balasan_user` (`id`);

--
-- Indexes for table `jawaban`
--
ALTER TABLE `jawaban`
  ADD PRIMARY KEY (`id_jawaban`),
  ADD KEY `id_pertanyaan` (`id_pertanyaan`,`id`),
  ADD KEY `jawaban_user` (`id`);

--
-- Indexes for table `kategori`
--
ALTER TABLE `kategori`
  ADD PRIMARY KEY (`id_kategori`);

--
-- Indexes for table `pertanyaan`
--
ALTER TABLE `pertanyaan`
  ADD PRIMARY KEY (`id_pertanyaan`),
  ADD KEY `id` (`id`,`id_kategori`),
  ADD KEY `pertanyaan_kategori` (`id_kategori`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_access_menu`
--
ALTER TABLE `user_access_menu`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_menu`
--
ALTER TABLE `user_menu`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_role`
--
ALTER TABLE `user_role`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_sub_menu`
--
ALTER TABLE `user_sub_menu`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user_token`
--
ALTER TABLE `user_token`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `balasan`
--
ALTER TABLE `balasan`
  MODIFY `id_balasan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `jawaban`
--
ALTER TABLE `jawaban`
  MODIFY `id_jawaban` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `kategori`
--
ALTER TABLE `kategori`
  MODIFY `id_kategori` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `pertanyaan`
--
ALTER TABLE `pertanyaan`
  MODIFY `id_pertanyaan` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `user_access_menu`
--
ALTER TABLE `user_access_menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `user_menu`
--
ALTER TABLE `user_menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `user_role`
--
ALTER TABLE `user_role`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `user_sub_menu`
--
ALTER TABLE `user_sub_menu`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `user_token`
--
ALTER TABLE `user_token`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `balasan`
--
ALTER TABLE `balasan`
  ADD CONSTRAINT `balasan_jawaban` FOREIGN KEY (`id_jawaban`) REFERENCES `jawaban` (`id_jawaban`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `balasan_user` FOREIGN KEY (`id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `jawaban`
--
ALTER TABLE `jawaban`
  ADD CONSTRAINT `jawaban_pertanyaan` FOREIGN KEY (`id_pertanyaan`) REFERENCES `pertanyaan` (`id_pertanyaan`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `jawaban_user` FOREIGN KEY (`id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `pertanyaan`
--
ALTER TABLE `pertanyaan`
  ADD CONSTRAINT `pertanyaan_kategori` FOREIGN KEY (`id_kategori`) REFERENCES `kategori` (`id_kategori`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `pertanyaan_user` FOREIGN KEY (`id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
