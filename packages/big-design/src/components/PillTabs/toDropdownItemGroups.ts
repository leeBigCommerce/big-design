import { DropdownItemGroup } from '../Dropdown';

type ToDropDownItemGroups = (groups: {
  overflow: DropdownItemGroup[];
  custom: DropdownItemGroup[];
}) => DropdownItemGroup[];

export const toDropdownItemGroups: ToDropDownItemGroups = ({ overflow, custom }) =>
  [
    overflow,
    custom.map(({ separated, ...rest }, index) => ({
      ...rest,
      separated: separated || (index === 0 && overflow.length > 0),
    })),
  ]
    .flat()
    .filter(({ items }) => items.length > 0);
