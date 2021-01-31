const GET_SPENT_FOR_PERIOD = `
  query getSpendForPeriod (
    $startDate: timestamptz!,
    $endDate: timestamptz!
  ) {
    spent_by_transaction_aggregate(
      where: {
        _and: [
          {
            created_at: {
              _gte: $startDate
            }
          },
          {
            created_at: {
              _lte: $endDate
            }
          }
        ]
      }
    ) {
      aggregate {
        sum {
          total_numeric
        }
      }
    }
  }
`;

const GET_RELATIVE_SPEND_BAR_DATA_WEEK = `
  query MyQuery(
      $week: date!
    ) {
    spent_by_week_nz(
      where: {
        weekly: {
          _eq: $week
        }
      }
    ) {
      total
    }
    spent_by_week_nz_aggregate {
      aggregate {
        max {
          total
        }
        min {
          total
        }
        avg {
          total
        }
      }
    }
  }
`;

const GET_SPENT_BY_WEEK = `
  query MyQuery {
    spent_by_week_nz {
      total
      weekly
    }
  }
`;

const GET_SPENT_BY_MONTH = `
  query MyQuery {
    spent_by_month_nz {
      total
      monthly
    }
  }
`;

const GET_RELATIVE_SPEND_BAR_DATA_MONTH = `
  query MyQuery(
      $month: date!
    ) {
    spent_by_month_nz(
      where: {
        monthly: {
          _eq: $month
        }
      }
    ) {
      total
    }
    spent_by_month_nz_aggregate {
      aggregate {
        max {
          total
        }
        min {
          total
        }
        avg {
          total
        }
      }
    }
  }
`;

const GET_SPENT_BY_TAG_IN_DATE_RANGE = `
  query MyQuery(
    $startDate: timestamptz!,
    $endDate: timestamptz!
  ) {
    get_spent_by_tag_in_date_range(
      args: {
        end_time: $endDate,
        start_time: $startDate
      },
      order_by: {total: desc}
    ) {
      name
      amount
      total
    }
  }
`;

const GET_OWED = `
  query getOwed{
    owed_totals {
      owes
      amount
      to
    }
  }
`;

export {
  GET_SPENT_FOR_PERIOD,
  GET_RELATIVE_SPEND_BAR_DATA_WEEK,
  GET_SPENT_BY_WEEK,
  GET_SPENT_BY_MONTH,
  GET_RELATIVE_SPEND_BAR_DATA_MONTH,
  GET_SPENT_BY_TAG_IN_DATE_RANGE,
  GET_OWED,
};
