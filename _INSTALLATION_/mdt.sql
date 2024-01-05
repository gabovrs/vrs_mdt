CREATE TABLE IF NOT EXISTS `mdt_criminal_records` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` varchar(46) NOT NULL,
  `officer_id` varchar(46) NOT NULL,
  `description` longtext NOT NULL,
  `crimes` longtext DEFAULT NULL,
  `fine` int(11) NOT NULL,
  `jail` int(11) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `mdt_wanted_players` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `reason` longtext NOT NULL,
  `image` longtext DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
);

ALTER TABLE `users`
ADD COLUMN `mdt_image` VARCHAR(255) DEFAULT NULL;