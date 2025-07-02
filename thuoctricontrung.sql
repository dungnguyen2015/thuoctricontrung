-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th6 28, 2025 lúc 10:13 AM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `thuoctricontrung`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `admins`
--

CREATE TABLE `admins` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Đang đổ dữ liệu cho bảng `admins`
--

INSERT INTO `admins` (`id`, `email`, `password`) VALUES
(1, 'vandung842001@gmail.com', '$2a$12$F5GSWS3kz0vCmnZtnnJ5Uu6EEEk4pEhMMskXnsmdQYEZIXYv9MQyy');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

CREATE TABLE `categories` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `categories`
--

INSERT INTO `categories` (`id`, `name`, `slug`, `created_at`, `updated_at`) VALUES
(1, 'Thuốc diệt kiến', 'thuoc-diet-kien', '2025-06-10 08:21:16', '2025-06-10 08:29:52'),
(2, 'Thuốc diệt cỏ', 'thuoc-diet-co', '2025-06-20 09:21:00', '2025-06-20 09:21:00'),
(3, 'Thuốc diệt muỗi', 'thuoc-diet-muoi', '2025-06-28 03:19:46', '2025-06-28 03:19:46'),
(4, 'Thuốc diệt gián', 'thuoc-diet-gian', '2025-06-28 03:20:40', '2025-06-28 03:20:40'),
(5, 'Thuốc diệt mối', 'thuoc-diet-moi', '2025-06-28 03:20:40', '2025-06-28 03:20:40'),
(6, 'Thuốc diệt ruồi', 'thuoc-diet-ruoi', '2025-06-28 03:21:14', '2025-06-28 03:21:14'),
(7, 'Thuốc diệt bọ chét', 'thuoc-diet-bo-chet', '2025-06-28 03:21:14', '2025-06-28 03:21:14'),
(8, 'Thuốc diệt rệp giường', 'thuoc-diet-rep-giuong', '2025-06-28 03:21:43', '2025-06-28 03:21:43'),
(9, 'Thuốc diệt ve chó', 'thuoc-diet-ve-cho', '2025-06-28 03:21:43', '2025-06-28 03:21:43'),
(10, 'Thuốc diệt chuột', 'thuoc-diet-chuot', '2025-06-28 03:21:58', '2025-06-28 03:21:58');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `category_product`
--

CREATE TABLE `category_product` (
  `category_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `category_product`
--

INSERT INTO `category_product` (`category_id`, `product_id`) VALUES
(1, 1),
(1, 11),
(5, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `images`
--

CREATE TABLE `images` (
  `id` int(11) NOT NULL,
  `slug` varchar(200) NOT NULL,
  `alt` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `images`
--

INSERT INTO `images` (`id`, `slug`, `alt`) VALUES
(20, '/uploads/banner-thuoc-diet-gian.webp', 'Banner thuốc diệt gián'),
(21, '/uploads/banner-thuoc-diet-ruoi.webp', 'banner thuốc diệt ruồi'),
(22, '/uploads/alaska-bottle.webp', 'Thuốc alaska bottle'),
(23, '/uploads/banner-thuoc-diet-kien.webp', 'banner thuốc diệt kiến'),
(24, '/uploads/alfado-10sc-510x510.webp', 'Alfado 10SC');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `title` varchar(191) NOT NULL,
  `slug` varchar(191) NOT NULL,
  `content` text NOT NULL,
  `description` varchar(170) NOT NULL,
  `created_at` datetime(3) NOT NULL DEFAULT current_timestamp(3),
  `viewed` int(11) NOT NULL,
  `visible` tinyint(4) NOT NULL DEFAULT 1,
  `rating` float NOT NULL,
  `counter_rating` int(6) NOT NULL,
  `image_url` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `posts`
--

INSERT INTO `posts` (`id`, `title`, `slug`, `content`, `description`, `created_at`, `viewed`, `visible`, `rating`, `counter_rating`, `image_url`) VALUES
(1265, 'cacdscds', 'cacdscds', '<p>cacdscd</p>', 'dcdsc', '2025-06-28 10:38:30.323', 0, 1, 0, 0, '/uploads/banner-thuoc-diet-ruoi.webp');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `price` decimal(10,2) DEFAULT 0.00,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` enum('active','hidden') DEFAULT 'active',
  `stock_status` enum('in_stock','out_of_stock') DEFAULT 'in_stock',
  `ingredients` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`ingredients`)),
  `content` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`id`, `name`, `slug`, `price`, `description`, `created_at`, `updated_at`, `status`, `stock_status`, `ingredients`, `content`) VALUES
(1, 'Thuốc Alaska', 'thuoc-alaska', 45000.00, 'Thuốc Alaska trị côn trung', '2025-06-10 08:22:09', '2025-06-27 17:00:00', 'active', 'in_stock', '[\"Alpha-Cypermethrin (5% w/w)\",\"Chất phụ gia đặc biệt\",\"Hương chanh tự nhiên\",\"Chất bảo quản an toàn\"]', '<p><strong>Thuốc diệt c&ocirc;n tr&ugrave;ng Alaska</strong> l&agrave; sản phẩm cao cấp với c&ocirc;ng thức đặc biệt gi&uacute;p diệt v&agrave; xua đuổi hiệu quả c&aacute;c loại c&ocirc;n tr&ugrave;ng như muỗi, gi&aacute;n, kiến, ruồi, bọ ch&eacute;t... Chỉ với một lần xịt, Alaska tạo ra m&agrave;ng bảo vệ l&ecirc;n đến 12 giờ, đảm bảo kh&ocirc;ng gian sống lu&ocirc;n trong l&agrave;nh, an to&agrave;n cho sức khỏe gia đ&igrave;nh bạn.</p>\n<h3>C&ocirc;ng dụng ch&iacute;nh:</h3>\n<ul>\n<li>Diệt muỗi, gi&aacute;n, kiến, ruồi, bọ ch&eacute;t v&agrave; c&aacute;c loại c&ocirc;n tr&ugrave;ng kh&aacute;c hiệu quả tức th&igrave;</li>\n<li>Xua đuổi c&ocirc;n tr&ugrave;ng kh&ocirc;ng cho ch&uacute;ng quay trở lại</li>\n<li>Hiệu quả k&eacute;o d&agrave;i đến 12 giờ sau khi sử dụng</li>\n<li>An to&agrave;n cho sức khỏe khi sử dụng đ&uacute;ng hướng dẫn</li>\n<li>Hương chanh dịu nhẹ, kh&ocirc;ng g&acirc;y kh&oacute; chịu</li>\n</ul>\n<h3>Hướng dẫn sử dụng:</h3>\n<ol>\n<li>Lắc đều chai trước khi sử dụng</li>\n<li>Giữ chai thẳng đứng, c&aacute;ch bề mặt cần xử l&yacute; 20-30cm</li>\n<li>Xịt trực tiếp v&agrave;o khu vực c&oacute; c&ocirc;n tr&ugrave;ng hoặc nơi ch&uacute;ng thường xuất hiện</li>\n<li>Xịt v&agrave;o c&aacute;c khe hở, g&oacute;c khuất trong nh&agrave; để ph&ograve;ng ngừa</li>\n<li>Kh&ocirc;ng xịt trực tiếp l&ecirc;n người, thức ăn hoặc vật nu&ocirc;i</li>\n</ol>\n<h3>Th&agrave;nh phần an to&agrave;n:</h3>\n<p>Sản phẩm đ&atilde; được kiểm nghiệm v&agrave; chứng nhận an to&agrave;n bởi Viện Vệ sinh Dịch tễ Trung ương. Với th&agrave;nh phần ch&iacute;nh l&agrave; Alpha-Cypermethrin ở nồng độ an to&agrave;n, kết hợp với hương chanh tự nhi&ecirc;n, Alaska kh&ocirc;ng g&acirc;y k&iacute;ch ứng da v&agrave; an to&agrave;n cho trẻ em khi sử dụng đ&uacute;ng hướng dẫn.</p>\n<div>\n<h4>Cam kết chất lượng</h4>\n<p>Ch&uacute;ng t&ocirc;i cam kết sản phẩm ch&iacute;nh h&atilde;ng, đảm bảo chất lượng v&agrave; hiệu quả diệt c&ocirc;n tr&ugrave;ng. Ho&agrave;n tiền 100% nếu sản phẩm kh&ocirc;ng đạt hiệu quả như c&ocirc;ng bố.</p>\n</div>'),
(11, 'Alfado 10SC', 'alfado-10SC', 75000.00, 'Alfado 10SC là một loại thuốc diệt côn trùng dạng huyền phù (SC) chứa hoạt chất Alpha-Cypermethrin có hiệu quả cao và thời gian tồn lưu kéo dài', '2025-06-27 17:00:00', '2025-06-28 03:28:41', 'active', 'in_stock', '[\"Công ty sản xuất: Á ĐÔNG JAPAN\",\"Alpha-Cypermethrin 10% (100g/L)\",\"Phụ gia huyền phù\"]', '<p><strong>Alfado 10SC</strong>&nbsp;l&agrave; một loại thuốc diệt c&ocirc;n tr&ugrave;ng dạng huyền ph&ugrave; (SC) chứa hoạt chất&nbsp;<strong>Alpha-Cypermethrin</strong>&nbsp;c&oacute; hiệu quả cao v&agrave; thời gian tồn lưu k&eacute;o d&agrave;i. N&oacute; c&oacute; thể &aacute;p dụng để ti&ecirc;u diệt c&aacute;c lo&agrave;i c&ocirc;n tr&ugrave;ng trong nh&agrave; v&agrave; tr&ecirc;n c&acirc;y trồng. Alfado 10SC dễ d&agrave;ng sử dụng v&agrave; kiểm so&aacute;t hầu hết c&aacute;c lo&agrave;i g&acirc;y hại xung quanh bạn.</p>\n<p>Alfado 10SC đ&atilde; được kiểm chứng hi&ecirc;u quả khi c&oacute; khả năng ti&ecirc;u diệt c&aacute;c lo&agrave;i c&ocirc;n tr&ugrave;ng trong nh&agrave; như muỗi, gi&aacute;n, kiến, ruồi, bọ ch&eacute;t. B&ecirc;n cạnh đ&oacute;, h&oacute;a chất tồn lưu n&agrave;y của c&ocirc;ng ty &Aacute; Đ&ocirc;ng cũng được nhiều b&agrave; con n&ocirc;ng d&acirc;n sử dụng để phun c&acirc;y trồng, c&acirc;y ăn tr&aacute;i v&agrave; c&acirc;y cảnh để ph&ograve;ng trừ s&acirc;u bệnh.</p>\n<p>Alfado 10SC cũng được sản xuất theo c&aacute;c ti&ecirc;u chuẩn chất lượng cao v&agrave; được kiểm tra kỹ trước khi đưa v&agrave;o thị trường, đảm bảo an to&agrave;n cho người sử dụng v&agrave; m&ocirc;i trường.</p>');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_capacities`
--

CREATE TABLE `product_capacities` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `capacity` varchar(50) NOT NULL,
  `price` decimal(12,0) NOT NULL,
  `discount_price` decimal(12,0) DEFAULT NULL,
  `in_stock` tinyint(1) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `product_capacities`
--

INSERT INTO `product_capacities` (`id`, `product_id`, `capacity`, `price`, `discount_price`, `in_stock`) VALUES
(117, 11, '100ml', 75000, 0, 1),
(118, 11, '1000ml', 600000, 0, 1),
(119, 1, '300ml', 45000, 35000, 0),
(120, 1, '500ml', 75000, 59000, 1),
(121, 1, '750ml', 105000, 85000, 1),
(122, 1, '1000ml', 140000, 115000, 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_images`
--

CREATE TABLE `product_images` (
  `id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `image_url` varchar(255) NOT NULL,
  `is_primary` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `product_images`
--

INSERT INTO `product_images` (`id`, `product_id`, `image_url`, `is_primary`) VALUES
(49, 11, '/uploads/alfado-10sc-510x510.webp', 1),
(50, 1, '/uploads/alaska-bottle.webp', 1),
(51, 1, '/uploads/alaska-spraying.webp', 0);

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Chỉ mục cho bảng `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Chỉ mục cho bảng `category_product`
--
ALTER TABLE `category_product`
  ADD PRIMARY KEY (`category_id`,`product_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `images`
--
ALTER TABLE `images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `ind_images` (`slug`);

--
-- Chỉ mục cho bảng `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `status_created_at_idx` (`visible`,`created_at`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `slug` (`slug`);

--
-- Chỉ mục cho bảng `product_capacities`
--
ALTER TABLE `product_capacities`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- Chỉ mục cho bảng `product_images`
--
ALTER TABLE `product_images`
  ADD PRIMARY KEY (`id`),
  ADD KEY `product_id` (`product_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `admins`
--
ALTER TABLE `admins`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT cho bảng `images`
--
ALTER TABLE `images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT cho bảng `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1266;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT cho bảng `product_capacities`
--
ALTER TABLE `product_capacities`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=123;

--
-- AUTO_INCREMENT cho bảng `product_images`
--
ALTER TABLE `product_images`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `category_product`
--
ALTER TABLE `category_product`
  ADD CONSTRAINT `category_product_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `category_product_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `product_capacities`
--
ALTER TABLE `product_capacities`
  ADD CONSTRAINT `product_capacities_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `product_images`
--
ALTER TABLE `product_images`
  ADD CONSTRAINT `product_images_ibfk_1` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
