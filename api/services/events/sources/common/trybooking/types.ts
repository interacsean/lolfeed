import { EvtRaw } from '../../types';

export interface TryBkgEvtRaw extends EvtRaw {
  eventName: string;
  imgSrc: string;
  date: string;
  desc: string;
  orderAid: string;
  orderEdid: string;
}
