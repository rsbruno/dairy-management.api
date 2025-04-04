DO $$ 
DECLARE 
    parent_id TEXT;
    names TEXT[] := ARRAY[
        'capim elefante',
        'pastagens diversas'
    ];
    i INT;
BEGIN
    -- Buscar o ID da categoria principal com base no código
    SELECT id INTO parent_id 
    FROM public.cost_center 
    WHERE code = 'B.4'
    LIMIT 1;

    -- Verificar se encontrou o parent_id antes de inserir as subcategorias
    IF parent_id IS NOT NULL THEN
        FOR i IN 1..array_length(names, 1) LOOP
            INSERT INTO public.cost_center
                (id, "name", description, code, "farmId", "parentId", "createdAt", "updatedAt")
            VALUES 
                (cuid(), names[i], '', 'B.4.' || i, 'cm91s4bwp0000356lmm49ht31', parent_id, CURRENT_TIMESTAMP, NOW());
        END LOOP;
    ELSE
        RAISE NOTICE 'Nenhum parent_id encontrado para o código B';
    END IF;
END $$;

