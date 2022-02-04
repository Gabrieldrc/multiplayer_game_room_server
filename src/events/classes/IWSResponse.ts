import WSResponse from '../interfaces/WSResponse';

export default class IWSResponse implements WSResponse {
  private data: object;
  private ok: boolean;

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

  toJson() {
    return {
      ok: this.getOk(),
      data: this.getData(),
    };
  }
}