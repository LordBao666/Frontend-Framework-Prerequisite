import * as Method from "./MethodType.js";
import { PromiseConfig } from "./PromiseConfig.js";


/**
 * 
 * @param {PromiseConfig} config 
 * @returns {Promise} 
 * 
 * This function is to simulate axios.
 */
export function myAxios(config) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    let url = config.url;
    let method = config.method;
    if (Method.methodEquals(method, Method.METHOD_TYPE.GET) && config.params!==undefined) {
      let searchParam = new URLSearchParams(config.params);
      url=`${url}?${searchParam.toString()}`;
    }

    request.open(method, url);
    request.addEventListener("loadend", () => {
      //success
      if(200<=request.status && request.status <300){
        // If it works well,request.response is a json string
        resolve(JSON.parse(request.response));
      }else{//failure
        reject(new Error(request.response));
      }
    });

    if (Method.methodEquals(method, Method.METHOD_TYPE.GET)) {
      request.send();
    } else if (Method.methodEquals(method, Method.METHOD_TYPE.POST)) {
      request.setRequestHeader("Content-Type", "application/json");
      request.send(JSON.stringify(config.data));
    }
  });
}
