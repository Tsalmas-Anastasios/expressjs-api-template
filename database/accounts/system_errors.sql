CREATE TABLE `system_errors` (
  `error_id` int(11) NOT NULL AUTO_INCREMENT,
  `system_part` varchar(20) NOT NULL DEFAULT 'backend',
  `error_code` int(11) NOT NULL DEFAULT 500,
  `error_metadata` mediumtext DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`error_id`),
  CONSTRAINT `system_errors_check` CHECK (`system_part` in ('backend','frontend'))
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='This table saves inside the system''s errors to track them';