const ADD_FLAT_MEMBER = `
mutation addFlatMember($flatId: uuid!, $userId: uuid!) {
  insert_flat_member(objects: { flat_id: $flatId, user_id: $userId }) {
    affected_rows
  }
}
`;

const COMPLETE_CHORE = `
mutation completeChore($choreId: uuid!) {
  insert_completion(
    objects: { chore_id: $choreId }
  ) {
    returning {
      id
    }
  }
}
`;

const CREATE_CHORE = `
  mutation addChore($name: String!, $flatId: uuid!) {
    insert_chore(
      objects: { name: $name, flat_id: $flatId }
    ) {
      returning {
        id
      }
    }
  }
`;

const CREATE_FLAT = `
  mutation addFlat($name: String!) {
    insert_flat(
      objects: { name: $name }
    ) {
      returning {
        id
      }
    }
  }
`;

const GET_FLAT = `
  query getFlat {
    flat {
      id
      name
      chores {
        id
        name
        description
      }
      members {
        user_id
      }
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

const GET_COMPLETION_COUNT = `
  query getCompletionCount {
    completion_counts {
      user_id
      completions
      chore_id
    }
  }
`;

export {
  ADD_FLAT_MEMBER,
  COMPLETE_CHORE,
  CREATE_CHORE,
  CREATE_FLAT,
  GET_FLAT,
  GET_USERS,
  GET_COMPLETION_COUNT,
};
