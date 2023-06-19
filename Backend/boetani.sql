-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Waktu pembuatan: 17 Jun 2023 pada 22.30
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
  `updated_at` date NOT NULL,
  `upvote` int(11) NOT NULL,
  `downvote` int(11) NOT NULL,
  `no` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(8, 'Benih'),
(9, 'Lainnya');

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
  ADD KEY `id` (`id`),
  ADD KEY `id_pertanyaan` (`id_pertanyaan`) USING BTREE,
  ADD KEY `no` (`no`);

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
-- AUTO_INCREMENT untuk tabel `jawaban`
--
ALTER TABLE `jawaban`
  MODIFY `no` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT untuk tabel `kategori`
--
ALTER TABLE `kategori`
  MODIFY `id_kategori` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT untuk tabel `pertanyaan`
--
ALTER TABLE `pertanyaan`
  MODIFY `no` bigint(50) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

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
