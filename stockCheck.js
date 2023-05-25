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

module.exports = function solution(product) {
  return new Promise(async (resolve, reject) => {
    // make sure product array isn't empty
    if (product.length === 0) { reject(['internal_system_error']); }
    //  remove duplicates with Set
    const arr = [... new Set(product)];
    // declare array to hold any invalid ids
    const invalid = ['invalid-format'];
    // iterate over product id array to check for invalid ids
    for (let i = 0; i < arr.length; i++) {
      if (!arr[i].match(/^\d{4}-\d{4}-\d{4}-\d{4}$/)) {
        invalid.push(arr[i]);
      }
    }
    // reject promise if any invalid ids are found
    if (invalid.length >= 2) {
      reject(invalid);
    } else {
      // run stockCheck on product ids and reject if stockCheck rejects
      const outOfStock = await Promise.all(
        arr.map(async (id) => {
          try {
            const resolved = await stockCheck(id);
            return resolved.id;
          } catch (rejected) {
            reject([rejected.id, rejected.code]);
          }
        })
      ).catch(() => {
        // reject if any unexpected errors are caught
        reject(['internal_system_error']);
      });
      // resolve with array of valid product ids
      resolve(outOfStock);
    }
  });
}