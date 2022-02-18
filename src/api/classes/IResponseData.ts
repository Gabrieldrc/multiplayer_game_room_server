import ResponseData from '../interfaces/ResponseData';

export default class IResponseData implements ResponseData {
  entry = {};
  status = 200;
  response = {};

  setEntry(query: any) {
    this.entry = query;
    return this;
  }
  setStatus(statusCode: number) {
    this.status = statusCode;
    return this;
  }
  setData(data: any) {
    this.response = data;
    return this;
  }
  getStatus() {
    return this.status;
  }
  getData() {
    return this.response;
  }
}
