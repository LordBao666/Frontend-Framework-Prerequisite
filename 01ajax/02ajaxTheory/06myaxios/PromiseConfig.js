import { METHOD_TYPE } from "./MethodType.js";

export class PromiseConfig {
  
  url;
  method;
  params; // a object
  data; // a object


  constructor(url, method = METHOD_TYPE.GET, params=undefined,data=undefined) {
    this.url =url;
    this.method=method;
    this.params = params;
    this.data=data;
  }
}