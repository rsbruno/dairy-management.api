DO $$
DECLARE
  farm_id TEXT := 'cm91s4bwp0000356lmm49ht31';
BEGIN
  INSERT INTO public.transactions
    (id, description, quantity, "unitPrice", "productId", "responsibleId", "createdAt", "farmId", "typeId", "costCenterId") VALUES
    ('c8bbf86415e16436bb7bb8d851aa6f19', 'leite produzido no mês', 24049, 1.35, 'c00000195fe4f1d7658ac93fd58dd3d82', 'cm91s51ah0003356lm5wgdry1', '2024-01-05 10:30:00', farm_id, 'c00000195fe5705fbe2b1d7d43fd25712', 'c00000195fdc2a9cdbe5ae91739456a4c'),
    ('c8bbf86415e16436bb7bb8d851aa6f20', 'outras fontes de renda não declaradas', 360, 1.35, 'c00000195fe4f1d7658ac93fd58dd3d82', 'cm91s51ah0003356lm5wgdry1', '2024-01-15 14:45:00', farm_id, 'c00000195fe5705fbe2b1d7d43fd25712', 'c00000195fdc2a9cdbe5ae91739456a4c'),
    ('c8bbf86415e16436bb7bb8d851aa6f21', 'aleitamento dos bezerros', 540, 1.35, 'c00000195fe4f1d7658ac93fd58dd3d82', 'cm91s51ah0003356lm5wgdry1', '2024-01-25 08:20:00', farm_id, 'c00000195fe5705fbe2b1d7d43fd25712', 'c00000195fdc2a9cdbe5ae91739456a4c');
END $$;

DO $$
DECLARE
  farm_id TEXT := 'cm91s4bwp0000356lmm49ht31';
BEGIN
  INSERT INTO public.transactions
    (id, description, quantity, "unitPrice", "productId", "responsibleId", "createdAt", "farmId", "typeId", "costCenterId") VALUES
    ('c8bbf86415e16436bb7bb8d851aa6f17', 'alimentação para vacas em lactação', 30.0, 79.56, 'c00000195fe4f1d7659aa0fe89910e9d8', 'cm91s51ah0003356lm5wgdry1', '2024-01-12 11:19:00', farm_id, 'c00000195fe5705fe7104f366cbec2822', 'c00000195fdc2d04fd4e69b0cdbc47154'),
    ('c80d6dde4bfbb4611af6fb6d87329e1d', 'farelo de milho', 6.0, 43.5, 'c00000195fe4f1d766bc91117c5e21e72', 'cm91s51ah0003356lm5wgdry1', '2024-01-23 23:43:00', farm_id, 'c00000195fe5705fe7104f366cbec2822', 'c00000195fdc2d04fd4e69b0cdbc47154'),
    ('c4cd5b5c1ad074c18bd1634ff73d2d0c', 'suplementação', 2.0, 53.74, 'c00000195fe4f1d76ba835e9fd995e1f4', 'cm91s51ah0003356lm5wgdry1', '2024-01-16 10:19:00', farm_id, 'c00000195fe5705fe7104f366cbec2822', 'c00000195fdc2d04fd4e69b0cdbc47154'),
    ('cf11e343fed284bda83de36da9852fbe', 'sal', 5.0, 61.83, 'c00000195fe4f1d7615e3f7f8e3364d15', 'cm91s51ah0003356lm5wgdry1', '2024-01-09 01:48:00', farm_id, 'c00000195fe5705fe7104f366cbec2822', 'c00000195fdc2d04fd4e69b0cdbc47154'),
    ('ccd89c9bc4950413d9baa7ffe76012d1', 'sal', 10.0, 11.74, 'c00000195fe4f1d76f4250cb46755a56c', 'cm91s51ah0003356lm5wgdry1', '2024-01-17 11:23:00', farm_id, 'c00000195fe5705fe7104f366cbec2822', 'c00000195fdc2d04fd4e69b0cdbc47154'),
    ('ce14cbd5e5b7c4374aa8d922d8c14887', 'farelo de soja', 127.0, 79.2, 'c00000195fe4f1d76deb3554d01d209bd', 'cm91s51ah0003356lm5wgdry1', '2024-01-27 08:39:00', farm_id, 'c00000195fe5705fe7104f366cbec2822', 'c00000195fdc2d04fd4e69b0cdbc47154');
	('c7ee768a05aa947689edd9644878c931', 'aplicação de herbicida para controle de pragas', 2.0, 49.76, 'c00000195fe4f1d762d93f7a64745281d', 'cm91s51ah0003356lm5wgdry1', '2024-01-23 20:32:00', farm_id, 'c00000195fe5705fe7104f366cbec2822', 'c00000195fdfd881b1aec4e712090de6f'),
    ('c9d68a446d3884cbb9f70732cdb73176', 'compra de vermífugo para o gado', 52.0, 11.15, 'c00000195fe4f1d757c14c9dfe1fe87e2', 'cm91s51ah0003356lm5wgdry1', '2024-01-29 08:03:00', farm_id, 'c00000195fe5705fe7104f366cbec2822', 'c00000195fdfd881b1aec4e712090de6f'),
    ('cee59a165068f407893ddaa2e6a8cf97', 'medicação preventiva para bezerros recém-nascidos', 2.0, 28.14, 'c0000019600cb86decab3d6713bc8bcce', 'cm91s51ah0003356lm5wgdry1', '2024-01-29 04:30:00', farm_id, 'c00000195fe5705fe7104f366cbec2822', 'c00000195fdfd881b1aec4e712090de6f'),
    ('c190a02dc9c04407b88e23171f5313c3', 'tratamento de infecção em vacas leiteiras', 2.0, 14.74, 'c0000019600cdda6e57a71b3acecd9f50', 'cm91s51ah0003356lm5wgdry1', '2024-01-10 01:16:00', farm_id, 'c00000195fe5705fe7104f366cbec2822', 'c00000195fdfd881b1aec4e712090de6f'),
    ('c21a1df55dce640a394bcad5cd4023c7', 'injeção de antibiótico para cura de mastite', 1.0, 13.58, 'c00000195fe4f1d753a17ec5bd171b53b', 'cm91s51ah0003356lm5wgdry1', '2024-01-26 10:10:00', farm_id, 'c00000195fe5705fe7104f366cbec2822', 'c00000195fdfd881b1aec4e712090de6f'),
    ('c74322c377a854a64ab0214dcfb1c566', 'produto fitossanitário para lavoura de milho', 4.0, 140.47, 'c00000195fe4f1d7670923c2c4a9f819e', 'cm91s51ah0003356lm5wgdry1', '2024-01-04 13:48:00', farm_id, 'c00000195fe5705fe7104f366cbec2822', 'c00000195fdfd881b1aec4e712090de6f'),
    ('cf4fbe7c7547e4b93a6067beb3ecb7ed', 'vitamina injetável para fortalecimento dos animais', 6.0, 15.96, 'c00000195fe4f1d762de10846da98ba5c', 'cm91s51ah0003356lm5wgdry1', '2024-01-04 07:12:00', farm_id, 'c00000195fe5705fe7104f366cbec2822', 'c00000195fdfd881b1aec4e712090de6f'),
    ('c3767ed0257de45b1b4c8e92b8118a51', 'vacina contra febre aftosa aplicada no rebanho', 2.0, 44.96, 'c00000195fe4f1d759098a5576c7f1f2a', 'cm91s51ah0003356lm5wgdry1', '2024-01-31 12:36:00', farm_id, 'c00000195fe5705fe7104f366cbec2822', 'c00000195fdfd881b1aec4e712090de6f'),
 	('ca9a241ce689c489e8442dfa81ebf165', 'desinfetante peroxysan para higienização de equipamentos de ordenha', 1.0, 299.0, 'c0000019600d576e4f0dc5609e8da7f0d', 'cm91s51ah0003356lm5wgdry1', '2024-01-24 22:42:00', farm_id, 'c00000195fe5705fe7104f366cbec2822', 'c00000195fdfd881c30224300b96fc158'),
    ('cc961a1daf7b64b73b3812f53598bd4e', 'biológico armor para controle de pragas em cultura de milho', 1.0, 925.0, 'c00000195fe4f1d754982a22c71c24fb3', 'cm91s51ah0003356lm5wgdry1', '2024-01-24 22:30:00', farm_id, 'c00000195fe5705fe7104f366cbec2822', 'c00000195fdfd881c30224300b96fc158'),    
    ('c89bd74e20277415383c79c0f3bff8f7', 'solution: suplemento mineral para fortalecimento do rebanho leiteiro', 1.0, 480.0, 'c0000019600d864466d778f0b468022d5', 'cm91s51ah0003356lm5wgdry1', '2024-01-29 17:34:00', farm_id, 'c00000195fe5705fe7104f366cbec2822', 'c00000195fdfd881c30224300b96fc158'),    
    ('cb275d50597834da1aff900f2bd1cf77', 'precise cloro: sanitizante à base de cloro para tanques e ordenhadeiras', 1.0, 860.0, 'c0000019600da7fb1983fddea322bb6a0', 'cm91s51ah0003356lm5wgdry1', '2024-01-04 19:25:00', farm_id, 'c00000195fe5705fe7104f366cbec2822', 'c00000195fdfd881c30224300b96fc158'),
	('c6701e624a45e49fa9504b42ee2ce065', 'insulfladores para ventilação e resfriamento do ambiente de ordenha', 6.0, 60.0, 'c00000195fe4f1d7608e7c955c9e65931', 'cm91s51ah0003356lm5wgdry1', '2024-01-08 16:00:00', farm_id, 'c00000195fe5705fe7104f366cbec2822', 'c00000195fdc2d050a85db15f2b849369'),
    ('cc326f3805e7f4986b19e8302dcc6e3f', 'filtro descartável para retenção de impurezas no leite durante a ordenha', 1.0, 126.0, 'c00000195fe4f1d76a230fc9ef76accaf', 'cm91s51ah0003356lm5wgdry1', '2024-01-19 15:19:00', farm_id, 'c00000195fe5705fe7104f366cbec2822', 'c00000195fdc2d050a85db15f2b849369'),
	('c6701e624a45e49fa9504b42ee2ce064', 'Sêmen touro', 80, 45.0, 'c00000195fe4f1d7608e7c955c9e65931', 'cm91s51ah0003356lm5wgdry1', '2024-01-08 16:00:00', farm_id, 'c00000195fe5705fe7104f366cbec2822', 'c00000195fdc2d05061a4a97384dc7db5'),
	('cfae3b32172894c7b8f7be3574770d97', 'consumo de energia elétrica referente à ordenha e refrigeração do leite', 1794.0, 0.68, 'c00000195fe4f1d762796297f61e03dba', 'cm91s51ah0003356lm5wgdry1', '2024-01-22 19:27:00', farm_id, 'c00000195fe5705fe7104f366cbec2822', 'c00000195fdc2d0507089316c529d832d'),
    ('c3f67b3417a1246cabd941284bfd26f4', 'abastecimento de gasolina para veículos utilitários da fazenda', 20.93, 4.78, 'c00000195fe4f1d763003c1fc303daef2', 'cm91s51ah0003356lm5wgdry1', '2024-01-30 18:55:00', farm_id, 'c00000195fe5705fe7104f366cbec2822', 'c00000195fdc2d0507089316c529d832d'),
 	('ccdd596db6b3f4d9396b491ba4fa6c64', 'ordenhador', 1.0, 1450.0, 'c00000195fe4f1d762058627f5d3c7cd3', 'cm91s51ah0003356lm5wgdry1', '2024-01-17 22:26:00', farm_id, 'c00000195fe5705fe7104f366cbec2822', 'c00000195fdc2d050c3d73bc51462c1c0'),
    ('c04808c10d055484f8d5532838d1b9da', 'motorista tratador', 1.0, 1500.0, 'c0000019600e7a0ee7bf5d4f3fd4db5f4', 'cm91s51ah0003356lm5wgdry1', '2024-01-16 22:37:00', farm_id, 'c00000195fe5705fe7104f366cbec2822', 'c00000195fdc2d050c3d73bc51462c1c0');
END $$;
