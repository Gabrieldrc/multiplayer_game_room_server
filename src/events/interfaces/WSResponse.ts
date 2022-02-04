export default interface WSResponse {
  getData();
  setData(data: object);
  setOk(status: boolean);
  getOk();
  toJson();
}
