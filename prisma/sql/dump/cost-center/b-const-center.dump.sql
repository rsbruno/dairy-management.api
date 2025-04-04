DO $$ 
DECLARE 
    parent_id TEXT;
    names TEXT[] := ARRAY[
        'concentrados e minerais',
        'produção de forragem',
        'compra de volumosos',
        'manutenção de pastagens',
        'aluguel de pastagens',
        'sanidade do rebanho',
        'ordenha mecânica',
        'inseminação artificial',
        'energia, combustíveis e lubrificantes',
        'ferramentas e utensílios',
        'reparo de máquinas e equipamentos',
        'manutenção de benfeitorias e instalações',
        'administração e consultoria',
        'mão-de-obra',
        'impostos e taxas',
        'outras despesas'
    ];
    i INT;
BEGIN
    -- Inserir a categoria principal e armazenar o ID gerado
    INSERT INTO public.cost_center (id, "name", description, code, "farmId", "parentId", "createdAt", "updatedAt")
    VALUES (cuid(), 'despesas operacionais', '', 'B', 'cm91s4bwp0000356lmm49ht31', NULL, CURRENT_TIMESTAMP, NOW())
    RETURNING id INTO parent_id;

    -- Inserir as subcategorias usando o ID gerado acima como parent_id
    FOR i IN 1..array_length(names, 1) LOOP
        INSERT INTO public.cost_center
            (id, "name", description, code, "farmId", "parentId", "createdAt", "updatedAt")
        VALUES 
            (cuid(), names[i], '', 'B.' || i, 'cm91s4bwp0000356lmm49ht31', parent_id, CURRENT_TIMESTAMP, NOW());
    END LOOP;
END $$;

DO $$ 
DECLARE 
    parent_id TEXT;
    names TEXT[] := ARRAY[
        'silagem de milho',
        'cana-de-açúcar: produção e uso',
        'capineira'
    ];
    i INT;
BEGIN
    -- Buscar o ID da categoria principal com base no código
    SELECT id INTO parent_id 
    FROM public.cost_center 
    WHERE code = 'B.2'
    LIMIT 1;

    -- Verificar se encontrou o parent_id antes de inserir as subcategorias
    IF parent_id IS NOT NULL THEN
        FOR i IN 1..array_length(names, 1) LOOP
            INSERT INTO public.cost_center
                (id, "name", description, code, "farmId", "parentId", "createdAt", "updatedAt")
            VALUES 
                (cuid(), names[i], '', 'B.2.' || i, 'cm91s4bwp0000356lmm49ht31', parent_id, CURRENT_TIMESTAMP, NOW());
        END LOOP;
    ELSE
        RAISE NOTICE 'Nenhum parent_id encontrado para o código B';
    END IF;
END $$;
