/**
* DO NOT MODIFY, I REPEAT, DO NOT MODIFY
**/

/**
* Determines whether a single product is in stock
* @param {string} product id 
* @returns {Promise} promise that resolves or rejects depending on whether request succeeds
*
*/
function stockCheck(id) {
  const firstCharacter = id.charAt(0)
  return new Promise((resolve, reject) => {
      if (firstCharacter === '9') {
        reject({ id, code: 'internal-server-error' })
      } else {
        resolve({ id, outOfStock: firstCharacter === '8' })
      }
  })
}
/** 
 * END DO NOT MODIFY 
 **/

/**
* Identifies out of stock items
* @param {String|String<>} product ids - a list of product Ids to verify whether they are in stock
* @returns {Promise} resolve/reject to out of stock products or error code
**/

module.exports = async function solution(product) {
    return new Promise((resolve, reject) => {
     //  remove duplicates with Set
     const set = [... new Set(product)];
     // convert set to array - think this may have been my problem
     const arr = Array.from(set);
     // declare invalid id 
     const invalid = ['invalid-format'];
     // iterate over array to check for invalid ids
     for (let i = 0; i < arr.length; i++) {
       if (!arr[i].match(/^\d{4}-\d{4}-\d{4}-\d{4}$/)) {
         invalid.push(arr[i]);
       }
     }
     // return invalid ids if there is 1 or more
     if (invalid.length >= 2) { reject(invalid); }
     try {
       // iterate over array and return ids in array - This isn't working and I ran out of time trying to fix it
       resolve(arr.map(stockCheck()));
     } catch (err) {
        console.log(err);
       // return valid error format
       reject([err.code, err.id])
     }
     // in case of any unexpected errors
     reject(['internal_system_error']);
   })
 }