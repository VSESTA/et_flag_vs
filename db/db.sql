-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Tempo de geração: 19-Nov-2023 às 20:30
-- Versão do servidor: 10.4.28-MariaDB
-- versão do PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `expense_tracker`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `category`
--

CREATE TABLE `category` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `category`
--

INSERT INTO `category` (`id`, `name`, `description`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'CASA', 'Despesas gerais da casa', 1, '2023-10-23 19:16:08', NULL),
(2, 'REFEICOES', 'cdcsdv', 0, '2023-11-06 21:30:49', '2023-11-17 20:51:28'),
(3, 'EDUCACAO', '', 1, '2023-11-06 21:31:07', NULL),
(4, 'IMPOSTOS', '', 1, '2023-11-06 21:31:28', NULL),
(5, 'LAZER', '', 1, '2023-11-06 21:31:48', NULL),
(6, 'VIAGENS', '', 1, '2023-11-06 21:32:01', NULL),
(7, 'NATAL', 'compras de natal 2023', 0, '2023-11-16 21:22:35', '2023-11-16 21:27:42'),
(8, 'FESTA', '', 0, '2023-11-17 19:16:27', '2023-11-17 19:16:51');

-- --------------------------------------------------------

--
-- Estrutura da tabela `expense`
--

CREATE TABLE `expense` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `date` timestamp NULL DEFAULT NULL,
  `category_id` int(11) NOT NULL,
  `total_amount` decimal(10,2) NOT NULL,
  `is_split` tinyint(1) NOT NULL,
  `status_id` int(11) NOT NULL,
  `notes` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_by` int(11) NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `updated_by` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `expense`
--

INSERT INTO `expense` (`id`, `name`, `date`, `category_id`, `total_amount`, `is_split`, `status_id`, `notes`, `created_at`, `created_by`, `updated_at`, `updated_by`) VALUES
(54, 'jantar', '2023-03-12 00:00:00', 1, 18.00, 1, 1, 'Para dividir', '2023-11-06 20:22:49', 11, NULL, 11),
(55, 'chavenas', '2012-04-22 23:00:00', 2, 34.00, 0, 1, '', '2023-11-06 21:56:01', 11, NULL, NULL),
(57, 'comprimidos', '2023-05-03 23:00:00', 4, 14.00, 1, 3, 'medicamentos', '2023-11-06 22:13:30', 11, NULL, 11),
(58, 'casa', '2023-05-03 23:00:00', 4, 12.00, 1, 1, '', '2023-11-07 19:30:11', 11, NULL, NULL),
(59, 'er', '2033-04-03 23:00:00', 1, 23.00, 1, 1, '', '2023-11-07 20:05:36', 11, NULL, NULL),
(60, 'rttr', '2022-09-29 23:00:00', 2, 6.00, 0, 1, '', '2023-11-07 20:30:26', 11, NULL, NULL),
(61, 'werwer', '2022-05-03 23:00:00', 5, 4.00, 1, 1, 'teste', '2023-11-07 20:38:50', 11, NULL, NULL),
(62, 'werwer', '2022-05-03 23:00:00', 5, 4.00, 1, 1, 'teste', '2023-11-07 20:39:25', 11, NULL, NULL),
(63, 'ewrewr', '2022-04-22 23:00:00', 2, 23.00, 0, 1, '2332', '2023-11-07 21:04:13', 11, NULL, 11),
(64, '2323', '2023-03-23 00:00:00', 4, 2.00, 1, 1, '23', '2023-11-07 21:04:38', 11, NULL, NULL),
(67, 'dar', '2023-04-02 23:00:00', 2, 3.00, 1, 1, '', '2023-11-08 20:36:47', 11, NULL, NULL),
(68, '3', '2023-03-04 00:00:00', 2, 23.00, 1, 1, '', '2023-11-08 20:38:44', 11, NULL, 11),
(69, 'ere', '2023-03-30 23:00:00', 3, 34.00, 1, 1, '', '2023-11-08 20:48:40', 11, NULL, NULL),
(70, '4r', '2002-02-20 00:00:00', 2, 34.00, 0, 1, '34', '2023-11-09 20:06:39', 11, NULL, 11),
(71, 'sofá', '2023-11-10 00:00:00', 1, 500.00, 1, 1, '', '2023-11-09 20:49:35', 10, NULL, 11),
(72, 'habilitação de herdeiros', '2023-11-09 00:00:00', 4, 500.00, 1, 1, 'para dividir com o ze', '2023-11-09 22:31:12', 11, NULL, NULL),
(73, 'carnaval', '2023-02-05 00:00:00', 5, 150.00, 1, 1, 'disfarces para dividir com o ze e a sandra', '2023-11-09 22:48:43', 12, NULL, 12),
(74, 'chocolates', '2023-10-22 23:00:00', 2, 3.00, 0, 3, '', '2023-11-13 19:57:35', 11, NULL, 11),
(75, 'CDSKJVFDLÇKJV', '2023-02-02 00:00:00', 6, 3445.00, 0, 4, '', '2023-11-13 20:14:25', 11, NULL, 11),
(76, 'despesa de teste', '2023-02-01 00:00:00', 3, 25.00, 0, 3, 'sem nada a dizer', '2023-11-15 19:20:38', 11, NULL, NULL),
(77, 'palmier', '2023-10-16 23:00:00', 2, 5.00, 1, 3, 'palmier para o escritorio', '2023-11-16 19:46:22', 1, NULL, 1),
(78, 'Supermercado', '2023-11-12 00:00:00', 1, 150.00, 1, 1, 'compras do mês', '2023-11-17 18:59:47', 1, NULL, NULL),
(79, 'despesa', '2023-10-22 23:00:00', 3, 20.00, 0, 1, '', '2023-11-17 19:07:50', 11, NULL, NULL),
(80, 'despesa 2', '2023-10-12 23:00:00', 3, 10.00, 1, 1, '', '2023-11-17 19:08:21', 11, NULL, NULL),
(81, 'cena', '2023-10-01 23:00:00', 3, 30.00, 1, 1, 'livros', '2023-11-17 19:12:30', 11, NULL, NULL),
(82, 'despesa 3', '2023-11-17 00:00:00', 5, 48.00, 1, 1, 'jogos', '2023-11-17 20:44:55', 11, NULL, 11),
(83, 'despesa 5', '2023-11-17 00:00:00', 5, 50.00, 1, 1, 'jogos', '2023-11-17 20:46:50', 11, NULL, 11),
(84, 'cena', '2023-11-13 00:00:00', 1, 234.00, 1, 3, '', '2023-11-17 20:57:41', 1, NULL, NULL),
(85, 'desss', '2023-09-11 23:00:00', 6, 23456.00, 1, 1, '', '2023-11-19 19:08:30', 1, NULL, NULL);

-- --------------------------------------------------------

--
-- Estrutura da tabela `expense_detail`
--

CREATE TABLE `expense_detail` (
  `id` int(11) DEFAULT NULL,
  `file_name` varchar(255) NOT NULL,
  `file_path` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estrutura da tabela `expense_user`
--

CREATE TABLE `expense_user` (
  `id` int(11) NOT NULL,
  `expense_id` int(10) NOT NULL,
  `user_id` int(11) NOT NULL,
  `owner_id` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `status_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `expense_user`
--

INSERT INTO `expense_user` (`id`, `expense_id`, `user_id`, `owner_id`, `amount`, `status_id`, `created_at`, `updated_at`) VALUES
(30, 54, 10, 11, 12.00, 1, '2023-11-06 21:01:21', NULL),
(31, 54, 1, 11, 4.00, 1, '2023-11-06 21:02:31', NULL),
(33, 58, 2, 11, 12.00, 1, '2023-11-07 19:30:43', NULL),
(34, 59, 1, 11, 23.00, 3, '2023-11-07 20:05:42', '2023-11-17 20:58:27'),
(35, 62, 2, 11, 1.00, 1, '2023-11-07 20:39:37', NULL),
(36, 62, 1, 11, 2.00, 1, '2023-11-07 20:42:03', NULL),
(46, 68, 1, 11, 23.00, 1, '2023-11-08 20:41:56', NULL),
(49, 70, 2, 11, 4.00, 1, '2023-11-09 20:08:57', NULL),
(50, 71, 11, 10, 250.00, 3, '2023-11-09 20:49:49', '2023-11-14 23:18:07'),
(51, 72, 2, 11, 240.00, 1, '2023-11-09 22:31:24', NULL),
(52, 73, 2, 12, 50.00, 1, '2023-11-09 22:48:53', NULL),
(54, 73, 11, 12, 75.00, 3, '2023-11-14 22:12:58', NULL),
(55, 57, 12, 11, 10.00, 3, '2023-11-15 19:21:51', NULL),
(56, 77, 11, 1, 2.00, 3, '2023-11-16 19:59:49', NULL),
(57, 78, 11, 1, 75.00, 3, '2023-11-17 18:59:56', '2023-11-17 20:48:52'),
(58, 80, 1, 11, 5.00, 1, '2023-11-17 19:08:42', NULL),
(59, 81, 10, 11, 15.00, 1, '2023-11-17 19:13:12', NULL),
(60, 83, 10, 11, 5.00, 1, '2023-11-17 20:47:02', NULL),
(61, 84, 11, 1, 23.00, 3, '2023-11-17 20:58:07', NULL),
(62, 84, 12, 1, 23.00, 4, '2023-11-17 20:58:13', NULL),
(63, 85, 11, 1, 34.00, 3, '2023-11-19 19:08:39', '2023-11-19 19:09:12');

-- --------------------------------------------------------

--
-- Estrutura da tabela `status`
--

CREATE TABLE `status` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `is_active` tinyint(1) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `status`
--

INSERT INTO `status` (`id`, `name`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'ACTIVE', 1, '2023-10-23 19:17:29', NULL),
(3, 'PAID', 1, '2023-10-23 19:18:04', NULL),
(4, 'CANCELLED', 1, '2023-10-23 19:18:20', NULL);

-- --------------------------------------------------------

--
-- Estrutura da tabela `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `is_admin` tinyint(1) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Extraindo dados da tabela `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`, `avatar`, `is_admin`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 'Gi', 'gi@gmail.com', '$2a$10$uqi26Ci8ltBC9QMtSKpYmOpOqVHuQl/ZI/RR85wlrUU8bjfhU9VNq', '', 1, 1, '2023-10-23 19:19:39', '2023-11-16 19:44:25'),
(2, 'ze', 'ze@mail.com', '123', NULL, 0, 0, '2023-10-27 18:09:00', '2023-11-17 20:50:42'),
(10, 'vitorino silva', 'vitorino@mail.com', '$2a$10$w0a9xxlISbUFliLpF1L4venIYUwy9fW1nJYhrmolLHxN1nOleFhze', NULL, 0, 1, '2023-10-27 19:35:57', '2023-11-17 20:50:48'),
(11, 'sandra v', 'sandra@mail.com', '$2a$10$EYLkvNtFjcc/Yqdybesk3.taBuT6HeYPWY7fjUCAuLYeoJl5Zost.', NULL, 1, 1, '2023-10-29 18:51:15', '2023-11-17 20:49:35'),
(12, 'Silvina', 'silvina@mail.com', '$2a$10$MNjY8zmf5k2pzjcOU0Viue9Ap81h2vw4hMBj0WWP6xuhSwQ91o56q', NULL, 1, 1, '2023-11-09 22:47:38', '2023-11-17 20:50:57'),
(13, 'adm', 'adm@mail.com', '$2a$10$yJ1vgz8IxoIY9Oq6vL07euJdImkrEOPELxFnlL5rQcdAvC4E50KZu', NULL, 1, 1, '2023-11-19 19:26:41', NULL);

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `category`
--
ALTER TABLE `category`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `expense`
--
ALTER TABLE `expense`
  ADD PRIMARY KEY (`id`),
  ADD KEY `expense_ibfk_1` (`category_id`),
  ADD KEY `expense_ibfk_2` (`created_by`),
  ADD KEY `expense_ibfk_3` (`status_id`),
  ADD KEY `expense_ibfk_4` (`updated_by`);

--
-- Índices para tabela `expense_detail`
--
ALTER TABLE `expense_detail`
  ADD KEY `expense_detail_ibfk_1` (`id`);

--
-- Índices para tabela `expense_user`
--
ALTER TABLE `expense_user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `expense_user_ibfk_1` (`expense_id`),
  ADD KEY `expense_user_ibfk_2` (`status_id`),
  ADD KEY `owner_id` (`owner_id`);

--
-- Índices para tabela `status`
--
ALTER TABLE `status`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `category`
--
ALTER TABLE `category`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de tabela `expense`
--
ALTER TABLE `expense`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=86;

--
-- AUTO_INCREMENT de tabela `expense_user`
--
ALTER TABLE `expense_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=64;

--
-- AUTO_INCREMENT de tabela `status`
--
ALTER TABLE `status`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de tabela `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Restrições para despejos de tabelas
--

--
-- Limitadores para a tabela `expense`
--
ALTER TABLE `expense`
  ADD CONSTRAINT `expense_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `expense_ibfk_2` FOREIGN KEY (`created_by`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `expense_ibfk_3` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `expense_ibfk_4` FOREIGN KEY (`updated_by`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Limitadores para a tabela `expense_detail`
--
ALTER TABLE `expense_detail`
  ADD CONSTRAINT `expense_detail_ibfk_1` FOREIGN KEY (`id`) REFERENCES `expense` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Limitadores para a tabela `expense_user`
--
ALTER TABLE `expense_user`
  ADD CONSTRAINT `expense_user_ibfk_1` FOREIGN KEY (`expense_id`) REFERENCES `expense` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `expense_user_ibfk_2` FOREIGN KEY (`status_id`) REFERENCES `status` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `expense_user_ibfk_3` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
