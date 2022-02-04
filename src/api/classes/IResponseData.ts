import ResponseData from '../interfaces/ResponseData';

export default class IResponseData implements ResponseData {
  entry: any;
  response: { status: number; data: any };

  setEntry(query: any) {
    this.entry = query;
    return this;
  }
  setStatus(status: number) {
    this.response.status = status;
    return this;
  }
  setData(data: any) {
    this.response.data = data;
    return this;
  }
}
