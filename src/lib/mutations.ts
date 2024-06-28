
import { gql } from '@apollo/client';

export const ENSURE_INDEX_MUTATION = gql`
  mutation EnsureIndex {
    ensureIndex
  }
`;