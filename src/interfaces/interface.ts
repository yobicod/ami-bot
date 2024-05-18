export interface ILineRequest {
  replyToken: string;
  messages: ILineMessageRequestMessage[];
}

export interface ILineMessageRequestMessage {
  type: string;
  text: string;
}
