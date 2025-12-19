export interface IChatConnectionWSParams {
  url: string;
  token: string;
  handleMessage: (message: unknown) => void;
}

export interface IChatWsService {
  connect: (params: IChatConnectionWSParams) => void;
  sendMessage: (text: string, chatId: number) => void;
  disconnect: () => void;
}
