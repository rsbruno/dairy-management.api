delete from "_PersonsToTenants" 
where "A" != '';

delete from "costCenter"
where id != '';

delete from tenants
where id != '';

delete from farms
where id != '';

delete from persons
where id != '';

delete from measurement_units  
where id != '';

delete from transactions_types  
where id != '';