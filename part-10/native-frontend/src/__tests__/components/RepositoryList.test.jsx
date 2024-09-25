import { RepositoryContainer } from '../../components/RepositoryList';
import { render, screen } from '@testing-library/react-native';

describe('RepositoryList', () => {
    describe('RepositoryListContainer', () => {
        it('renders repository information correctly', () => {
            const repositories = {
                totalCount: 8,
                pageInfo: {
                  hasNextPage: true,
                  endCursor:
                    'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
                  startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
                },
                edges: [
                  {
                    node: {
                      id: 'jaredpalmer.formik',
                      fullName: 'jaredpalmer/formik',
                      description: 'Build forms in React, without the tears',
                      language: 'TypeScript',
                      forksCount: 1619,
                      stargazersCount: 21856,
                      ratingAverage: 88,
                      reviewCount: 3,
                      ownerAvatarUrl:
                        'https://avatars2.githubusercontent.com/u/4060187?v=4',
                    },
                    cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
                  },
                  {
                    node: {
                      id: 'async-library.react-async',
                      fullName: 'async-library/react-async',
                      description: 'Flexible promise-based React data loader',
                      language: 'JavaScript',
                      forksCount: 69,
                      stargazersCount: 1760,
                      ratingAverage: 72,
                      reviewCount: 3,
                      ownerAvatarUrl:
                        'https://avatars1.githubusercontent.com/u/54310907?v=4',
                    },
                    cursor:
                      'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
                  },
                ],
            };

            render(<RepositoryContainer repositories={repositories} />);

            const repositoryItems = screen.getAllByTestId('repositoryItem');
            const [firstRepositoryItem, secondRepositoryItem] = repositoryItems;

            expect(firstRepositoryItem).toHaveTextContent('jaredpalmer/formik');
            expect(firstRepositoryItem).toHaveTextContent('Build forms in React, without the tears');
            expect(firstRepositoryItem).toHaveTextContent('TypeScript');
            expect(firstRepositoryItem).toHaveTextContent('1.6k');
            expect(firstRepositoryItem).toHaveTextContent('21.9k');
            expect(firstRepositoryItem).toHaveTextContent('88');
            expect(firstRepositoryItem).toHaveTextContent('3');

            expect(secondRepositoryItem).toHaveTextContent('async-library/react-async');
            expect(secondRepositoryItem).toHaveTextContent('Flexible promise-based React data loader');
            expect(secondRepositoryItem).toHaveTextContent('JavaScript');
            expect(secondRepositoryItem).toHaveTextContent('69');
            expect(secondRepositoryItem).toHaveTextContent('1.8k');
            expect(secondRepositoryItem).toHaveTextContent('72');
            expect(secondRepositoryItem).toHaveTextContent('3');
        });
    });
});