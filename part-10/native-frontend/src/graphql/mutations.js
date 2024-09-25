import { gql } from '@apollo/client';

export const SIGN_IN = gql`
    mutation SignIn($username: String!, $password: String!) {
        authenticate(credentials: { username: $username, password: $password }) {
            accessToken
        }
    }
`;


export const CREATE_REVIEW = gql`
    mutation CreateReview($reviewInput: CreateReviewInput!) {
        createReview(review: $reviewInput) {
            repositoryId
        }
    }
`;

export const CREATE_USER = gql`
    mutation CreateUser($user: CreateUserInput!) {
        createUser(user: $user) {
            username
            id
        }
    }
`;

export const DELETE_REVIEW = gql`
    mutation DeleteReview($deleteReviewId: ID!) {
        deleteReview(id: $deleteReviewId)
    }
`;