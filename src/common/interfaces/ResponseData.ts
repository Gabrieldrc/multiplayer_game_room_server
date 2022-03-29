export default interface ResponseData {
  entry: any;
  response: {
    statusCode: number;
    data?: any;
    error?: any;
  };
}
