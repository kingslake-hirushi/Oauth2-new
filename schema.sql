create schema oauth2newdb;
use oauth2newdb;

CREATE TABLE `client` (
  `id` int NOT NULL AUTO_INCREMENT,
  `clientid` varchar(20) DEFAULT NULL,
  `clientsecret` varchar(20) DEFAULT NULL,
  `datecreated` datetime DEFAULT CURRENT_TIMESTAMP,
  `dateupdated` datetime DEFAULT CURRENT_TIMESTAMP,
  `grants` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `clientid_index` (`clientid`),
  KEY `clientsecret_index` (`clientsecret`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb3;
CREATE TABLE `token` (
  `id` int NOT NULL AUTO_INCREMENT,
  `token` varchar(200) DEFAULT NULL,
  `tokentype` varchar(50) DEFAULT NULL,
  `clientid` varchar(20) DEFAULT NULL,
  `userid` int DEFAULT NULL,
  `expires` timestamp NULL DEFAULT NULL,
  `datecreated` datetime DEFAULT CURRENT_TIMESTAMP,
  `dateupdated` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `userid_index` (`userid`),
  KEY `token_index` (`token`),
  KEY `tokentype_index` (`tokentype`)
) ENGINE=InnoDB AUTO_INCREMENT=351 DEFAULT CHARSET=utf8mb3;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `clientid` varchar(20) DEFAULT NULL,
  `username` varchar(100) DEFAULT NULL,
  `password` varchar(100) DEFAULT NULL,
  `datecreated` datetime DEFAULT CURRENT_TIMESTAMP,
  `dateupdated` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `username_index` (`username`),
  KEY `clientid_index` (`clientid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3;

INSERT INTO `client`
(`clientid`,
`clientsecret`,
`grants`)
VALUES
('clientA',
'clientAsecret',
'password, refresh_token');

INSERT INTO `user`
(`clientid`,
`username`,
`password`)
VALUES
('clientA' , 'userA' , 'userApw1');


