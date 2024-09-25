import { gql } from '@apollo/client';

export const CORE_REPOSITORY_FIELDS = gql`
    fragment CoreRepositoryFields on Repository {
        id
        description
        forksCount
        fullName
        language
        ratingAverage
        reviewCount
        stargazersCount
        ownerAvatarUrl
    }
`;

export const CORE_REVIEW_FIELDS = gql`
    fragment CoreReviewFields on Review {
        id
        repositoryId
        text
        rating
        createdAt
        user {
            id
            username
        }
    }
`;