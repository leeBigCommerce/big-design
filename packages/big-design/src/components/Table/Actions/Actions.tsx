import React, { RefObject } from 'react';

import { typedMemo } from '../../../utils';
import { Flex } from '../../Flex';
import { Text } from '../../Typography';
import { TableItem, TablePaginationProps, TableSelectable } from '../types';
import { SelectAll } from '../SelectAll';
import { TablePagination } from '../TablePagination';

import { StyledFlex } from './styled';

export interface ActionsProps<T> {
  customActions?: React.ComponentType<any>;
  forwardedRef: RefObject<HTMLDivElement>;
  itemName?: string;
  items: T[];
  pagination?: TablePaginationProps;
  onSelectionChange?: TableSelectable<T>['onSelectionChange'];
  selectedItems: Set<T>;
  stickyHeader?: boolean;
  tableId: string;
}

const InternalActions = <T extends TableItem>({
  customActions,
  forwardedRef,
  itemName,
  items = [],
  onSelectionChange,
  pagination,
  selectedItems,
  stickyHeader,
  tableId,
  ...props
}: ActionsProps<T>) => {
  const isSelectable = typeof onSelectionChange === 'function';
  const totalItems = pagination ? pagination.totalItems : items.length;

  const renderItemName = () => {
    if (typeof itemName !== 'string') {
      return null;
    }

    const text = Boolean(isSelectable) ? itemName : `${totalItems} ${itemName}`;

    return (
      <Flex.Item flexShrink={0} marginRight="medium">
        <Text margin="none">{text}</Text>
      </Flex.Item>
    );
  };

  const renderActions = () => {
    const CustomActions = customActions;

    return CustomActions ? <CustomActions /> : null;
  };

  return (
    <StyledFlex
      alignItems="center"
      aria-controls={tableId}
      flexDirection="row"
      justifyContent="stretch"
      stickyHeader={stickyHeader}
      ref={forwardedRef}
      {...props}
    >
      <SelectAll onChange={onSelectionChange} selectedItems={selectedItems} items={items} totalItems={totalItems} />
      {renderItemName()}
      {renderActions()}

      {pagination && <TablePagination {...pagination} />}
    </StyledFlex>
  );
};

export const Actions = typedMemo(InternalActions);
