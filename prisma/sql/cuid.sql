CREATE FUNCTION cuid() RETURNS TEXT AS $$
DECLARE
    timestamp_part TEXT;
    random_part TEXT;
    counter_part TEXT;
BEGIN
    -- Parte do timestamp baseado no tempo atual (em milissegundos), convertido corretamente para BIGINT
    timestamp_part := encode(int8send(cast(extract(epoch FROM clock_timestamp()) * 1000 AS BIGINT)), 'hex');

    -- Parte aleatória para evitar colisões
    random_part := substr(encode(gen_random_bytes(6), 'hex'), 1, 12);

    -- Contador simples baseado em um número aleatório (simula a ordem dos CUIDs)
    counter_part := substr(encode(gen_random_bytes(2), 'hex'), 1, 4);

    -- Concatena tudo e adiciona o prefixo "c" para formar um CUID
    RETURN 'c' || timestamp_part || random_part || counter_part;
END;
$$ LANGUAGE plpgsql;