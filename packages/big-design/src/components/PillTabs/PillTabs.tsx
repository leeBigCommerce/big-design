import { MoreHorizIcon } from '@bigcommerce/big-design-icons';
import React, { createRef, useMemo } from 'react';

import { Button } from '../Button';
import { Dropdown, DropdownItemGroup, DropdownProps } from '../Dropdown';
import { isDropdownItemGroupArray } from '../Dropdown/Dropdown';
import { Flex } from '../Flex';

import { StyledFlexItem, StyledPillTab } from './styled';
import { toDropdownItem } from './toDropDownItem';
import { toDropdownItemGroups } from './toDropdownItemGroups';
import { useAvailableWidth } from './useAvailableWidth';

const toGroups = (items: DropdownProps['items']): DropdownItemGroup[] =>
  isDropdownItemGroupArray(items) ? items : [{ items }];

export interface PillTabItem {
  id: string;
  title: string;
}

export interface PillTabGroup {
  label?: string;
  items: PillTabItem[];
}

interface Pill {
  title: string;
  isVisible: boolean;
  ref: React.RefObject<HTMLDivElement>;
  onClick: () => void;
  isActive: boolean;
}

type ItemsOrGroups = PillTabItem[] | PillTabGroup[];

const isPillTabGroups = (items: ItemsOrGroups): items is PillTabGroup[] =>
  items.length > 0 && 'items' in items[0];

const toPillTabGroups = (items: ItemsOrGroups): PillTabGroup[] =>
  isPillTabGroups(items) ? items : [{ items }];

export interface PillTabsProps {
  items: ItemsOrGroups;
  activePills: string[];
  onPillClick: (itemId: string) => void;
  dropdownItems?: DropdownProps['items'];
}

export const PillTabs: React.FC<PillTabsProps> = ({
  activePills,
  items: itemsOrGroups,
  onPillClick,
  dropdownItems: customDropdownItems = [],
}) => {
  const refs = { parent: createRef<HTMLDivElement>(), dropdown: createRef<HTMLDivElement>() };
  const availableWidth = useAvailableWidth(refs);

  const pillTabGroupsWithoutVisibility = useMemo(
    () =>
      toPillTabGroups(itemsOrGroups).map(({ items, ...rest }) => ({
        ...rest,
        items: items.map(({ title, id }) => ({
          title,
          onClick: () => onPillClick(id),
          isActive: activePills.includes(id),
          ref: createRef<HTMLDivElement>(),
        })),
      })),
    [itemsOrGroups, activePills, onPillClick],
  );

  const { pillTabGroups } = pillTabGroupsWithoutVisibility.reduce<{
    pillTabGroups: Array<{ label?: string; items: Pill[] }>;
    widthBudget: number;
  }>(
    (acc, { items, ...rest }) => {
      let widthBudget = acc.widthBudget;

      const group = {
        ...rest,
        items: items.map((item) => {
          const pillWidth = item.ref.current?.offsetWidth || 0;

          widthBudget -= pillWidth;

          return { ...item, isVisible: widthBudget >= 0 };
        }),
      };

      return { pillTabGroups: [...acc.pillTabGroups, group], widthBudget };
    },
    { pillTabGroups: [], widthBudget: availableWidth },
  );

  const dropdownItemGroups = toDropdownItemGroups({
    overflow: pillTabGroups.map(({ items, ...rest }) => ({
      ...rest,
      items: items.filter(({ isVisible }) => !isVisible).map(toDropdownItem),
    })),
    custom: toGroups(customDropdownItems),
  });

  if (pillTabGroups.length === 0) {
    return null;
  }

  return (
    <Flex
      data-testid="pilltabs-wrapper"
      flexDirection="row"
      flexWrap="nowrap"
      ref={refs.parent}
      role="list"
    >
      {pillTabGroups.map(({ items }) =>
        items.map(({ isVisible, ref, title, isActive, onClick }, index) => (
          <StyledFlexItem
            data-testid={`pilltabs-pill-${index}`}
            isVisible={isVisible}
            key={index}
            ref={ref}
            role="listitem"
          >
            <StyledPillTab
              disabled={!isVisible}
              isActive={isActive}
              marginRight="xSmall"
              onClick={onClick}
              type="button"
              variant="subtle"
            >
              {title}
            </StyledPillTab>
          </StyledFlexItem>
        )),
      )}
      <StyledFlexItem
        data-testid="pilltabs-dropdown-toggle"
        isVisible={dropdownItemGroups.length > 0}
        ref={refs.dropdown}
        role="listitem"
      >
        <Dropdown
          items={dropdownItemGroups}
          toggle={
            <Button iconOnly={<MoreHorizIcon title="add" />} type="button" variant="subtle" />
          }
        />
      </StyledFlexItem>
    </Flex>
  );
};

PillTabs.displayName = 'Pill Tabs';
