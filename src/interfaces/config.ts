export interface Config {
  server: {
    host: string;
    port: number;
  };
  redis: {
    host: string;
    port: number;
  };
}
