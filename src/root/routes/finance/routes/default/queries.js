const GET_SPENT = `
  query getSpent{
    spent_totals {
      amount
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

// TODO:
const DELETE_TRANSACTION = `
  mutation delete_transaction($id: uuid!) {
    delete_transactions(where: { id: { _eq: $id } }) {
      affected_rows
    }
  }
`;

const GET_SPENT_BY_TAG = `
  query getSpentByTag{
    spent_by_tag(order_by: {total: desc}) {
      name
      total
    }
  }
`;

const GET_SPENT_BY_WEEK = `
  query getSpentByWeek {
    spent_by_week {
      total
      weekly
    }
  }
`;

const GET_MOST_RECENT_WEEK = `
  query getSpentByWeek {
    spent_by_week(limit: 1, order_by: {weekly: desc}) {
      total
      weekly
    }
  }
`;

const GET_MOST_RECENT_FORTNIGHT = `
  query getSpentByWeek {
    spent_by_week(limit: 2, order_by: {weekly: desc}) {
      total
      weekly
    }
  }
`;

const GET_SPENT_BY_MONTH = `
  query getSpentByMonth {
    spent_by_month {
      total
      monthly
    }
  }
`;

const GET_MOST_RECENT_MONTH = `
  query getSpentByMonth {
    spent_by_month(limit: 1, order_by: {monthly: desc}) {
      total
      monthly
    }
  }
`;

const GET_TRANSACTIONS_FOR_RANGE = `
  query getTransactions (
    $startDate: timestamptz!,
    $endDate: timestamptz!
  ) {
    transactions(
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
      amount
      paid_id
      created_at
      splits {
        user_id
        percentage
      }
      tags {
        name
      }
    }
  }
`;

export {
  GET_SPENT,
  GET_OWED,
  DELETE_TRANSACTION,
  GET_SPENT_BY_TAG,
  GET_SPENT_BY_WEEK,
  GET_SPENT_BY_MONTH,
  GET_MOST_RECENT_WEEK,
  GET_MOST_RECENT_FORTNIGHT,
  GET_MOST_RECENT_MONTH,
  GET_TRANSACTIONS_FOR_RANGE,
};
