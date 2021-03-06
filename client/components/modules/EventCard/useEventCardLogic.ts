import React from 'react';
import saveEventOverrides from './saveEventOverrides';
import { lensPath, set, uniq } from 'ramda';
import { Tags } from '../../../../domain/events/tags/tags';
import { EventCardProps } from './EventCardEditable';
import useEventTarget from '../../../../utils/hooks/useEventTarget';
import { ComEvent, EvtApproval } from '../../../../domain/events/types';

const newTagOptions = Object.keys(Tags);
const approvalOptions = [
  EvtApproval.PENDING_APPROVAL,
  EvtApproval.APPROVED_MANUALLY,
  EvtApproval.REJECTED,
];

const useEventCardLogic = (props: EventCardProps) => {
  const [event, setEvent] = React.useState(props.event);
  const saveThenExitEdit = React.useCallback(() => {
    saveEventOverrides(event).then(() => props.onExit?.(event));
  }, [props.onExit, event]);
  const cancelEdit = React.useCallback(() => {
    setEvent(props.event);
    props.onExit?.(props.event);
  }, [props.event]);
  const setEventFieldVal = React.useCallback(
    (fieldPath: string[], val: string) =>
      setEvent((prev) => set(lensPath(fieldPath), val, prev)),
    [],
  );
  const setEventField = React.useCallback(
    (fieldPath: string[]) => (val: string) => setEventFieldVal(fieldPath, val),
    [setEventFieldVal],
  );
  const sendEmptyIf = React.useCallback(
    (fn: (val: string) => void, placeholder: string) => (val: string) => {
      fn(val === placeholder ? '' : val);
    },
    [],
  );
  const removeTag = React.useCallback(
    (tagToRemove: Tags) => () => {
      setEvent((ce) => ({
        ...ce,
        tags: (ce.tags || []).filter((t) => t !== tagToRemove),
      }));
    },
    [],
  );
  const addTag = React.useCallback((tagToAdd: string) => {
    if (tagToAdd) {
      setEvent((ce) => ({
        ...ce,
        tags: uniq((ce.tags || []).concat([tagToAdd as Tags])),
      }));
    }
  }, []);
  const addComic = React.useCallback(
    (type: 'comicsFeatured' | 'comicsSupport' | 'comicsHeadline') =>
      (comicToAdd: string) => {
        if (comicToAdd) {
          setEvent((ce) => ({
            ...ce,
            [type]: uniq((ce[type] || []).concat([comicToAdd])),
          }));
        }
      },
    [],
  );
  const removeComic = React.useCallback(
    (type: 'comicsFeatured' | 'comicsSupport' | 'comicsHeadline') =>
      (comicToRemove: string) => {
        if (comicToRemove) {
          setEvent((ce) => ({
            ...ce,
            [type]: (ce[type] || []).filter((c) => c !== comicToRemove),
          }));
        }
      },
    [],
  );
  const onStatusChange = useEventTarget(setEventField(['approval']));

  return {
    event,
    saveThenExitEdit,
    cancelEdit,
    setEventField,
    sendEmptyIf,
    removeTag,
    newTagOptions,
    addTag: useEventTarget(addTag),
    approvalOptions,
    onStatusChange,
    addComic,
    removeComic,
  };
};

export default useEventCardLogic;
