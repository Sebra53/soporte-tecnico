CREATE DATABASE IF NOT EXISTS soporte_tecnico
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

 
USE soporte_tecnico;

 

CREATE TABLE IF NOT EXISTS tickets (
  id INT AUTO_INCREMENT PRIMARY KEY,
  asunto VARCHAR(150) NOT NULL,
  solicitante VARCHAR(120) NOT NULL,
  descripcion TEXT NOT NULL,
  categoria ENUM('Hardware', 'Software', 'Red') NOT NULL,
  prioridad ENUM('Baja', 'Media', 'Alta') NOT NULL,
  estado ENUM('Abierto', 'En proceso', 'Cerrado') NOT NULL,
  fechaRegistro DATE NOT NULL
);

SHOW TABLES;
DESCRIBE tickets;