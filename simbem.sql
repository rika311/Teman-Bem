-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 26 Jul 2025 pada 11.28
-- Versi server: 10.4.32-MariaDB
-- Versi PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `simbem`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `aspirasi`
--

CREATE TABLE `aspirasi` (
  `id` int(11) NOT NULL,
  `nama` varchar(100) DEFAULT NULL,
  `isi` text DEFAULT NULL,
  `waktu` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `aspirasi`
--

INSERT INTO `aspirasi` (`id`, `nama`, `isi`, `waktu`) VALUES
(42, 'amelia', 'harus begini jadi lebih baik', '2025-07-25'),
(43, 'rika', 'perbanyak ukm', '2025-07-25'),
(44, 'Anonim', 'buat kegiatan yang banyak', '2025-07-26'),
(45, 'rika ', 'banyyak kegiatan ', '2025-07-26');

-- --------------------------------------------------------

--
-- Struktur dari tabel `pengumuman`
--

CREATE TABLE `pengumuman` (
  `id` int(11) NOT NULL,
  `judul` varchar(100) DEFAULT NULL,
  `isi` text DEFAULT NULL,
  `tanggal` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `pengumuman`
--

INSERT INTO `pengumuman` (`id`, `judul`, `isi`, `tanggal`) VALUES
(1, 'coba-coba kegiatan', 'dalam rangka 17 agustus 2025, bem akan mengadakan acar berupa.....', '2025-08-17');

-- --------------------------------------------------------

--
-- Struktur dari tabel `registrasi`
--

CREATE TABLE `registrasi` (
  `id` int(11) NOT NULL,
  `nama` varchar(100) DEFAULT NULL,
  `nim` varchar(10) DEFAULT NULL,
  `stambuk` varchar(4) DEFAULT NULL,
  `alamat` varchar(100) DEFAULT NULL,
  `tempatlahir` varchar(50) DEFAULT NULL,
  `tanggallahir` datetime DEFAULT NULL,
  `nohp` varchar(15) DEFAULT NULL,
  `email` varchar(35) DEFAULT NULL,
  `prodi` varchar(40) DEFAULT NULL,
  `IPK` varchar(5) DEFAULT NULL,
  `alasan` text DEFAULT NULL,
  `pengalaman` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `registrasi`
--

INSERT INTO `registrasi` (`id`, `nama`, `nim`, `stambuk`, `alamat`, `tempatlahir`, `tanggallahir`, `nohp`, `email`, `prodi`, `IPK`, `alasan`, `pengalaman`) VALUES
(1, 'rika amelia', '22040041', '', 'suka maju ', 'stabat ', '2015-06-10 00:00:00', '08997745', 'rikaaa.localhost@gmail.com', 'teknik informatika', '4,00', 'ikut teman', 'tidak ada'),
(2, 'AMELIA ', '229870', '', 'pura ', 'batu bara ', '1995-12-30 00:00:00', '0877262929', 'cukacuka@gmail.com', 'Teknologi Informasi (S1)', '4,00', 'ingin ikut saja', 'banyak'),
(3, 'AMELIA ', '229870', '', 'pura ', 'batu bara ', '1995-12-30 00:00:00', '0877262929', 'cukacuka@gmail.com', 'Teknologi Informasi (S1)', '4,00', 'ingin ikut saja', 'banyak'),
(4, 'Cikaku', '098292739', '', 'sei rebat ', 'karang ', '0000-00-00 00:00:00', '08927282628', 'cika@local.host', 'Teknik Elektro (S1)', '4.00', 'ingin saja ', '5'),
(5, 'luthfy', '072926729', '', 'tanjung pura', 'binjai ', '0000-00-00 00:00:00', '09202820', 'luthfy@localhost', 'Rekayasa Perangkat Lunak (S1)', '4.00', 'ingin saja ', '7'),
(6, 'putri ', '2208679', '', 'batang ', 'sawit', '0000-00-00 00:00:00', '029202298', 'putri@local.host', 'Teknik Informatika (S1)', '4.00', 'ingin', '9'),
(7, 'test', '123123', '2023', 'jlkana', 'jalan', '2016-01-24 12:04:00', '08213123', '2312', 'Akuntansi (D3)', '5.00', 'dawd', '23'),
(8, '3123', '', '', '', '', '0000-00-00 00:00:00', '', '', '', '', '', ''),
(9, 'anggara', '', '', '', '', '0000-00-00 00:00:00', '', '', '', '', '', ''),
(10, 'Dinda ', '12345', '2021', 'stabat', 'medan', '2003-03-26 16:18:00', '0897654', 'dinda@localhost', 'Teknologi Informasi (S1)', '3,20', 'ingin saja ', 'ga ada');

-- --------------------------------------------------------

--
-- Struktur dari tabel `users`
--

CREATE TABLE `users` (
  `id` int(20) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`) VALUES
(20, 'amelia', 'kaka@locak.host', '123'),
(50, 'Rika Amelia', 'rika@localhost', '123'),
(51, 'test', 'admin', 'admin');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `aspirasi`
--
ALTER TABLE `aspirasi`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `pengumuman`
--
ALTER TABLE `pengumuman`
  ADD PRIMARY KEY (`id`) USING BTREE;

--
-- Indeks untuk tabel `registrasi`
--
ALTER TABLE `registrasi`
  ADD PRIMARY KEY (`id`);

--
-- Indeks untuk tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `aspirasi`
--
ALTER TABLE `aspirasi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT untuk tabel `pengumuman`
--
ALTER TABLE `pengumuman`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT untuk tabel `registrasi`
--
ALTER TABLE `registrasi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT untuk tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
