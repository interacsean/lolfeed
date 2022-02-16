import React from 'react';
import {
  Box,
} from '@chakra-ui/react';
import {
  AutoComplete,
  AutoCompleteInput,
  AutoCompleteItem,
  AutoCompleteList,
} from '@choc-ui/chakra-autocomplete';
import IconButton from '../../common/IconButton/IconButton';
import { CheckIcon } from '@chakra-ui/icons';
import useEventTarget from '../../../utils/hooks/useEventTarget';

const aclProps = {
  mt: 1 / 4,
  py: 1 / 3,
};
const aciProps = {
  mx: 1 / 5,
  py: 1 / 5,
  px: 1 / 2,
}

type Props = {
  comics: string[];
  onChoose: (name: string) => void;
}

const ComicAutocomplete = (props: Props) => {
  const [ searchVal, setSearchVal ] = React.useState('');

  return (
    <Box display="flex">
      <AutoComplete
        openOnFocus
        freeSolo
        maxSuggestions={20}
      >
        <AutoCompleteInput
          value={searchVal}
          onChange={useEventTarget(setSearchVal)}
          placeholder="Search comics"
        />
        <AutoCompleteList
          onSelectItem={console.log}
          {...aclProps}
        >
          {props.comics.map((comic) => (
            <AutoCompleteItem
              key={`option-${comic}`}
              value={comic}
              onClick={() => setSearchVal(comic)}
              {...aciProps}
            >
              {comic}
            </AutoCompleteItem>
          ))}
        </AutoCompleteList>
      </AutoComplete>
      <IconButton
        aria-label="Select"
        icon={CheckIcon}
        onClick={() => props.onChoose(searchVal)}
      />
    </Box>
  )
}

export default ComicAutocomplete;
