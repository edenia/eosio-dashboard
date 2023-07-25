CREATE OR REPLACE FUNCTION public.block_history_by_producer(since timestamp with time zone)
 RETURNS SETOF block_history_by_producer_type
 LANGUAGE sql
 IMMUTABLE STRICT
AS $function$
    SELECT gen_random_uuid() as id, producer, count(1) AS "blocks" FROM block_history WHERE "timestamp" >= since GROUP BY producer;
$function$;
