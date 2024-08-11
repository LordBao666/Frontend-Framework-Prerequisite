export const METHOD_TYPE = {
  GET: "get",
  POST: "post",
};


/**
 * 
 * This function is to test if two methods equal to each other.
 * Here method refers to the get/post/... method of a request.
 * 
 * @param {string} methodOne and @param {string} methodTwo are both strings, and they
 * are case insensitive. 
 * For example, methodOne = 'get', and methodTwo = 'Get',we will 
 * return true.
 */
export function methodEquals(methodOne,methodTwo){
  return methodOne.toLowerCase() === methodTwo.toLowerCase();
}