-- MySQL dump 10.13  Distrib 8.0.42, for Linux (x86_64)
--
-- Host: localhost    Database: fittrack
-- ------------------------------------------------------
-- Server version	8.0.42-0ubuntu0.24.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `administrador`
--

USE fittrack;

DROP TABLE IF EXISTS `administrador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `administrador` (
  `cod_admin` int NOT NULL AUTO_INCREMENT,
  `email_admin` varchar(70) NOT NULL,
  `nome_admin` varchar(60) NOT NULL,
  `foto_admin` varchar(255) DEFAULT NULL,
  `senha_admin` varchar(18) NOT NULL,
  PRIMARY KEY (`cod_admin`),
  UNIQUE KEY `email_admin` (`email_admin`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrador`
--

LOCK TABLES `administrador` WRITE;
/*!40000 ALTER TABLE `administrador` DISABLE KEYS */;
/*!40000 ALTER TABLE `administrador` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `avaliacao`
--

DROP TABLE IF EXISTS `avaliacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `avaliacao` (
  `cliente` int NOT NULL,
  `treino` int NOT NULL,
  `nota` decimal(2,1) NOT NULL,
  PRIMARY KEY (`cliente`,`treino`),
  KEY `treino` (`treino`),
  CONSTRAINT `avaliacao_ibfk_1` FOREIGN KEY (`cliente`) REFERENCES `cliente` (`cod_cli`),
  CONSTRAINT `avaliacao_ibfk_2` FOREIGN KEY (`treino`) REFERENCES `treino` (`cod_tre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avaliacao`
--

LOCK TABLES `avaliacao` WRITE;
/*!40000 ALTER TABLE `avaliacao` DISABLE KEYS */;
/*!40000 ALTER TABLE `avaliacao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `cod_cat` int NOT NULL AUTO_INCREMENT,
  `titulo_cat` varchar(30) NOT NULL,
  PRIMARY KEY (`cod_cat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoria_exercicio`
--

DROP TABLE IF EXISTS `categoria_exercicio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria_exercicio` (
  `exercicio` int NOT NULL,
  `categoria` int NOT NULL,
  PRIMARY KEY (`exercicio`,`categoria`),
  KEY `categoria` (`categoria`),
  CONSTRAINT `categoria_exercicio_ibfk_1` FOREIGN KEY (`exercicio`) REFERENCES `exercicio` (`cod_exe`),
  CONSTRAINT `categoria_exercicio_ibfk_2` FOREIGN KEY (`categoria`) REFERENCES `categoria` (`cod_cat`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria_exercicio`
--

LOCK TABLES `categoria_exercicio` WRITE;
/*!40000 ALTER TABLE `categoria_exercicio` DISABLE KEYS */;
/*!40000 ALTER TABLE `categoria_exercicio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cliente`
--

DROP TABLE IF EXISTS `cliente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cliente` (
  `cod_cli` int NOT NULL AUTO_INCREMENT,
  `nome_cli` varchar(60) NOT NULL,
  `email_cli` varchar(70) NOT NULL,
  `senha_cli` varchar(18) NOT NULL,
  `idade_cli` int DEFAULT NULL,
  `peso_cli` float(6,2) DEFAULT NULL,
  `sexo_cli` char(1) DEFAULT NULL,
  `foto_cli` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`cod_cli`),
  UNIQUE KEY `email_cli` (`email_cli`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
/*!40000 ALTER TABLE `cliente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comentario`
--

DROP TABLE IF EXISTS `comentario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `comentario` (
  `cod_com` int NOT NULL AUTO_INCREMENT,
  `cliente` int NOT NULL,
  `treino` int NOT NULL,
  `texto_com` text,
  `dhcadastro_com` datetime NOT NULL,
  PRIMARY KEY (`cod_com`),
  KEY `cliente` (`cliente`),
  KEY `treino` (`treino`),
  CONSTRAINT `comentario_ibfk_1` FOREIGN KEY (`cliente`) REFERENCES `cliente` (`cod_cli`),
  CONSTRAINT `comentario_ibfk_2` FOREIGN KEY (`treino`) REFERENCES `treino` (`cod_tre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comentario`
--

LOCK TABLES `comentario` WRITE;
/*!40000 ALTER TABLE `comentario` DISABLE KEYS */;
/*!40000 ALTER TABLE `comentario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exercicio`
--

DROP TABLE IF EXISTS `exercicio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exercicio` (
  `cod_exe` int NOT NULL AUTO_INCREMENT,
  `duracao_exe` decimal(5,2) DEFAULT NULL,
  `video_exe` text,
  `titulo_exe` varchar(250) NOT NULL,
  PRIMARY KEY (`cod_exe`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercicio`
--

LOCK TABLES `exercicio` WRITE;
/*!40000 ALTER TABLE `exercicio` DISABLE KEYS */;
/*!40000 ALTER TABLE `exercicio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exercicio_realizado`
--

DROP TABLE IF EXISTS `exercicio_realizado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exercicio_realizado` (
  `treino_marcado` int NOT NULL,
  `exercicio` int NOT NULL,
  `dhinicio_exre` datetime DEFAULT NULL,
  `dhfim_exre` datetime DEFAULT NULL,
  `peso_exre` decimal(5,2) DEFAULT NULL,
  `repeticoes_exre` tinyint DEFAULT NULL,
  PRIMARY KEY (`treino_marcado`,`exercicio`),
  KEY `exercicio` (`exercicio`),
  CONSTRAINT `exercicio_realizado_ibfk_1` FOREIGN KEY (`treino_marcado`) REFERENCES `treino_marcado` (`cod_mar`),
  CONSTRAINT `exercicio_realizado_ibfk_2` FOREIGN KEY (`exercicio`) REFERENCES `exercicio` (`cod_exe`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercicio_realizado`
--

LOCK TABLES `exercicio_realizado` WRITE;
/*!40000 ALTER TABLE `exercicio_realizado` DISABLE KEYS */;
/*!40000 ALTER TABLE `exercicio_realizado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `treino`
--

DROP TABLE IF EXISTS `treino`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `treino` (
  `cod_tre` int NOT NULL AUTO_INCREMENT,
  `descricao_tre` text NOT NULL,
  `titulo_tre` varchar(100) NOT NULL,
  PRIMARY KEY (`cod_tre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `treino`
--

LOCK TABLES `treino` WRITE;
/*!40000 ALTER TABLE `treino` DISABLE KEYS */;
/*!40000 ALTER TABLE `treino` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `treino_exercicio`
--

DROP TABLE IF EXISTS `treino_exercicio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `treino_exercicio` (
  `treino` int NOT NULL,
  `exercicio` int NOT NULL,
  PRIMARY KEY (`treino`,`exercicio`),
  KEY `exercicio` (`exercicio`),
  CONSTRAINT `treino_exercicio_ibfk_1` FOREIGN KEY (`treino`) REFERENCES `treino` (`cod_tre`),
  CONSTRAINT `treino_exercicio_ibfk_2` FOREIGN KEY (`exercicio`) REFERENCES `exercicio` (`cod_exe`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `treino_exercicio`
--

LOCK TABLES `treino_exercicio` WRITE;
/*!40000 ALTER TABLE `treino_exercicio` DISABLE KEYS */;
/*!40000 ALTER TABLE `treino_exercicio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `treino_marcado`
--

DROP TABLE IF EXISTS `treino_marcado`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `treino_marcado` (
  `cod_mar` int NOT NULL AUTO_INCREMENT,
  `cliente` int NOT NULL,
  `treino` int NOT NULL,
  `dhinicio_mar` datetime DEFAULT NULL,
  `dhfim_mar` datetime DEFAULT NULL,
  PRIMARY KEY (`cod_mar`),
  KEY `cliente` (`cliente`),
  KEY `treino` (`treino`),
  CONSTRAINT `treino_marcado_ibfk_1` FOREIGN KEY (`cliente`) REFERENCES `cliente` (`cod_cli`),
  CONSTRAINT `treino_marcado_ibfk_2` FOREIGN KEY (`treino`) REFERENCES `treino` (`cod_tre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `treino_marcado`
--

LOCK TABLES `treino_marcado` WRITE;
/*!40000 ALTER TABLE `treino_marcado` DISABLE KEYS */;
/*!40000 ALTER TABLE `treino_marcado` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-05-08 20:34:30
