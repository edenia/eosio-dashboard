CREATE OR REPLACE VIEW "public"."check_history_by_endpoint" AS
 SELECT endpoints_check_history.producer_id,
    endpoints_check_history.value,
    endpoints_check_history.date,
    health_check_history.total_checks,
    (endpoints_check_history.sum_total_time / (health_check_history.total_checks))::real AS avg_time,
    ((endpoints_check_history.successful_checks * 100) / health_check_history.total_checks) AS availability
   FROM (endpoints_check_history
     JOIN health_check_history ON ((endpoints_check_history.date = health_check_history.date)))
  ORDER BY endpoints_check_history.date, ((endpoints_check_history.successful_checks * 100) / health_check_history.total_checks) DESC, (endpoints_check_history.sum_total_time / (health_check_history.total_checks));
