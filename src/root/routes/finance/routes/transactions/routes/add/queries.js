const ADD_TRANSACTION = `
  mutation addTransaction($amount: money!, $name: String!, $paid_id: uuid!) {
    insert_transactions(
      objects: { amount: $amount, name: $name, paid_id: $paid_id }
    ) {
      returning {
        id
      }
    }
  }
`;

const GET_TAGS = `
  query getTags($limit: Int) {
    tags(limit: $limit, distinct_on: name) {
      name
    }
  }
`;

const ADD_TAG = `
  mutation addTag($name: String!, $transactionId: uuid!) {
    insert_tags(objects: { name: $name, transaction_id: $transactionId }) {
      affected_rows
    }
  }
`;

const GET_USERS = `
  query getUsers($searchString: String) {
    users(limit: 5, where: {name: {_ilike: $searchString}} ) {
      name
      id
    }
  }
`;

const ADD_SPLIT = `
  mutation addSplit($percentage: float8! $transactionId: uuid!, $user_id: uuid) {
    insert_splits(
      objects: {
        percentage: $percentage,
        transaction_id: $transactionId,
        user_id: $user_id
      }
    ) {
      affected_rows
    }
  }
`;

export { ADD_TRANSACTION, GET_TAGS, ADD_TAG, ADD_SPLIT, GET_USERS };
