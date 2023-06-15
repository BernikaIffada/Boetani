-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 15 Jun 2023 pada 19.32
-- Versi server: 10.4.28-MariaDB
-- Versi PHP: 8.0.28

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
-- Struktur dari tabel `balasan`
--

CREATE TABLE `balasan` (
  `id_balasan` varchar(50) NOT NULL,
  `id_jawaban` varchar(50) NOT NULL,
  `id` int(11) NOT NULL,
  `isi` text NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `balasan`
--

INSERT INTO `balasan` (`id_balasan`, `id_jawaban`, `id`, `isi`, `created_at`, `updated_at`) VALUES
('fdsvdsert2324', 'vsjk23kl034nads', 4, 'Tetapi kadang kala untuk mendapatkan hasil yang diperoleh lebih baik dan sehat bahan tanam ubi jalar yang digunakan adalah umbi atau perbanyakan secara generative.', '2023-06-12', '2023-06-19');

-- --------------------------------------------------------

--
-- Struktur dari tabel `jawaban`
--

CREATE TABLE `jawaban` (
  `id_jawaban` varchar(50) NOT NULL,
  `id_pertanyaan` varchar(50) NOT NULL,
  `id` int(11) NOT NULL,
  `isi` text NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `jawaban`
--

INSERT INTO `jawaban` (`id_jawaban`, `id_pertanyaan`, `id`, `isi`, `created_at`, `updated_at`) VALUES
('sfg3s224dsfr5t54as', 'sj12fg4', 4, 'Setau saya ni bro, masa panen pisang butuh sekitar 8-9 bulan masa tanam. Kalo pada jenis pisang lokal butuh sekitar waktu 1 - 1.5 tahun. Jadi kemungkinan yang ditanam oleh kakekmu itu pisang jenis lokal, yang sebentar lagi akan panen.', '2023-06-14', '2023-06-14'),
('sfg3s224dsfr5t54aswef2', '1e23dq', 1, 'Ada berbagai jenis bahan tanam yang dapat digunakan dalam budidaya ubi jalar yaitu dengan cara generatif yaitu menggunakan umbi dan dengan cara vegetatif yaitu menggunakan batang nya. Boleh dicoba keduanya untuk tau perbedaan hasilnya, kak.', '2023-05-02', '2023-05-11'),
('vsjk23kl034nads', '1e23dq', 3, 'Hai kak! Ubi merupakan salah satu tanaman yang bisa ditanam pada dataran rendah sampai dataran tinggi. Cara menanam ubi yang baik, yaitu dengan mengecek iklim yang ada pada daerah dengan suhu 21-27 derajat C, lalu sediakan media tanam yang baik, dan pada dataran tinggi cocok ditanam dengan ketinggian 1.000 mdpl yaa...', '2023-06-05', '2023-06-05');

-- --------------------------------------------------------

--
-- Struktur dari tabel `kategori`
--

CREATE TABLE `kategori` (
  `id_kategori` int(11) NOT NULL,
  `nama_kategori` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `kategori`
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
-- Struktur dari tabel `pertanyaan`
--

CREATE TABLE `pertanyaan` (
  `id_pertanyaan` varchar(50) NOT NULL,
  `id` int(11) NOT NULL,
  `judul` varchar(128) NOT NULL,
  `id_kategori` int(11) NOT NULL,
  `isi` text NOT NULL,
  `image` varchar(100) NOT NULL,
  `created_at` date NOT NULL,
  `updated_at` date NOT NULL,
  `upvote` bigint(20) NOT NULL,
  `downvote` bigint(20) NOT NULL,
  `no` bigint(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `pertanyaan`
--

INSERT INTO `pertanyaan` (`id_pertanyaan`, `id`, `judul`, `id_kategori`, `isi`, `image`, `created_at`, `updated_at`, `upvote`, `downvote`, `no`) VALUES
('1e23dq', 4, 'Menanam ubi yang baik pada dataran tinggi', 1, 'Halo kak... Jadi saya kemarin lagi coba menanam ubi tapi saya tinggal di dataran tinggi. Apakah akan berpengaruh pada perkembangan tanaman saya? terima kasih :D', '  ', '2023-06-15', '2023-06-15', 0, 0, 1),
('49d9d88948e1735992f8efadd2bd6643', 27, 'test postman #11', 1, 'test postman #11', '[\"1503adf7bc879024feb92768d5a8cda9.png\",\"6443d9bd78366cdc6357edd0c9c98aff.png\"]', '2023-06-15', '2023-06-15', 0, 0, 13),
('5ebeed3f5f38abae11b552bf1ef45453', 27, 'test postman #10', 1, 'test postman #10', '[\"84a612d44baf40dda251d0aa560fae0b.png\",\"391d978e0c73dfb69e2299ae9433e5bb.png\"]', '2023-06-15', '2023-06-15', 0, 0, 12),
('9205eb0d43489136b4ea6e287f064fcf', 27, 'test postman #12', 1, 'test postman #12', '[\"e404c8f8cf48c076b0d046b6749217ba.png\",\"f46ff9a6e2cbec00f9741f85de4061a4.png\"]', '2023-06-15', '2023-06-15', 0, 0, 14),
('c56795775b45153b51d64da7ebb4c850', 4, 'test postman #1', 1, 'test postman #1', '[\"711af5c45fde66a8227d8f85bf0ef66d.png\",\"fca731fd07ff005097ad8215e7285ce5.png\"]', '2023-06-15', '2023-06-15', 0, 0, 11),
('fgw2dgn', 3, 'Menanam Padi di dalam polybag', 6, 'Apa saja keuntungan dan manfaat menanam padi di dalam polybag?', '  ', '2023-06-14', '2023-06-14', 0, 0, 3),
('h24b456da', 1, 'Alat membajak sawah', 6, 'Apa saja alat yang dibawa petani untuk membajak sawah', '  ', '2023-06-13', '2023-06-15', 0, 0, 4),
('sj12fg4', 2, 'Pohon pisang tidak berbuah selama 1 tahun', 5, 'Kenapa yaa pohon pisang di rumah kakek saya tidak berbuah? kurang lebih dari 1 tahun kemarin. apa ada tahapan tertentu yang dilewatkan? mohon jawabannya, makasih', '  ', '2023-05-02', '2023-05-11', 0, 0, 5);

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`, `image`, `role_id`, `is_active`, `date_created`) VALUES
(1, 'Intan sari duano', 'intan.duano@gmail.com', '$2y$10$jhGcBmz5HJ3OxQkvuRHDUuToxPZXWG86BO7NtSj.Gnb8UcNNXLpni', 'undraw_Mobile_apps_re_3wjf.png', 2, 1, 1685341977),
(2, 'Lukman', 'lukmanullh23@gmail.com', '$2y$10$89Yk2iT1kHr9Rdt3BwtN6u2fz1b.QDCqpHo/qC2wF55Mo0C4ohDj6', 'default.jpg', 2, 1, 1685522858),
(3, 'BERNIKA IRNADIANIS IFFADA', 'bernikaiffada@gmail.com', '$2y$10$e4TxRUnjkEB8gVW.lE7hlekzmnHt7hjcIounEJcNXFPkr2Ep0gzsm', 'indonesia.png', 1, 1, 1686116388),
(4, 'Rasyad', 'rasyadamhar2001@gmail.com', '$2y$10$uDI3WsdpaHeLPV7HJu2XROZc1ydAb3Qz7mjmhIGtQNH/Q4NnOFP0S', '0f3df9ead2cb207d06692da6d8111aa7.png', 2, 1, 1686031354),
(5, 'Zakariya', 'm.zakariya311@gmail.com', '$2y$10$E9DOlAwlnlOg/TCg/ZXSZe6gIdCgVpbrQP6UMGIIQvv6JD2jfxh/a', 'default.jpg', 2, 1, 1686058629),
(23, 'Martika Isna Lidya', 'titik30martika@gmail.com', '$2y$10$3kGEMpSNYNdKBJkOnQINt.8jsA8vQgRgyT51XMwODnjqKwVdlZUUW', 'indonesia1.png', 2, 1, 1686493756),
(27, 'Lumpia Bakar', 'yorunikakeru@exam.com', '$2y$10$ap9lh2TkOv4cTJdT84zJ..4UzyfJ5OrjgGL39qI56j4Crab6w/fPe', '8d2223b5ab4e80fc956640b7a6d8ef54.png', 0, 0, 0),
(28, 'Lumpia Jagung', 'telponrumah@exam.com', '$2y$10$/xvNR3/x1TMDbU3EKaAltuEZeJuS0Ta0I7yKYkoK9hbj6cBkPdC4e', 'd5ba18e7666ef89847d7d73f854f6e03.jpeg', 0, 0, 0);

-- --------------------------------------------------------

--
-- Struktur dari tabel `user_token`
--

CREATE TABLE `user_token` (
  `id` int(11) NOT NULL,
  `email` varchar(128) NOT NULL,
  `token` varchar(128) NOT NULL,
  `date_created` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `user_token`
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
-- Indeks untuk tabel `balasan`
--
ALTER TABLE `balasan`
  ADD PRIMARY KEY (`id_balasan`),
  ADD KEY `id_jawaban` (`id_jawaban`,`id`),
  ADD KEY `id` (`id`);

--
-- Indeks untuk tabel `jawaban`
--
ALTER TABLE `jawaban`
  ADD PRIMARY KEY (`id_jawaban`),
  ADD KEY `id_pertanyaan` (`id_pertanyaan`,`id`),
  ADD KEY `id` (`id`);

--
-- Indeks untuk tabel `kategori`
--
ALTER TABLE `kategori`
  ADD PRIMARY KEY (`id_kategori`);

--
-- Indeks untuk tabel `pertanyaan`
--
ALTER TABLE `pertanyaan`
  ADD PRIMARY KEY (`id_pertanyaan`),
  ADD KEY `pertanyaan_kategori` (`id_kategori`),
  ADD KEY `id` (`id`),
  ADD KEY `no` (`no`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `user_token`
--
ALTER TABLE `user_token`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `kategori`
--
ALTER TABLE `kategori`
  MODIFY `id_kategori` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT untuk tabel `pertanyaan`
--
ALTER TABLE `pertanyaan`
  MODIFY `no` bigint(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT untuk tabel `user_token`
--
ALTER TABLE `user_token`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- Ketidakleluasaan untuk tabel pelimpahan (Dumped Tables)
--

--
-- Ketidakleluasaan untuk tabel `balasan`
--
ALTER TABLE `balasan`
  ADD CONSTRAINT `balasan_jawaban` FOREIGN KEY (`id_jawaban`) REFERENCES `jawaban` (`id_jawaban`),
  ADD CONSTRAINT `balasan_user` FOREIGN KEY (`id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ketidakleluasaan untuk tabel `jawaban`
--
ALTER TABLE `jawaban`
  ADD CONSTRAINT `jawaban_pertanyaan` FOREIGN KEY (`id_pertanyaan`) REFERENCES `pertanyaan` (`id_pertanyaan`),
  ADD CONSTRAINT `jawaban_user` FOREIGN KEY (`id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Ketidakleluasaan untuk tabel `pertanyaan`
--
ALTER TABLE `pertanyaan`
  ADD CONSTRAINT `pertanyaan_kategori` FOREIGN KEY (`id_kategori`) REFERENCES `kategori` (`id_kategori`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `pertanyaan_user` FOREIGN KEY (`id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
