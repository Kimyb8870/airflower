-- airflower.TB_ACTION_CODE definition

CREATE TABLE `TB_ACTION_CODE` (
  `ACTION_TYPE` tinyint(4) NOT NULL,
  `ACTION_NAME` varchar(50) DEFAULT NULL,
  `ACTION_IR_CODE` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ACTION_TYPE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- airflower.TB_CONTROLLER definition

CREATE TABLE `TB_CONTROLLER` (
  `CONTROLLER_ID` int(11) NOT NULL,
  `CONTROLLER_IP` varchar(50) DEFAULT NULL,
  `CONTROLLER_NAME` varchar(50) DEFAULT NULL,
  `CONTROLLER_POSITION` varchar(50) DEFAULT NULL,
  `REGISTRATION_DATETIME` datetime DEFAULT NULL,
  `WAKEUP_DATETIME` datetime DEFAULT NULL,
  PRIMARY KEY (`CONTROLLER_ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- airflower.TB_SYSTEM_CODE definition

CREATE TABLE `TB_SYSTEM_CODE` (
  `MODE` tinyint(4) NOT NULL,
  `MODE_NAME` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`MODE`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- airflower.TB_ACTION_LOG definition

CREATE TABLE `TB_ACTION_LOG` (
  `LOG_ID` int(11) NOT NULL AUTO_INCREMENT,
  `MODE` tinyint(4) DEFAULT NULL,
  `ACTION_TYPE` tinyint(4) DEFAULT NULL,
  `CONTROLLER_ID` int(11) DEFAULT NULL,
  `ACTION_DATETIME` datetime DEFAULT NULL,
  `REQUEST_DATETIME` datetime DEFAULT NULL,
  `TEMP` double DEFAULT NULL,
  `HUMID` double DEFAULT NULL,
  PRIMARY KEY (`LOG_ID`),
  KEY `TB_ACTION_LOG_TB_SYSTEM_CODE_FK` (`MODE`),
  KEY `TB_ACTION_LOG_TB_ACTION_CODE_FK` (`ACTION_TYPE`),
  KEY `TB_ACTION_LOG_TB_CONTROLLER_FK` (`CONTROLLER_ID`),
  CONSTRAINT `TB_ACTION_LOG_TB_ACTION_CODE_FK` FOREIGN KEY (`ACTION_TYPE`) REFERENCES `TB_ACTION_CODE` (`ACTION_TYPE`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `TB_ACTION_LOG_TB_CONTROLLER_FK` FOREIGN KEY (`CONTROLLER_ID`) REFERENCES `TB_CONTROLLER` (`CONTROLLER_ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `TB_ACTION_LOG_TB_SYSTEM_CODE_FK` FOREIGN KEY (`MODE`) REFERENCES `TB_SYSTEM_CODE` (`MODE`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- airflower.TB_ACTION_QUEUE definition

CREATE TABLE `TB_ACTION_QUEUE` (
  `ACTION_ID` varchar(10) NOT NULL,
  `SCHEDULE_ID` int(11) NOT NULL,
  `ACTION_TYPE` tinyint(4) DEFAULT NULL,
  `CONTROLLER_ID` int(11) DEFAULT NULL,
  `ACTION_DATETIME` datetime DEFAULT NULL,
  `REQUEST_DATETIME` datetime DEFAULT NULL,
  PRIMARY KEY (`ACTION_ID`),
  UNIQUE KEY `TB_ACTION_QUEUE_UNIQUE` (`SCHEDULE_ID`),
  KEY `TB_ACTION_QUEUE_TB_ACTION_CODE_FK` (`ACTION_TYPE`),
  KEY `TB_ACTION_QUEUE_TB_CONTROLLER_FK` (`CONTROLLER_ID`),
  CONSTRAINT `TB_ACTION_QUEUE_TB_ACTION_CODE_FK` FOREIGN KEY (`ACTION_TYPE`) REFERENCES `TB_ACTION_CODE` (`ACTION_TYPE`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `TB_ACTION_QUEUE_TB_CONTROLLER_FK` FOREIGN KEY (`CONTROLLER_ID`) REFERENCES `TB_CONTROLLER` (`CONTROLLER_ID`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- airflower.TB_SYSTEM_CURRENT definition

CREATE TABLE `TB_SYSTEM_CURRENT` (
  `ID` tinyint(4) NOT NULL,
  `CURRENT_MODE` tinyint(4) NOT NULL,
  `CURRENT_DATETIME` datetime NOT NULL DEFAULT current_timestamp(),
  `CURRENT_TEMP` double DEFAULT NULL,
  `CURRENT_HUMID` double DEFAULT NULL,
  PRIMARY KEY (`ID`),
  KEY `TB_SYSTEM_CURRENT_TB_SYSTEM_CODE_FK` (`CURRENT_MODE`),
  CONSTRAINT `TB_SYSTEM_CURRENT_TB_SYSTEM_CODE_FK` FOREIGN KEY (`CURRENT_MODE`) REFERENCES `TB_SYSTEM_CODE` (`MODE`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


-- airflower.TB_SYSTEM_LOG definition

CREATE TABLE `TB_SYSTEM_LOG` (
  `LOG_ID` int(11) NOT NULL AUTO_INCREMENT,
  `MODE` tinyint(4) DEFAULT NULL,
  `TEMP` double DEFAULT NULL,
  `HUMID` double DEFAULT NULL,
  `LOG_DATETIME` datetime DEFAULT NULL,
  PRIMARY KEY (`LOG_ID`),
  KEY `TB_SYSTEM_LOG_TB_SYSTEM_CODE_FK` (`MODE`),
  CONSTRAINT `TB_SYSTEM_LOG_TB_SYSTEM_CODE_FK` FOREIGN KEY (`MODE`) REFERENCES `TB_SYSTEM_CODE` (`MODE`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;