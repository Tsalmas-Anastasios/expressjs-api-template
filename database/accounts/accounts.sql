CREATE TABLE `accounts` (
  `account_id` varchar(48) NOT NULL,
  `username` varchar(100) NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100) NOT NULL,
  `email` varchar(254) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `password` varchar(254) NOT NULL,
  `profile_picture_url` mediumtext DEFAULT NULL,
  `account_type` varchar(100) NOT NULL,
  `activated` tinyint(1) NOT NULL DEFAULT 0,
  `request_password_change` tinyint(1) NOT NULL DEFAULT 0,
  `authentication_2fa__app` tinyint(1) NOT NULL DEFAULT 0,
  `authentication_2fa__app_secret` mediumtext DEFAULT NULL,
  `authentication_2fa__email` tinyint(1) NOT NULL DEFAULT 0,
  `authentication_2fa__phone` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`account_id`),
  UNIQUE KEY `accounts_unique` (`username`,`email`,`phone`),
  CONSTRAINT `accounts_check` CHECK (`account_type` in ('system_admin', 'second_account_type'))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='This table saves the accounts that using the apps';
