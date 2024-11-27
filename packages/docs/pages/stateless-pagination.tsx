import { H1, Panel, StatelessPagination, Text } from '@bigcommerce/big-design';
import React, { useEffect, useState } from 'react';

import { Code, CodePreview, GuidelinesTable, List } from '../components';
import { MarginPropTable, StatelessPaginationPropTable } from '../PropTables';
import { start } from 'repl';

const StatelessPaginationPage = () => {
  return (
    <>
      <H1>StatelessPagination</H1>

      <Panel header="Overview" headerId="overview">
        <Text>
          <Code primary>StatelessPagination</Code> is used to divide a long list or table into
          several pages, indicating other pages exist and allowing the user to access them. This
          makes the content easier to read and ensures faster loading time. The user can easily
          navigate through the pages in order. The user can also select the number of results they
          want to see on each page, giving them more control over the way they view the data.
        </Text>
        <Text bold>When to use:</Text>
        <List>
          <List.Item>On tables that contain more than 25 number of rows of data/content.</List.Item>
          <List.Item>
            When the data/content uses a cursor-based form of pagination or if you wish to add
            custom logic around pagination.
          </List.Item>
        </List>
      </Panel>

      <Panel header="Implementation" headerId="implementation">
        <CodePreview>
          {/* jsx-to-string:start */}
          {function ExampleList() {
            // ===== Horrible mock BE API STARTS =====
            // coded as synchronous, but would be async in real life
            const mockGetItemResultsAPI = (paramsString = '') => {
              const allItems = [
                {
                  cursor: 'abc123',
                  item: 'Item 1',
                  colour: 'blue' as const,
                  created: new Date('12/28/24'),
                },
                {
                  cursor: 'def456',
                  item: 'Item 2',
                  colour: 'red' as const,
                  created: new Date('12/24/24'),
                },
                {
                  cursor: 'ghi789',
                  item: 'Item 3',
                  colour: 'red' as const,
                  created: new Date('12/29/24'),
                },
                {
                  cursor: 'jkl012',
                  item: 'Item 4',
                  colour: 'blue' as const,
                  created: new Date('12/31/24'),
                },
                {
                  cursor: 'mno345',
                  item: 'Item 5',
                  colour: 'red' as const,
                  created: new Date('12/27/24'),
                },
                {
                  cursor: 'pqr678',
                  item: 'Item 6',
                  colour: 'red' as const,
                  created: new Date('12/26/24'),
                },
                {
                  cursor: 'stu901',
                  item: 'Item 7',
                  colour: 'blue' as const,
                  created: new Date('12/25/24'),
                },
                {
                  cursor: 'vwx234',
                  item: 'Item 8',
                  colour: 'blue' as const,
                  created: new Date('12/30/24'),
                },
                {
                  cursor: 'yz567',
                  item: 'Item 9',
                  colour: 'red' as const,
                  created: new Date('12/23/24'),
                },
                {
                  cursor: 'abc890',
                  item: 'Item 10',
                  colour: 'blue' as const,
                  created: new Date('12/22/24'),
                },
              ];

              const paramObject = new URLSearchParams(paramsString);
              const limit = Number(paramObject.get('limit') ?? 2);

              // filter
              const colour = { red: 'red' as const, blue: 'blue' as const }[
                String(paramObject.get('colour'))
              ];
              // sort
              const sort = { newToOld: 'newToOld' as const, oldToNew: 'oldToNew' as const }[
                String(paramObject.get('sort'))
              ];

              // cursors
              const after = paramObject.get('after');
              const before = paramObject.get('before');

              if (after && before) {
                throw new Error('Cannot have both after and before');
              }

              const filteredSortedItems = allItems
                .filter((item) => !colour || item.colour === colour)
                .sort((a, b) => {
                  switch (sort) {
                    case 'newToOld':
                      return b.created.getTime() - a.created.getTime();
                    case 'oldToNew':
                      return a.created.getTime() - b.created.getTime();
                    default:
                      return 0;
                  }
                });

              let itemResults: typeof allItems = [];

              if (after) {
                const afterItemIndex = filteredSortedItems.findIndex(
                  (item) => item.cursor === after,
                );

                itemResults = filteredSortedItems.slice(
                  afterItemIndex + 1,
                  afterItemIndex + 1 + limit,
                );
              } else if (before) {
                const beforeItemIndex = filteredSortedItems.findIndex(
                  (item) => item.cursor === before,
                );

                itemResults = filteredSortedItems.slice(beforeItemIndex - limit, beforeItemIndex);
              } else {
                itemResults = filteredSortedItems.slice(0, limit);
              }

              const endCursor = [...itemResults].pop()?.cursor;
              const startCursor = [...itemResults].shift()?.cursor;

              const startCursorNotFirstItem =
                [...filteredSortedItems].shift()?.cursor !== startCursor;
              const endCursorNotLastItem = [...filteredSortedItems].pop()?.cursor !== endCursor;

              const updatedParams = new URLSearchParams(paramObject);

              updatedParams.set('limit', limit.toString());
              updatedParams.delete('after');
              updatedParams.delete('before');

              const nextParams = new URLSearchParams(updatedParams);

              if (endCursor) {
                nextParams.append('after', endCursor);
              }

              const previousParams = new URLSearchParams(updatedParams);

              if (startCursor) {
                previousParams.append('before', startCursor);
              }

              return {
                data: itemResults.map(({ cursor, ...rest }) => rest), // cursor would never be exposed within the entities
                meta: {
                  cursor_pagination: {
                    count: itemResults.length,
                    per_page: limit,
                    start_cursor: startCursor, // could be undefined/absent key (e.g. no matching results)
                    end_cursor: endCursor, // could be undefined/absent key (e.g. no matching results)
                    links: {
                      next: endCursor && endCursorNotLastItem ? nextParams.toString() : undefined, // could be undefined/absent key (e.g. no more results)
                      previous:
                        startCursor && startCursorNotFirstItem
                          ? previousParams.toString()
                          : undefined, // could be undefined/absent key (e.g. no previous results)
                    },
                  },
                },
              };
            };
            // ===== Horrible mock BE API ENDS =====

            // ===== ACL STARTS =====
            interface Options {
              perPage: number;
              colour?: 'red' | 'blue';
              sort?: 'newToOld' | 'oldToNew';
              after?: string; // really these two are mutually exclusive
              before?: string; // could tighten this up with a union type
            }

            const fetchItemsResults = ({ perPage: limit, ...rest }: Options) => {
              const optionsAsStrings = Object.entries({ limit, ...rest }).reduce(
                (acc, [key, value]) => ({ ...acc, ...(value ? { [key]: `${value}` } : {}) }),
                {},
              );

              const apiResults = mockGetItemResultsAPI(
                new URLSearchParams(optionsAsStrings).toString(),
              );

              return {
                items: apiResults.data,
                meta: {
                  total: apiResults.meta.cursor_pagination.count,
                  perPage: apiResults.meta.cursor_pagination.per_page,
                  pagination: {
                    hasNext: !!apiResults.meta.cursor_pagination.links.next,
                    hasPrevious: !!apiResults.meta.cursor_pagination.links.previous,
                    startCursor: apiResults.meta.cursor_pagination.start_cursor,
                    endCursor: apiResults.meta.cursor_pagination.end_cursor,
                  },
                },
              };
            };
            // ===== ACL ENDS =====

            // ===== Typical View Component STARTS =====
            const itemsPerPageOptions = [2, 3, 5, 10];
            const [options, setOptions] = useState<Options>({ perPage: itemsPerPageOptions[0] });

            // would an async function wrapped in something like useQuery in real life
            const results = fetchItemsResults(options);

            const { startCursor, endCursor, hasNext, hasPrevious } = results.meta.pagination;

            // need to maintain any sort and filter when changing pages
            const next = () => setOptions(({ before, ...rest }) => ({ ...rest, after: endCursor }));

            // need to maintain any sort and filter when changing pages
            const previous = () =>
              setOptions(({ after, ...rest }) => ({ ...rest, before: startCursor }));

            // need to remove any previous after/before when changing filters
            const filter = (colour?: 'red' | 'blue') =>
              setOptions(({ before, after, ...rest }) => ({ ...rest, colour }));

            // need to remove any previous after/before when changing sorts
            const sort = (sort?: 'oldToNew' | 'newToOld') =>
              setOptions(({ before, after, ...rest }) => ({ ...rest, sort }));

            // technically, you could maintain the after/before when changing perPage
            // but it's probably not what the user would expect
            const limit = (perPage: number) =>
              setOptions(({ before, after, ...rest }) => ({ ...rest, perPage }));

            return (
              <>
                <StatelessPagination
                  disableNext={!hasNext}
                  disablePrevious={!hasPrevious}
                  itemsPerPage={options.perPage}
                  itemsPerPageOptions={itemsPerPageOptions}
                  onItemsPerPageChange={limit}
                  onNext={next}
                  onPrevious={previous}
                />
                {/* Crude Filter and Sort UX to demonstrate interplay with fetch options */}
                <ul>
                  {results.items.map(({ item, colour, created }) => (
                    <li key={item}>
                      {item} - {colour} - {created.toLocaleDateString()}
                    </li>
                  ))}
                </ul>
                <hr />
                <select
                  onChange={({ target: { value } }) =>
                    // little trick to cast the string to the type
                    filter({ red: 'red' as const, blue: 'blue' as const }[value])
                  }
                >
                  <option value="">Any Colour</option>
                  <option value="red">Red Only</option>
                  <option value="blue">Blue Only</option>
                </select>{' '}
                -{' '}
                <select
                  onChange={({ target: { value } }) =>
                    // little trick to cast the string to the type
                    sort({ oldToNew: 'oldToNew' as const, newToOld: 'newToOld' as const }[value])
                  }
                >
                  <option value="">No Order</option>
                  <option value="oldToNew">Old to New</option>
                  <option value="newToOld">New to Old</option>
                </select>
                <hr />
              </>
            );
            // ===== Typical View Component STARTS =====
          }}
          {/* jsx-to-string:end */}
        </CodePreview>
      </Panel>

      <Panel header="Props" headerId="props">
        <StatelessPaginationPropTable inheritedProps={<MarginPropTable collapsible />} />
      </Panel>

      <Panel header="Do's and Don'ts" headerId="guidelines">
        <GuidelinesTable
          discouraged={[
            <>
              Don’t place <Code primary>StatelessPagination</Code> below a table.
            </>,
            'Don’t show dropdown arrow when there are less than 10 items.',
          ]}
          recommended={[
            <>
              Place <Code primary>StatelessPagination</Code> directly above the header of the table
              that it controls, right aligned.
            </>,
            'Disable dropdown options greater than the option that will show the total number of results (e.g., if there are 42 results, the highest option should be 50).',
            'Dropdown increments should be multiples of 10 and in increments that make sense for the context.',
          ]}
        />
      </Panel>
    </>
  );
};

export default StatelessPaginationPage;
