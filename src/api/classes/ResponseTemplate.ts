import ResponseData from '@api/interfaces/ResponseData';
import { HttpStatus } from '@nestjs/common';

export default class ResponseTemplate {
  private entry = {};
  private statusCode = HttpStatus.OK;
  private data: any;
  private error: any;

  setEntry(query: any) {
    this.entry = query;
    return this;
  }
  setStatus(statusCode: number) {
    this.statusCode = statusCode;
    return this;
  }
  setData(data: any) {
    this.data = data;
    return this;
  }
  setError(error: any) {
    this.setStatus(error.status);
    this.error = {
      name: error.name,
      message: error.message,
    };
    return this;
  }
  getStatus() {
    return this.statusCode;
  }
  getData() {
    return this.data;
  }
  getResponseObj(): ResponseData {
    const content = {};
    if (this.data) content['data'] = this.data;
    if (this.error) content['error'] = this.error;

    return {
      entry: this.entry,
      response: {
        statusCode: this.statusCode,
        ...content,
      },
    };
  }
}
