import { gql } from "@apollo/client";

const ADD_TRANSACTION = gql`
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

const GET_TAGS = gql`
  query getTags($limit: Int) {
    tags(limit: $limit, distinct_on: name) {
      name
    }
  }
`;

const ADD_TAG = gql`
  mutation addTag($name: String!, $transactionId: uuid!) {
    insert_tags(objects: { name: $name, transaction_id: $transactionId }) {
      returning {
        name
      }
    }
  }
`;

export { ADD_TRANSACTION, GET_TAGS, ADD_TAG };
