CREATE TABLE IF NOT EXISTS `mdt_criminal_records` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(46) NOT NULL,
  `officer_id` varchar(46) NOT NULL,
  `description` longtext NOT NULL,
  `crimes` longtext DEFAULT NULL,
  `fine` int(11) NOT NULL,
  `jail` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
);

ALTER TABLE users
ADD COLUMN mdt_image VARCHAR(255);
