export enum EventEnum {
  EXISTS = 'EXISTS',
}

interface BaseEvent {
  type: EventEnum;
  accountId: string;
  path: string;
}

export interface ExistsEvent extends BaseEvent {
  type: EventEnum.EXISTS;
  count: number;
  prevCount: number;
}

export type ImapEvent = ExistsEvent;

export type ImapDispatch = (imapEvent: ImapEvent) => Promise<void>;
