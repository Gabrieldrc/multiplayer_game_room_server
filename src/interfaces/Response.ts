export default interface Response {
  getData();
  setData(data: object);
  setOk(status: boolean);
  getOk();
  toJson();
}
