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
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `administrador`
--

LOCK TABLES `administrador` WRITE;
/*!40000 ALTER TABLE `administrador` DISABLE KEYS */;
INSERT INTO `administrador` VALUES (27,'admin@gmail.com','Administrador','/images/usuarios/1748908489988.png','123');
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
INSERT INTO `avaliacao` VALUES (14,1,4.7),(14,2,3.9),(14,3,4.0),(14,4,4.9),(14,5,4.8);
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
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES (1,'Cardio'),(2,'Musculação'),(3,'CrossFit'),(4,'Alongamento'),(5,'Treinamento Funcional'),(6,'HIIT'),(7,'Pilates'),(8,'Yoga'),(9,'Treino de Pernas'),(10,'Treino de Braços'),(11,'Teste Categoria 1751583672451'),(12,'Teste Categoria 1751583819023'),(13,'Teste Categoria 1751584082915'),(14,'Teste Categoria 1751584290467'),(15,'Teste Categoria 1751584699964'),(16,'Teste Categoria 1751585326782'),(17,'Teste Categoria 1751585359373'),(18,'Teste Categoria 1751585421589'),(19,'Teste Categoria 1751585445315'),(20,'Teste Categoria 1751585770729'),(21,'Teste Categoria 1751585811664'),(22,'Teste Categoria 1751586056211'),(23,'Teste Categoria 1751586887767'),(24,'Teste Categoria 1751587038439'),(25,'Teste Categoria 1751587054257'),(26,'Teste Categoria 1751587078260'),(27,'Teste Categoria 1751587222438'),(28,'Teste Categoria 1751587248227'),(29,'Teste Categoria 1751588299475'),(30,'Teste Categoria 1751588327030'),(31,'Teste Categoria 1751588562794'),(32,'Teste Categoria 1751588581710'),(33,'Teste Categoria 1751588716809'),(34,'Teste Categoria 1751588866140'),(35,'Teste Categoria 1751589015578'),(36,'Teste Categoria 1751589097215'),(37,'Teste Categoria 1751589152753'),(38,'Teste Categoria 1751589249487'),(39,'Teste Categoria 1751589262323');
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
INSERT INTO `categoria_exercicio` VALUES (1,1),(5,1),(11,1),(2,2),(3,2),(6,2),(12,2),(13,2),(14,2),(15,2),(17,2),(19,2),(8,3),(10,3),(11,3),(4,4),(6,4),(9,4),(20,4),(2,5),(7,5),(9,5),(18,5),(4,6),(5,6),(7,6),(8,6),(10,6),(16,6),(20,6);
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
) ENGINE=InnoDB AUTO_INCREMENT=156 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cliente`
--

LOCK TABLES `cliente` WRITE;
/*!40000 ALTER TABLE `cliente` DISABLE KEYS */;
INSERT INTO `cliente` VALUES (14,'cliente','cliente@email.com','123',25,50.00,'M','/images/usuarios/1748997421458.png'),(155,'Luis Fernando Pereira','fernando@email.com','123',27,97.00,'M','/images/usuarios/1751824154232.png');
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
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comentario`
--

LOCK TABLES `comentario` WRITE;
/*!40000 ALTER TABLE `comentario` DISABLE KEYS */;
INSERT INTO `comentario` VALUES (1,14,1,'Muito bom o treino 1!','2025-06-24 13:58:21'),(2,14,2,'Muito bom o treino 2!','2025-06-28 13:58:21'),(3,14,3,'Muito bom o treino 3!','2025-06-09 13:58:21'),(4,14,4,'Muito bom o treino 4!','2025-05-30 13:58:21'),(5,14,5,'Muito bom o treino 5!','2025-06-14 13:58:21'),(9,14,4,'asd','2025-07-06 11:40:41'),(10,14,5,'asd','2025-07-06 11:42:35'),(11,14,5,'Meu, que treino chato!','2025-07-06 11:42:47'),(12,14,5,'O terceiro exerccio podia ser melhor...','2025-07-06 11:43:28'),(13,14,5,'Acho que deveria ter mais exercícios','2025-07-06 13:23:47'),(14,14,5,'asd','2025-07-06 13:35:03'),(15,14,2,'A imagem ta meio zoada','2025-07-06 13:36:12'),(16,155,1,'@cliente concordo!','2025-07-06 14:49:41'),(17,155,5,'Treino bom! Só achei muito curto','2025-07-06 16:03:03');
/*!40000 ALTER TABLE `comentario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `comentarios`
--

DROP TABLE IF EXISTS `comentarios`;
/*!50001 DROP VIEW IF EXISTS `comentarios`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `comentarios` AS SELECT 
 1 AS `codigo`,
 1 AS `treino`,
 1 AS `texto`,
 1 AS `data_hora`,
 1 AS `cliente`*/;
SET character_set_client = @saved_cs_client;

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
  `descricao_exe` text,
  PRIMARY KEY (`cod_exe`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercicio`
--

LOCK TABLES `exercicio` WRITE;
/*!40000 ALTER TABLE `exercicio` DISABLE KEYS */;
INSERT INTO `exercicio` VALUES (1,10.00,'video.mp4','Corrida no lugar','Exercício cardiovascular que simula corrida sem sair do lugar, ideal para aquecimento e resistência.'),(2,15.00,'video.mp4','Agachamento','Fortalece pernas e glúteos, excelente para trabalhar o quadríceps e a postura.'),(3,12.50,'video.mp4','Flexão de braço','Fortalece peitoral, ombros e tríceps, usando o peso do próprio corpo.'),(4,20.00,'video.mp4','Prancha abdominal','Trabalha a musculatura abdominal e melhora a estabilidade do core.'),(5,8.00,'video.mp4','Pular corda','Exercício aeróbico que melhora o condicionamento e a coordenação.'),(6,10.00,'video.mp4','Abdominal supra','Focado na parte superior do abdômen, melhora a definição da região.'),(7,12.00,'video.mp4','Afundo','Trabalha pernas e glúteos, com ênfase em equilíbrio e força unilateral.'),(8,18.00,'video.mp4','Burpee','Exercício completo e intenso que envolve força e cardio, ideal para HIIT.'),(9,14.00,'video.mp4','Elevação de quadril','Fortalece glúteos e lombar, ótimo para estabilização da pelve.'),(10,10.50,'video.mp4','Escalador','Movimento contínuo que simula uma escalada, ótimo para abdômen e cardio.'),(11,9.00,'video.mp4','Polichinelo','Aeróbico clássico para aquecimento, coordenação e resistência.'),(12,16.00,'video.mp4','Remada curvada','Foco nas costas, desenvolve a musculatura dorsal e postura.'),(13,11.00,'video.mp4','Desenvolvimento de ombro','Trabalha os deltoides e melhora a força dos ombros.'),(14,13.00,'video.mp4','Levantamento terra','Exercício composto que ativa pernas, costas e glúteos.'),(15,7.50,'video.mp4','Elevação lateral','Isola o ombro lateral para definição e estabilidade da articulação.'),(16,10.00,'video.mp4','Agachamento com salto','Variação explosiva do agachamento, melhora força e potência.'),(17,12.00,'video.mp4','Tríceps banco','Focado no tríceps, usando banco para alavancar o movimento.'),(18,14.00,'video.mp4','Avanço com halteres','Trabalha força e equilíbrio nas pernas, glúteos e core.'),(19,15.00,'video.mp4','Rosca direta','Exercício clássico para hipertrofia do bíceps.'),(20,9.50,'video.mp4','Prancha lateral','Fortalece os oblíquos e melhora o equilíbrio lateral do core.');
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
  `cliente` int NOT NULL,
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
INSERT INTO `exercicio_realizado` VALUES (1,3,'2025-06-22 14:05:21','2025-06-22 14:11:21',10.22,13,0),(1,5,'2025-06-22 13:59:21','2025-06-22 14:06:21',9.13,8,0),(1,8,'2025-06-22 14:08:21','2025-06-22 14:18:21',12.03,8,0),(2,4,'2025-06-22 14:08:21','2025-06-22 14:22:21',7.30,14,0),(2,14,'2025-06-22 14:08:21','2025-06-22 14:13:21',11.84,15,0),(2,19,'2025-06-22 14:01:21','2025-06-22 14:12:21',20.84,8,0),(3,8,'2025-06-24 14:02:21','2025-06-24 14:12:21',28.90,12,0),(3,11,'2025-06-24 14:07:21','2025-06-24 14:18:21',25.41,10,0),(3,12,'2025-06-24 14:05:21','2025-06-24 14:12:21',15.31,13,0);
/*!40000 ALTER TABLE `exercicio_realizado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `lista_de_treinos_com_categorias`
--

DROP TABLE IF EXISTS `lista_de_treinos_com_categorias`;
/*!50001 DROP VIEW IF EXISTS `lista_de_treinos_com_categorias`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `lista_de_treinos_com_categorias` AS SELECT 
 1 AS `cod_tre`,
 1 AS `descricao_tre`,
 1 AS `titulo_tre`,
 1 AS `capa_tre`,
 1 AS `cod_exe`,
 1 AS `duracao_exe`,
 1 AS `video_exe`,
 1 AS `titulo_exe`,
 1 AS `cod_cat`,
 1 AS `titulo_cat`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `listar_dados_treinos`
--

DROP TABLE IF EXISTS `listar_dados_treinos`;
/*!50001 DROP VIEW IF EXISTS `listar_dados_treinos`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `listar_dados_treinos` AS SELECT 
 1 AS `cod_tre`,
 1 AS `descricao_tre`,
 1 AS `titulo_tre`,
 1 AS `capa_tre`,
 1 AS `cod_exe`,
 1 AS `duracao_exe`,
 1 AS `video_exe`,
 1 AS `titulo_exe`,
 1 AS `descricao_exe`,
 1 AS `cod_cat`,
 1 AS `titulo_cat`*/;
SET character_set_client = @saved_cs_client;

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
  `capa_tre` text NOT NULL,
  PRIMARY KEY (`cod_tre`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `treino`
--

LOCK TABLES `treino` WRITE;
/*!40000 ALTER TABLE `treino` DISABLE KEYS */;
INSERT INTO `treino` VALUES (1,'Treino de corpo inteiro com exercícios funcionais, ideal para iniciantes.','Treino Funcional Iniciante','/images/treinos/1.jpeg'),(2,'Rotina intensa de exercícios aeróbicos para queima de gordura.','Cardio Intenso','/images/treinos/2.jpeg'),(3,'Treino de musculação para ganho de massa muscular focado em membros superiores.','Hipertrofia Superior','/images/treinos/3.jpeg'),(4,'Sequência de exercícios voltada para fortalecimento e definição abdominal.','Treino de Abdômen','/images/treinos/4.jpeg'),(5,'Série de exercícios com peso corporal para fazer em casa, sem equipamentos.','Treino em Casa','/images/treinos/5.jpeg'),(6,'Treino de resistência com foco em pernas e glúteos.','Treino de Pernas','/images/treinos/6.jpeg'),(7,'Rotina de alongamento e mobilidade para melhorar flexibilidade.','Alongamento e Mobilidade','/images/treinos/7.jpeg'),(8,'Circuito HIIT de 20 minutos para aceleração do metabolismo.','HIIT 20 Minutos','/images/treinos/8.jpeg'),(9,'Treinamento funcional para atletas iniciantes e intermediários.','Funcional Intermediário','/images/treinos/9.jpeg'),(10,'Rotina leve de reabilitação e fortalecimento para a região lombar.','Reforço Lombar','/images/treinos/10.jpeg');
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
  `ordem` int NOT NULL,
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
INSERT INTO `treino_exercicio` VALUES (1,2,1),(1,5,2),(1,7,3),(1,9,4),(2,1,1),(2,5,2),(2,10,3),(2,11,4),(3,3,1),(3,12,2),(3,13,3),(3,19,4),(4,4,1),(4,6,2),(4,20,3),(5,1,1),(5,2,2),(5,3,3),(5,6,4),(6,2,1),(6,7,2),(6,9,3),(6,16,4),(7,4,1),(7,9,2),(7,20,3),(8,5,1),(8,8,2),(8,10,3),(8,16,4),(9,2,1),(9,7,2),(9,8,3),(9,18,4),(10,6,1),(10,9,2),(10,20,3);
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
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `treino_marcado`
--

LOCK TABLES `treino_marcado` WRITE;
/*!40000 ALTER TABLE `treino_marcado` DISABLE KEYS */;
INSERT INTO `treino_marcado` VALUES (1,14,7,'2025-06-22 13:58:21','2025-06-22 14:55:21'),(2,14,6,'2025-06-22 13:58:21','2025-06-22 14:48:21'),(3,14,8,'2025-06-24 13:58:21','2025-06-24 14:28:21');
/*!40000 ALTER TABLE `treino_marcado` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Temporary view structure for view `treinos_dashboard`
--

DROP TABLE IF EXISTS `treinos_dashboard`;
/*!50001 DROP VIEW IF EXISTS `treinos_dashboard`*/;
SET @saved_cs_client     = @@character_set_client;
/*!50503 SET character_set_client = utf8mb4 */;
/*!50001 CREATE VIEW `treinos_dashboard` AS SELECT 
 1 AS `cod_tre`,
 1 AS `descricao_tre`,
 1 AS `titulo_tre`,
 1 AS `capa_tre`,
 1 AS `cod_exe`,
 1 AS `duracao_exe`,
 1 AS `video_exe`,
 1 AS `titulo_exe`,
 1 AS `cod_cat`,
 1 AS `titulo_cat`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `comentarios`
--

/*!50001 DROP VIEW IF EXISTS `comentarios`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `comentarios` AS select `co`.`cod_com` AS `codigo`,`co`.`treino` AS `treino`,`co`.`texto_com` AS `texto`,`co`.`dhcadastro_com` AS `data_hora`,`cl`.`nome_cli` AS `cliente` from (`comentario` `co` join `cliente` `cl` on((`co`.`cliente` = `cl`.`cod_cli`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `lista_de_treinos_com_categorias`
--

/*!50001 DROP VIEW IF EXISTS `lista_de_treinos_com_categorias`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `lista_de_treinos_com_categorias` AS select `t`.`cod_tre` AS `cod_tre`,`t`.`descricao_tre` AS `descricao_tre`,`t`.`titulo_tre` AS `titulo_tre`,`t`.`capa_tre` AS `capa_tre`,`e`.`cod_exe` AS `cod_exe`,`e`.`duracao_exe` AS `duracao_exe`,`e`.`video_exe` AS `video_exe`,`e`.`titulo_exe` AS `titulo_exe`,`c`.`cod_cat` AS `cod_cat`,`c`.`titulo_cat` AS `titulo_cat` from ((((`exercicio` `e` join `categoria_exercicio` `ce` on((`e`.`cod_exe` = `ce`.`exercicio`))) join `categoria` `c` on((`ce`.`categoria` = `c`.`cod_cat`))) join `treino_exercicio` `te` on((`e`.`cod_exe` = `te`.`exercicio`))) join `treino` `t` on((`te`.`treino` = `t`.`cod_tre`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `listar_dados_treinos`
--

/*!50001 DROP VIEW IF EXISTS `listar_dados_treinos`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `listar_dados_treinos` AS select `t`.`cod_tre` AS `cod_tre`,`t`.`descricao_tre` AS `descricao_tre`,`t`.`titulo_tre` AS `titulo_tre`,`t`.`capa_tre` AS `capa_tre`,`e`.`cod_exe` AS `cod_exe`,`e`.`duracao_exe` AS `duracao_exe`,`e`.`video_exe` AS `video_exe`,`e`.`titulo_exe` AS `titulo_exe`,`e`.`descricao_exe` AS `descricao_exe`,`c`.`cod_cat` AS `cod_cat`,`c`.`titulo_cat` AS `titulo_cat` from ((((`treino` `t` left join `treino_exercicio` `te` on((`te`.`treino` = `t`.`cod_tre`))) join `exercicio` `e` on((`e`.`cod_exe` = `te`.`exercicio`))) left join `categoria_exercicio` `ce` on((`ce`.`exercicio` = `e`.`cod_exe`))) join `categoria` `c` on((`c`.`cod_cat` = `ce`.`categoria`))) order by `te`.`ordem` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `treinos_dashboard`
--

/*!50001 DROP VIEW IF EXISTS `treinos_dashboard`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8mb4_0900_ai_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `treinos_dashboard` AS select `t`.`cod_tre` AS `cod_tre`,`t`.`descricao_tre` AS `descricao_tre`,`t`.`titulo_tre` AS `titulo_tre`,`t`.`capa_tre` AS `capa_tre`,`e`.`cod_exe` AS `cod_exe`,`e`.`duracao_exe` AS `duracao_exe`,`e`.`video_exe` AS `video_exe`,`e`.`titulo_exe` AS `titulo_exe`,`c`.`cod_cat` AS `cod_cat`,`c`.`titulo_cat` AS `titulo_cat` from ((((`treino` `t` left join `treino_exercicio` `te` on((`t`.`cod_tre` = `te`.`treino`))) join `exercicio` `e` on((`te`.`exercicio` = `e`.`cod_exe`))) left join `categoria_exercicio` `ce` on((`e`.`cod_exe` = `ce`.`exercicio`))) join `categoria` `c` on((`ce`.`categoria` = `c`.`cod_cat`))) order by `t`.`cod_tre` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-07-06 22:18:18
