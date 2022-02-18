import WSResponse from '../interfaces/WSResponse';

export default class IWSResponse implements WSResponse {
  ok: boolean;
  data: object;

  getData(): object {
    return this.data;
  }

  setData(value: object) {
    this.data = value;
    return this;
  }

  getOk(): boolean {
    return this.ok;
  }

  setOk(value: boolean) {
    this.ok = value;
    return this;
  }
}
