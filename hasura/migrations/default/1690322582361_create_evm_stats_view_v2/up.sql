CREATE OR REPLACE VIEW "evm"."stats" AS 
SELECT
  COALESCE(evm_block.avg_gas_used, 0) AS block_gas_avg,
  COALESCE(daily_transactions.total_transaction_count, 0) AS daily_transaction_count,
  COALESCE(ath.max_transaction_sum, 0) AS ath_transaction_sum,
  COALESCE(incoming_tlos.transfer_count, 0) AS incoming_tlos_count
FROM
  (
    (
      (
        (
          SELECT AVG(subquery_alias.gas_used) AS avg_gas_used
            FROM (
              SELECT gas_used, timestamp
              FROM evm.block
              ORDER BY timestamp DESC
              LIMIT 100
            ) subquery_alias
        ) evm_block
        CROSS JOIN LATERAL (
          SELECT
            sum(jsonb_array_length(block.transactions)) AS total_transaction_count
          FROM
            evm.block
          WHERE
            (
              block.timestamp >= (now() - '24:00:00' :: interval)
            )
        ) daily_transactions
      )
      CROSS JOIN LATERAL (
        SELECT
          max(pairs_sum.total_transaction_count) AS max_transaction_sum
        FROM
          (
            SELECT
              (
                (b1.number || ' and ' :: text) || (b1.number + (1) :: numeric)
              ) AS block_pair,
              sum(
                (
                  jsonb_array_length(b1.transactions) + jsonb_array_length(b2.transactions)
                )
              ) AS total_transaction_count
            FROM
              (
                evm.block b1
                LEFT JOIN evm.block b2 ON ((b1.number = (b2.number - (1) :: numeric)))
              )
            WHERE
              ((b1.number % (2) :: numeric) = (0) :: numeric)
            GROUP BY
              (
                (b1.number || ' and ' :: text) || (b1.number + (1) :: numeric)
              )
          ) pairs_sum
      ) ath
    )
    CROSS JOIN LATERAL (
      SELECT
        count(incoming_transfer.id) AS transfer_count
      FROM
        evm.incoming_transfer
    ) incoming_tlos
  );
