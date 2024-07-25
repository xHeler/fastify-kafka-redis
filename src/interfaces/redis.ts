export interface SetMessageParams {
    key: string;
  }
  
  export interface SetMessageBody {
    message: string;
  }
  
  export interface RedisMessage {
    key: string;
    message: string;
  }
  