DO $$
DECLARE
  farm_id TEXT := 'cm91s4bwp0000356lmm49ht31';
BEGIN
  INSERT INTO transactions_types (id, "name", code, "farmId","createdAt", "updatedAt") VALUES
    ('c00000195fe5705fbe2b1d7d43fd25712', 'entrada', 'income', farm_id,CURRENT_TIMESTAMP, NOW()),
    ('c00000195fe5705fe7104f366cbec2822', 'saídas', 'expenses', farm_id,CURRENT_TIMESTAMP, NOW());
END $$;