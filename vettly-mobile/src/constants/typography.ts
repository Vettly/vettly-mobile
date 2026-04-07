import { scale } from './scale';

export type TextVariant =
  | 'Display'
  | 'Heading'
  | 'Subheading'
  | 'Title'
  | 'BodyLarge'
  | 'Body'
  | 'BodyBold'
  | 'BodySmall'
  | 'Caption'
  | 'CaptionBold'
  | 'Label'
  | 'Link';

const INTER = 'Inter-Font';

export const typography: Record<
  TextVariant,
  { fontSize: number; fontWeight: '300' | '400' | '500'; fontFamily: string }
> = {
  Display:     { fontFamily: INTER, fontSize: scale.sc48, fontWeight: '500' },
  Heading:     { fontFamily: INTER, fontSize: scale.sc32, fontWeight: '500' },
  Subheading:  { fontFamily: INTER, fontSize: scale.sc24, fontWeight: '500' },
  Title:       { fontFamily: INTER, fontSize: scale.sc20, fontWeight: '500' },
  BodyLarge:   { fontFamily: INTER, fontSize: scale.sc18, fontWeight: '400' },
  Body:        { fontFamily: INTER, fontSize: scale.sc16, fontWeight: '400' },
  BodyBold:    { fontFamily: INTER, fontSize: scale.sc16, fontWeight: '500' },
  BodySmall:   { fontFamily: INTER, fontSize: scale.sc14, fontWeight: '400' },
  Caption:     { fontFamily: INTER, fontSize: scale.sc12, fontWeight: '300' },
  CaptionBold: { fontFamily: INTER, fontSize: scale.sc12, fontWeight: '400' },
  Label:       { fontFamily: INTER, fontSize: scale.sc13, fontWeight: '400' },
  Link:        { fontFamily: INTER, fontSize: scale.sc16, fontWeight: '500' },
};
