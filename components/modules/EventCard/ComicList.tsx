import React from 'react';
import { Box, Text, Wrap } from '@chakra-ui/react';
import ComicLink from '../ComicLink/ComicLink';
import ComicAutocomplete from './ComicAutocomplete';
import { ComicRecord } from '../../../services/database/comics/types';
import ConditionalWrapper from '../../common/ConditionalWrapper/ConditionalWrapper';

type Props = {
  title: string;
  isEditing: boolean;
  comicsList: ComicRecord[];
  comicNames: string[] | undefined;
  onAdd: (name: string) => void;
};

const ComicList = (props: Props) => {
  const findComic = React.useCallback(
    (comicName: string) =>
      props.comicsList.find(
        (c) => c.name === comicName || c.aliases?.includes(comicName),
      ),
    [props.comicsList],
  );
  const allComicNames = React.useMemo(
    () => props.comicsList?.map((c) => c.name),
    [props.comicsList],
  );

  return (
    <ConditionalWrapper condition={!!props.isEditing} wrapper={Box}>
      <ConditionalWrapper condition={!!props.isEditing} wrapper={Wrap}>
        <Text variant="detail" as="span">
          {props.title}:
        </Text>
        {(props.comicNames || []).map((c) => {
          const foundComic = findComic(c) || c;
          return <ComicLink comic={foundComic} />;
        })}
      </ConditionalWrapper>
      {props.isEditing && (
        <ComicAutocomplete comics={allComicNames} onChoose={props.onAdd} />
      )}
    </ConditionalWrapper>
  );
};

export default React.memo(ComicList);
