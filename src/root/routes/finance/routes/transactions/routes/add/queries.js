const ADD_TRANSACTION = `
  mutation addTransaction($amount: money!, $name: String!, $paid_id: uuid!) {
    insert_transactions(
      objects: { amount: $amount, name: $name, paid_id: $paid_id }
    ) {
      returning {
        name
        created_at
        id
        amount
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
      returning {
        name
      }
    }
  }
`;

export { ADD_TRANSACTION, GET_TAGS, ADD_TAG };
