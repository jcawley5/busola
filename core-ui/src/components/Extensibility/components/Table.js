import React from 'react';

import { GenericList } from 'shared/components/GenericList/GenericList';

import { useGetTranslation } from '../helpers';
import { Widget } from './Widget';

export function Table({ value, structure, schema }) {
  const { widgetT } = useGetTranslation();

  const headerRenderer = () =>
    (structure.children || []).map(column => widgetT([structure, column]));

  const rowRenderer = entry =>
    structure.children.map(column => (
      <Widget value={entry} structure={column} schema={schema} />
    ));

  return (
    <GenericList
      showSearchSuggestion={false}
      entries={value || []}
      headerRenderer={headerRenderer}
      rowRenderer={rowRenderer}
    />
  );
}
Table.array = true;