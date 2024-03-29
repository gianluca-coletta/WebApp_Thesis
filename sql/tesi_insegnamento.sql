-- MySQL dump 10.13  Distrib 8.0.22, for Win64 (x86_64)
--
-- Host: localhost    Database: tesi
-- ------------------------------------------------------
-- Server version	8.0.22

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `insegnamento`
--

DROP TABLE IF EXISTS `insegnamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `insegnamento` (
  `CodiceI` varchar(25) NOT NULL,
  `Nome` varchar(70) NOT NULL,
  `CorsoDiLaurea` varchar(25) NOT NULL,
  PRIMARY KEY (`CodiceI`),
  KEY `Insegnamento_CorsoDilaurea_fkey` (`CorsoDiLaurea`),
  CONSTRAINT `Insegnamento_CorsoDilaurea_fkey` FOREIGN KEY (`CorsoDiLaurea`) REFERENCES `corsodilaurea` (`CodiceCL`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `insegnamento`
--

LOCK TABLES `insegnamento` WRITE;
/*!40000 ALTER TABLE `insegnamento` DISABLE KEYS */;
INSERT INTO `insegnamento` VALUES ('70099606','GEOMETRIA E ALGEBRA','L08A'),('70A00056','CALCOLO DELLA PROBABILITA','L08A'),('70A00057','FISICA B','L08A'),('70A00063','ARCHITETTURE DEI CALCOLATORI E SISTEMI OPERATIVI','L08A'),('70A00084','TEORIA DEI CIRCUITI','L08A'),('70A00085','FONDAMENTI DI INFORMATICA E LABORATORIO','L08A'),('GP003969','ANALISI MATEMATICA I','L08A');
/*!40000 ALTER TABLE `insegnamento` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-12-19 21:36:02
