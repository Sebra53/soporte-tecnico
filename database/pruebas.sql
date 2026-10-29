INSERT INTO tickets
  (asunto, solicitante, descripcion, categoria,
   prioridad, estado, fechaRegistro)
VALUES
('Equipo no enciende', 'Ana Pérez',
 'El computador de recepción no inicia.',
 'Hardware', 'Alta', 'Abierto', '2026-10-26'),
('Instalar editor', 'Luis Soto',
 'Se necesita instalar el editor de programación.',
 'Software', 'Baja', 'En proceso', '2026-10-26'),
('Sin acceso a internet', 'María Rojas',
 'La sala de reuniones no tiene conexión a la red.',
 'Red', 'Alta', 'En proceso', '2026-10-27'),
('Actualizar programa', 'Pedro Díaz',
 'El programa de inventario necesita actualización.',
 'Software', 'Media', 'Abierto', '2026-10-27'),
('Teclado reemplazado', 'Carla Vera',
 'Se reemplazó el teclado que tenía teclas dañadas.',
 'Hardware', 'Baja', 'Cerrado', '2026-10-28');
 
SELECT * FROM tickets ORDER BY id DESC;
