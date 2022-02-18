import React from 'react';
import { Flex, Text, Box } from '@chakra-ui/react';
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
  AutoCompleteProps,
  AutoCompleteCreatable,
  AutoCompleteTag,
} from '@choc-ui/chakra-autocomplete';
import { CheckIcon } from '@chakra-ui/icons';
import IconButton from '../../common/IconButton/IconButton';
import useEventTarget from '../../../utils/hooks/useEventTarget';

type Props = {
  comics: string[];
  comicsList: string[];
  onAdd: (name: string) => void;
  onRemove: (name: string) => void;
};

const ComicAutocomplete = (props: Props) => {
  const [searchVal, setSearchVal] = React.useState('');

  const onSelectOption = React.useCallback(
    (params: Parameters<Required<AutoCompleteProps>['onSelectOption']>[0]) => {
      props.onAdd(params.item.value);
    },
    [props.onAdd],
  );

  return (
    <AutoComplete
      openOnFocus
      creatable
      multiple
      maxSuggestions={20}
      value={props.comics}
      onSelectOption={onSelectOption}
    >
      <AutoCompleteInput size="sm" placeholder="Search comics">
        {({ tags }) =>
          tags.map((tag, tid) => (
            <AutoCompleteTag
              variant="subtle"
              key={tid}
              label={tag.label}
              onRemove={() => props.onRemove(tag.label)}
            />
          ))
        }
      </AutoCompleteInput>
      <AutoCompleteList>
        {props.comicsList.map((comic) => (
          <AutoCompleteItem
            key={`option-${comic}`}
            value={comic}
            onClick={() => setSearchVal(comic)}
          >
            {comic}
          </AutoCompleteItem>
        ))}
        <AutoCompleteCreatable>
          {({ value }) => <Text fontStyle="italic">Add {value}</Text>}
        </AutoCompleteCreatable>
      </AutoCompleteList>
    </AutoComplete>
  );
};

export default ComicAutocomplete;
