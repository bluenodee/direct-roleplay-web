-- MariaDB dump 10.19  Distrib 10.4.32-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: rio_roleplay
-- ------------------------------------------------------
-- Server version	12.3.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account_devices`
--

DROP TABLE IF EXISTS `account_devices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `account_devices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account_id` int(11) DEFAULT NULL,
  `mta_serial` VARCHAR(255) DEFAULT NULL,
  `last_used_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account_devices`
--

LOCK TABLES `account_devices` WRITE;
/*!40000 ALTER TABLE `account_devices` DISABLE KEYS */;
INSERT INTO `account_devices` VALUES (1,4,'D05B98F8974B59C37D52F4D7627EB333',1787934390),(2,7,'D05B98F8974B59C37D52F4D7627EB333',1787940064);
/*!40000 ALTER TABLE `account_devices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `accounts`
--

DROP TABLE IF EXISTS `accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `accounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(75) DEFAULT NULL,
  `password` VARCHAR(255) DEFAULT NULL,
  `token` varchar(32) DEFAULT NULL,
  `email` VARCHAR(255) DEFAULT NULL,
  `avatar` VARCHAR(255) DEFAULT 'default.png',
  `banner` VARCHAR(255) DEFAULT NULL,
  `bio` VARCHAR(500) DEFAULT NULL,
  `created_at` int(11) DEFAULT NULL,
  `points` int(11) DEFAULT 0,
  `admin_rank` varchar(20) DEFAULT 'User',
  `last_login` int(11) DEFAULT NULL,
  `whitelist` tinyint(1) DEFAULT 0,
  `discord_id` varchar(25) DEFAULT NULL,
  `connected` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `idx_account` (`account`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `accounts`
--

LOCK TABLES `accounts` WRITE;
/*!40000 ALTER TABLE `accounts` DISABLE KEYS */;
INSERT INTO `accounts` VALUES (1,'hadiixfilm','\\/mXjBefFp7v6/wDrUVtwuwbrxZgxnNDak5sBJCHw68bYXeCszXGG','tok_hadiixfilm',NULL,'default.png',NULL,NULL,1787917050,0,'Admin',NULL,1,'100000000000000000',0),(4,'hadibuilds','$2y$10$qCLfR9AIFtwiVhW.RGyv.ezGh4Qu7g9YdyMDeTywj3DTBZKceKHLm','fdf56ab9c36d8235bc3155804fa36a23','bluenode@gmail.com','default.png',NULL,NULL,1787930353,0,'User',1788005496,1,'100000000000000000',0),(5,'websitetest','$2y$10$6pdItxRedmbjoAUHUBXqietDSVeMhO5SDJ2gJzzJSkRmvXw2UzHSW','0759954952c94d97da3755de7668e149','test@riorp.com','default.png',NULL,NULL,NULL,0,'User',NULL,1,'100000000000000000',0),(6,'profiletest','$2y$10$iIu932Ea24UZClb1I94HbObQjpMARcLlqXgkNfToKur2U46YQ7mpO','9ce897ee5814dd6e923de6284afef8f7','profile@test.com','default.png',NULL,NULL,NULL,0,'User',1788005373,1,'100000000000000000',0),(7,'bluenode','$2y$10$nzdE6vRUkgJ.yuRx5nw3ie8YW1Q/tqaPsUaSckiiVq3E9KVS5axTS','6ce45f5b825acd80d87fa3b36a9f0b7c','bluenode1@gmail.com','default.png',NULL,NULL,NULL,0,'User',1788005543,1,'100000000000000000',0);
/*!40000 ALTER TABLE `accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `advantages`
--

DROP TABLE IF EXISTS `advantages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `advantages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `character_id` int(11) NOT NULL,
  `advantage` varchar(100) NOT NULL,
  `expire_at` bigint(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `advantages`
--

LOCK TABLES `advantages` WRITE;
/*!40000 ALTER TABLE `advantages` DISABLE KEYS */;
/*!40000 ALTER TABLE `advantages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `arrests`
--

DROP TABLE IF EXISTS `arrests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `arrests` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `arrested` int(11) DEFAULT NULL,
  `cop` int(11) DEFAULT NULL,
  `cop_name` VARCHAR(255) DEFAULT NULL,
  `description` VARCHAR(255) DEFAULT NULL,
  `articles` VARCHAR(255) DEFAULT NULL,
  `time` int(11) DEFAULT NULL,
  `timeLapsed` int(11) DEFAULT 0,
  `accomplished` int(11) DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `arrests`
--

LOCK TABLES `arrests` WRITE;
/*!40000 ALTER TABLE `arrests` DISABLE KEYS */;
/*!40000 ALTER TABLE `arrests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bank_accounts`
--

DROP TABLE IF EXISTS `bank_accounts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bank_accounts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `player_id` int(11) NOT NULL,
  `owner` varchar(255) DEFAULT NULL,
  `card_number` text NOT NULL,
  `balance` int(11) NOT NULL DEFAULT 0,
  `logs` VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_bank_accounts_player_id` (`player_id`),
  KEY `idx_bank_accounts_owner` (`owner`),
  KEY `idx_player_id` (`player_id`),
  KEY `idx_owner` (`owner`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bank_accounts`
--

LOCK TABLES `bank_accounts` WRITE;
/*!40000 ALTER TABLE `bank_accounts` DISABLE KEYS */;
/*!40000 ALTER TABLE `bank_accounts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bank_history`
--

DROP TABLE IF EXISTS `bank_history`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bank_history` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `character_id` int(11) NOT NULL,
  `history` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bank_history`
--

LOCK TABLES `bank_history` WRITE;
/*!40000 ALTER TABLE `bank_history` DISABLE KEYS */;
/*!40000 ALTER TABLE `bank_history` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bank_logs`
--

DROP TABLE IF EXISTS `bank_logs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bank_logs` (
  `id` int(11) DEFAULT NULL,
  `logs` VARCHAR(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bank_logs`
--

LOCK TABLES `bank_logs` WRITE;
/*!40000 ALTER TABLE `bank_logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `bank_logs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bans`
--

DROP TABLE IF EXISTS `bans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bans` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `identifier` varchar(255) DEFAULT NULL,
  `identifier_type` varchar(50) DEFAULT NULL,
  `reason` VARCHAR(255) DEFAULT NULL,
  `admin` VARCHAR(255) DEFAULT NULL,
  `unban_time` int(11) DEFAULT NULL,
  `banned_at` int(11) DEFAULT NULL,
  `active` tinyint(1) DEFAULT 1,
  PRIMARY KEY (`id`),
  KEY `idx_bans` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bans`
--

LOCK TABLES `bans` WRITE;
/*!40000 ALTER TABLE `bans` DISABLE KEYS */;
/*!40000 ALTER TABLE `bans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `bike_rentals`
--

DROP TABLE IF EXISTS `bike_rentals`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `bike_rentals` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `player_id` int(11) DEFAULT NULL,
  `rent_plan` varchar(20) DEFAULT NULL,
  `rent_start` int(11) DEFAULT NULL,
  `rent_end` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_bike_rentals` (`player_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bike_rentals`
--

LOCK TABLES `bike_rentals` WRITE;
/*!40000 ALTER TABLE `bike_rentals` DISABLE KEYS */;
INSERT INTO `bike_rentals` VALUES (1,2,'1',1787930453,1793114453),(2,3,'2',1787940212,1824228212);
/*!40000 ALTER TABLE `bike_rentals` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `characters`
--

DROP TABLE IF EXISTS `characters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `characters` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` int(11) DEFAULT NULL,
  `name` VARCHAR(255) DEFAULT NULL,
  `age` int(2) DEFAULT 18,
  `employment` VARCHAR(255) DEFAULT 'Nenhum',
  `level` int(3) DEFAULT 0,
  `exp` int(15) DEFAULT 0,
  `money` int(11) DEFAULT 2500,
  `bank` int(11) DEFAULT 2000,
  `health` int(3) DEFAULT 100,
  `armor` int(3) DEFAULT 0,
  `hunger` int(3) DEFAULT 100,
  `thirst` int(3) DEFAULT 100,
  `phone_number` VARCHAR(255) DEFAULT '',
  `sex` VARCHAR(255) DEFAULT 'male',
  `color` VARCHAR(255) DEFAULT 'whi',
  `skin` int(11) DEFAULT NULL,
  `clothes` VARCHAR(255) DEFAULT NULL,
  `accessories` VARCHAR(255) DEFAULT '[]',
  `hometown` VARCHAR(255) DEFAULT NULL,
  `position` VARCHAR(255) DEFAULT NULL,
  `inventorySlots` int(11) DEFAULT 24,
  `played_time` int(11) DEFAULT 0,
  `created_at` int(11) DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `idx_characters` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `characters`
--

LOCK TABLES `characters` WRITE;
/*!40000 ALTER TABLE `characters` DISABLE KEYS */;
INSERT INTO `characters` VALUES (1,1,'Hadi Builds',22,'Nenhum',0,0,2500,2000,100,0,100,100,'9551234567','male','ara',1,'{\"overlays\":{},\"head\":\"head_1\",\"hair\":{\"cloth\":\"male_hair_1\",\"props\":{\"color\":[0,0,0]}},\"torso\":{\"cloth\":\"male_torso_1\",\"props\":{\"color\":[0,0,0]}},\"undershirt\":{\"cloth\":\"male_undershirt_1\",\"props\":{\"color\":[0,0,0]}},\"shoes\":{\"cloth\":\"male_shoes_1\",\"props\":{\"color\":[0,0,0]}},\"legs\":{\"cloth\":\"male_legs_1\",\"props\":{\"color\":[0,0,0]}}}','[]','Los Santos',NULL,24,0,1787917257),(2,4,'Hadi Morley',29,'Nenhum',0,0,2000,2000,94,0,83,73,'918535925','male','whi',1,'[{\"overlays\":{\"eye\":[1,21,21,21],\"eyebrow\":[1,31,27,25]},\"head\":\"head_1\",\"legs\":\"male_short_1\",\"torso\":\"male_tshirt_1\",\"hair\":{\"cloth\":\"hair_0\",\"props\":{\"color\":[0,0,0]}}}]','[ [ ] ]','Los Santos','[ { \"Rotation\": [ 0, 0, 289.5793151855469 ], \"Interior\": 0, \"Dimension\": 0, \"Position\": [ 2160.822265625, -1744.384765625, 13.546875 ] } ]',24,6715,1787930375),(3,7,'Bluenode Marketplace',36,'Nenhum',0,0,1300,0,100,0,99,98,'933485925','male','whi',1,'[ { \"overlays\": { \"eyebrow\": [ 1, 31, 27, 25 ], \"eye\": [ 1, 21, 21, 21 ], \"hair\": [ 17, 100, 144, 255 ] }, \"head\": \"head_1\", \"legs\": \"male_jogger_11\", \"torso\": \"male_jacket_7\", \"feet\": \"male_flipflop_1\", \"hair\": { \"cloth\": \"male_hair_5\", \"props\": { \"color\": [ 40.799999, 40.799999, 40.799999 ] } } } ]','[ [ ] ]','Los Santos','[ { \"Rotation\": [ 0, 0, 75.468994140625 ], \"Interior\": 0, \"Dimension\": 0, \"Position\": [ 2231.396484375, -1654.94140625, 15.29848575592041 ] } ]',24,630,1787940112);
/*!40000 ALTER TABLE `characters` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chats`
--

DROP TABLE IF EXISTS `chats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chats` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `app` text NOT NULL,
  `user` text NOT NULL,
  `contact` text NOT NULL,
  `lastMessage` text NOT NULL,
  `timeSent` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_chats_app` (`app`(1024)),
  KEY `idx_chats_user` (`user`(1024)),
  KEY `idx_chats_contact` (`contact`(1024)),
  KEY `idx_app` (`app`(1024)),
  KEY `idx_user` (`user`(1024)),
  KEY `idx_contact` (`contact`(1024))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chats`
--

LOCK TABLES `chats` WRITE;
/*!40000 ALTER TABLE `chats` DISABLE KEYS */;
/*!40000 ALTER TABLE `chats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `chats_groups`
--

DROP TABLE IF EXISTS `chats_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `chats_groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` text NOT NULL,
  `description` text NOT NULL,
  `profileImageUrl` VARCHAR(255) DEFAULT NULL,
  `members` text NOT NULL,
  `lastMessage` text NOT NULL,
  `timeSent` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_chats_groups_name` (`name`(1024)),
  KEY `idx_name` (`name`(1024))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `chats_groups`
--

LOCK TABLES `chats_groups` WRITE;
/*!40000 ALTER TABLE `chats_groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `chats_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `group_members`
--

DROP TABLE IF EXISTS `group_members`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `group_members` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `group_id` int(11) NOT NULL,
  `character_id` int(11) NOT NULL,
  `role` varchar(255) NOT NULL,
  `joined_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group_members`
--

LOCK TABLES `group_members` WRITE;
/*!40000 ALTER TABLE `group_members` DISABLE KEYS */;
/*!40000 ALTER TABLE `group_members` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groups`
--

DROP TABLE IF EXISTS `groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `groups` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `leader` int(11) DEFAULT NULL,
  `roles` VARCHAR(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groups`
--

LOCK TABLES `groups` WRITE;
/*!40000 ALTER TABLE `groups` DISABLE KEYS */;
/*!40000 ALTER TABLE `groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `houses`
--

DROP TABLE IF EXISTS `houses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `houses` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) DEFAULT NULL,
  `model` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `owner` int(11) DEFAULT NULL,
  `entrance` varchar(100) NOT NULL,
  `locked` tinyint(1) DEFAULT 1,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `houses`
--

LOCK TABLES `houses` WRITE;
/*!40000 ALTER TABLE `houses` DISABLE KEYS */;
/*!40000 ALTER TABLE `houses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `invoices`
--

DROP TABLE IF EXISTS `invoices`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `invoices` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` VARCHAR(255) DEFAULT NULL,
  `ref` VARCHAR(255) DEFAULT NULL,
  `date` int(11) DEFAULT NULL,
  `price` VARCHAR(255) DEFAULT NULL,
  `amount` float NOT NULL,
  `status` VARCHAR(255) DEFAULT NULL,
  `method` VARCHAR(255) DEFAULT NULL,
  `gived` VARCHAR(255) DEFAULT NULL,
  `coupon` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `invoices`
--

LOCK TABLES `invoices` WRITE;
/*!40000 ALTER TABLE `invoices` DISABLE KEYS */;
/*!40000 ALTER TABLE `invoices` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `items`
--

DROP TABLE IF EXISTS `items`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `items` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `owner` int(11) NOT NULL,
  `ownerType` enum('player','vehicle','object') NOT NULL DEFAULT 'player',
  `slot` int(11) NOT NULL DEFAULT 1,
  `actionbar` int(11) NOT NULL DEFAULT 0,
  `item` int(11) NOT NULL,
  `amount` int(11) NOT NULL DEFAULT 1,
  `ammo` int(3) NOT NULL DEFAULT 0,
  `duty` tinyint(1) NOT NULL DEFAULT 0,
  `data` VARCHAR(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `items`
--

LOCK TABLES `items` WRITE;
/*!40000 ALTER TABLE `items` DISABLE KEYS */;
INSERT INTO `items` VALUES (2,2,'player',1,0,69,1,0,0,'[ [ ] ]'),(4,3,'player',1,0,40,1,0,0,'[ [ ] ]'),(5,3,'player',4,0,50,1,0,0,'[ [ ] ]'),(6,3,'player',2,0,57,1,0,0,'[ [ ] ]'),(7,3,'player',2,0,61,1,0,0,'[ [ ] ]');
/*!40000 ALTER TABLE `items` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `messages` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `receiver` text NOT NULL,
  `sender` text NOT NULL,
  `content` text NOT NULL,
  `timeSent` text NOT NULL,
  `type` text NOT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_messages_receiver` (`receiver`(1024)),
  KEY `idx_messages_sender` (`sender`(1024)),
  KEY `idx_receiver` (`receiver`(1024)),
  KEY `idx_sender` (`sender`(1024))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vehicles`
--

DROP TABLE IF EXISTS `vehicles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `vehicles` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `model` text NOT NULL,
  `owner` text NOT NULL,
  `state` int(11) DEFAULT 0,
  `plate` text NOT NULL,
  `fuel` int(11) DEFAULT 10,
  `health` int(11) DEFAULT 1000,
  `handling` text NOT NULL,
  `upgrades` text NOT NULL,
  `tuning` VARCHAR(500) NOT NULL DEFAULT '[\\]',
  `wheels` text NOT NULL,
  `components` text NOT NULL,
  `first_owner` text NOT NULL,
  `kilometraggio` int(11) DEFAULT 0,
  `serie` int(11) DEFAULT 0,
  `color` text NOT NULL,
  `return_at` int(11) DEFAULT 0,
  `tuning_data` VARCHAR(500) NOT NULL DEFAULT '[]',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vehicles`
--

LOCK TABLES `vehicles` WRITE;
/*!40000 ALTER TABLE `vehicles` DISABLE KEYS */;
/*!40000 ALTER TABLE `vehicles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `whitelist`
--

DROP TABLE IF EXISTS `whitelist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `whitelist` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `token` varchar(255) NOT NULL,
  `serial` varchar(255) NOT NULL,
  `account_id` varchar(255) DEFAULT NULL,
  `access` tinyint(1) DEFAULT 0,
  `created_at` timestamp NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `whitelist`
--

LOCK TABLES `whitelist` WRITE;
/*!40000 ALTER TABLE `whitelist` DISABLE KEYS */;
INSERT INTO `whitelist` VALUES (2,'admin_token','D05B98F8974B59C37D52F4D7627EB333','1',1,'2026-08-28 14:01:59');
/*!40000 ALTER TABLE `whitelist` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-08-29 13:28:14
