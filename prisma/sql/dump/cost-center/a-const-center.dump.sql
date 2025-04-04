DO $$ 
DECLARE 
    parent_id TEXT;
    names TEXT[] := ARRAY[
        'venda de leite e derivados',
        'venda de animais',
        'outros produtos'
    ];
    i INT;
BEGIN
    -- Inserir a categoria principal e armazenar o ID gerado
    INSERT INTO public.cost_center (id, "name", description, code, "farmId", "parentId", "createdAt", "updatedAt")
    VALUES (cuid(), 'receita bruta', '', 'A', 'cm91s4bwp0000356lmm49ht31', NULL, CURRENT_TIMESTAMP, NOW())
    RETURNING id INTO parent_id;

    -- Inserir as subcategorias usando o ID gerado acima como parent_id
    FOR i IN 1..array_length(names, 1) LOOP
        INSERT INTO public.cost_center
            (id, "name", description, code, "farmId", "parentId", "createdAt", "updatedAt")
        VALUES 
            (cuid(), names[i], '', 'A.' || i, 'cm91s4bwp0000356lmm49ht31', parent_id, CURRENT_TIMESTAMP, NOW());
    END LOOP;
END $$;
