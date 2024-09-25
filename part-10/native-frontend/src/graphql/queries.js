import { gql } from '@apollo/client';
import { CORE_REPOSITORY_FIELDS, CORE_REVIEW_FIELDS } from './fragments';

export const ALL_REPOSITORIES = gql`
    query Repositories($orderBy: AllRepositoriesOrderBy!, $orderDirection: OrderDirection!, $searchKeyword: String!, $first: Int!, $after: String) {
        repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword, first: $first, after: $after) {
            pageInfo {
                endCursor
                hasNextPage
            }
            edges {
                cursor
                node {
                    ...CoreRepositoryFields
                }
            }
        }
    }
    ${CORE_REPOSITORY_FIELDS}
`;

export const REPOSITORY_BY_ID = gql`
    query RepositoryById($repositoryId: ID!, $first: Int!, $after: String) {
        repository(id: $repositoryId) {
            ...CoreRepositoryFields
            url
            reviews(first: $first, after: $after) {
                pageInfo {
                    endCursor
                    hasNextPage
                }
                edges {
                    node {
                        ...CoreReviewFields
                    }
                }
            }
        }
    }
    ${CORE_REPOSITORY_FIELDS}
    ${CORE_REVIEW_FIELDS}
`;

export const ME = gql`
    query Me($includeReviews: Boolean = false) {
        me {
            createdAt
            id
            username
            reviews @include(if: $includeReviews) {
                edges {
                    node {
                        ...CoreReviewFields
                    }
                }
            }
        }
    }
    ${CORE_REVIEW_FIELDS}
`;