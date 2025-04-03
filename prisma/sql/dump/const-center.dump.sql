DO $$
DECLARE
	farm_id TEXT := 'c20250328003023afa9901166';
	
    cost_centers TEXT[] := ARRAY[
        'A1. Leite e derivados',
        'A2. Animais',
        'A3. Outros Produtos',
        'B1. Concentrados e minerais',
        'B2. Produção de forragem',
        'B3. Compra de volumosos',
        'B4. Manutenção de pastagens',
        'B5. Aluguel de pastagens',
        'B6. Sanidade do rebanho',
        'B7. Ordenha mecânica',
        'B8. Inseminação artificial',
        'B9. Energia, combust. e lubrificantes',
        'B10. Ferramentas e utensílios',
        'B11. Reparo de máq. e equipamentos',
        'B12. Manutenção benfeit. e instal.',
        'B13. Administração e consultoria',
        'B14. Mão-de-obra',
        'B15. Impostos e taxas',
        'B16. Outras despesas',
        'C. Desp. de investimento'
    ];
    center TEXT;
BEGIN
    FOREACH center IN ARRAY cost_centers
    LOOP
        EXECUTE format(
            'INSERT INTO "costCenter"("id","name","description", "farmId", "createdAt","updatedAt") 
            VALUES (cuid(), %L, %L, %L, NOW(), NOW());',
            center, '', farm_id
        );
    END LOOP;
END $$;


select * from "costCenter"