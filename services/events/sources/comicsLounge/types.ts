import { EvtRaw } from '../types';

export interface ComLngEvtRaw extends EvtRaw {
  imgSrc: string;
  title: string;
  subTitle: string;
  dateRawStart: string;
  dateRawFinish: string;
  timeRaw: string;
  bookingLink: string;
}
