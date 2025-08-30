INSERT INTO treino (descricao_tre, titulo_tre, capa_tre) VALUES
('Treino de corpo inteiro com exercícios funcionais, ideal para iniciantes.', 'Treino Funcional Iniciante', '/images/treinos/1.jpeg'),
('Rotina intensa de exercícios aeróbicos para queima de gordura.', 'Cardio Intenso', '/images/treinos/2.jpeg'),
('Treino de musculação para ganho de massa muscular focado em membros superiores.', 'Hipertrofia Superior', '/images/treinos/3.jpeg'),
('Sequência de exercícios voltada para fortalecimento e definição abdominal.', 'Treino de Abdômen', '/images/treinos/4.jpeg'),
('Série de exercícios com peso corporal para fazer em casa, sem equipamentos.', 'Treino em Casa', '/images/treinos/5.jpeg'),
('Treino de resistência com foco em pernas e glúteos.', 'Treino de Pernas', '/images/treinos/6.jpeg'),
('Rotina de alongamento e mobilidade para melhorar flexibilidade.', 'Alongamento e Mobilidade', '/images/treinos/7.jpeg'),
('Circuito HIIT de 20 minutos para aceleração do metabolismo.', 'HIIT 20 Minutos', '/images/treinos/8.jpeg'),
('Treinamento funcional para atletas iniciantes e intermediários.', 'Funcional Intermediário', '/images/treinos/9.jpeg'),
('Rotina leve de reabilitação e fortalecimento para a região lombar.', 'Reforço Lombar', '/images/treinos/10.jpeg');

INSERT INTO categoria (titulo_cat) VALUES
('Cardio'),
('Musculação'),
('CrossFit'),
('Alongamento'),
('Treinamento Funcional'),
('HIIT'),
('Pilates'),
('Yoga'),
('Treino de Pernas'),
('Treino de Braços');

INSERT INTO exercicio (duracao_exe, video_exe, titulo_exe) VALUES
(10.00, '', 'Corrida no lugar'),
(15.00, '', 'Agachamento'),
(12.50, '', 'Flexão de braço'),
(20.00, '', 'Prancha abdominal'),
(8.00,  '', 'Pular corda'),
(10.00, '', 'Abdominal supra'),
(12.00, '', 'Afundo'),
(18.00, '', 'Burpee'),
(14.00, '', 'Elevação de quadril'),
(10.50, '', 'Escalador'),
(9.00,  '', 'Polichinelo'),
(16.00, '', 'Remada curvada'),
(11.00, '', 'Desenvolvimento de ombro'),
(13.00, '', 'Levantamento terra'),
(7.50,  '', 'Elevação lateral'),
(10.00, '', 'Agachamento com salto'),
(12.00, '', 'Tríceps banco'),
(14.00, '', 'Avanço com halteres'),
(15.00, '', 'Rosca direta'),
(9.50,  '', 'Prancha lateral');

INSERT INTO categoria_exercicio (exercicio, categoria) VALUES
(1, 1),   -- Corrida no lugar → Cardio
(2, 2),   -- Agachamento → Musculação
(3, 2),   -- Flexão de braço → Musculação
(4, 6),   -- Prancha abdominal → HIIT
(5, 1),   -- Pular corda → Cardio
(6, 4),   -- Abdominal supra → Alongamento
(7, 5),   -- Afundo → Funcional
(8, 3),   -- Burpee → CrossFit
(9, 5),   -- Elevação de quadril → Funcional
(10, 6),  -- Escalador → HIIT
(11, 1),  -- Polichinelo → Cardio
(12, 2),  -- Remada curvada → Musculação
(13, 2),  -- Desenvolvimento de ombro → Musculação
(14, 2),  -- Levantamento terra → Musculação
(15, 2),  -- Elevação lateral → Musculação
(16, 6),  -- Agachamento com salto → HIIT
(17, 2),  -- Tríceps banco → Musculação
(18, 5),  -- Avanço com halteres → Funcional
(19, 2),  -- Rosca direta → Musculação
(20, 4),  -- Prancha lateral → Alongamento

-- Associações adicionais (exercícios em mais de uma categoria):
(4, 4),   -- Prancha abdominal → também em Alongamento
(8, 6),   -- Burpee → também em HIIT
(10, 3),  -- Escalador → também em CrossFit
(6, 2),   -- Abdominal supra → também em Musculação
(5, 6),   -- Pular corda → também em HIIT
(20, 6),  -- Prancha lateral → também em HIIT
(2, 5),   -- Agachamento → também em Funcional
(7, 6),   -- Afundo → também em HIIT
(9, 4),   -- Elevação de quadril → também em Alongamento
(11, 3);  -- Polichinelo → também em CrossFit

INSERT INTO treino_exercicio (treino, exercicio) VALUES
-- Treino 1: Treino Funcional Iniciante
(1, 2),  -- Agachamento
(1, 5),  -- Pular corda
(1, 7),  -- Afundo
(1, 9),  -- Elevação de quadril

-- Treino 2: Cardio Intenso
(2, 1),  -- Corrida no lugar
(2, 5),  -- Pular corda
(2, 10), -- Escalador
(2, 11), -- Polichinelo

-- Treino 3: Hipertrofia Superior
(3, 3),  -- Flexão de braço
(3, 12), -- Remada curvada
(3, 13), -- Desenvolvimento de ombro
(3, 19), -- Rosca direta

-- Treino 4: Treino de Abdômen
(4, 4),  -- Prancha abdominal
(4, 6),  -- Abdominal supra
(4, 20), -- Prancha lateral

-- Treino 5: Treino em Casa
(5, 1),  -- Corrida no lugar
(5, 2),  -- Agachamento
(5, 3),  -- Flexão de braço
(5, 6),  -- Abdominal supra

-- Treino 6: Treino de Pernas
(6, 2),  -- Agachamento
(6, 7),  -- Afundo
(6, 16), -- Agachamento com salto
(6, 9),  -- Elevação de quadril

-- Treino 7: Alongamento e Mobilidade
(7, 4),  -- Prancha abdominal
(7, 20), -- Prancha lateral
(7, 9),  -- Elevação de quadril

-- Treino 8: HIIT 20 Minutos
(8, 8),  -- Burpee
(8, 10), -- Escalador
(8, 16), -- Agachamento com salto
(8, 5),  -- Pular corda

-- Treino 9: Funcional Intermediário
(9, 2),  -- Agachamento
(9, 7),  -- Afundo
(9, 18), -- Avanço com halteres
(9, 8),  -- Burpee

-- Treino 10: Reforço Lombar
(10, 6),  -- Abdominal supra
(10, 9),  -- Elevação de quadril
(10, 20); -- Prancha lateral


busca treinos, seus exercicios e categorias;
select t.*, e.*, c.* from exercicio e INNER JOIN categoria_exercicio ce ON e.cod_exe = ce.exercicio INNER JOIN categoria c ON ce.categoria = c.cod_cat INNER JOIN treino_exercicio te ON e.cod_exe = te.exercicio INNER JOIN treino t ON te.treino = t.cod_tre;