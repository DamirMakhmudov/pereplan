

/**
 *  Example functon illustrating how to use 'getDeslension' function
 */
function exampleDeclension() {
  /*
  5ecd5111-ffbf-4f9a-80e1-92f609c95aad damir
  f8610d17-6d77-4756-83c8-ab21d0b7a6b0 pereplan
  287c2716-c7f5-4f2f-90cf-252881164284 csoft
  https://ws3.morpher.ru/russian/spell?n=235&unit=рубль (ukrainian/spell)
  */
  let token = '287c2716-c7f5-4f2f-90cf-252881164284'
  getDeclensionLimit(token).then(data => {
    if (data > 0) {
      console.log(data);
      getDeclension(token, 'Петр', 'Р').then(data => {
        if (data.status == 200) {
          console.log('dat', data)
        } else {
          console.log('err', data)
        }
      });
    }
  });
}

/**
 * Return declension form of input
 * @param {string} token credential token to access
 * @param {string} value input text to declen
 * @param {string} format case for transform input value
 * @return {object} object contains status and output value
*/
async function getDeclension(token = '287c2716-c7f5-4f2f-90cf-252881164284', value = 'Иван', format = 'Р') {
  let result = { status: 200, value: "" };
  let url = `https://ws3.morpher.ru/russian/declension?format=json&s=${value}&token=${token}`;
  let response = await fetch(url, {
    method: 'GET',
  }).then(resp => {
    result.status = resp.status;
    return resp.json();
  });
  result.status == 200 ? result.value = response[format] : result.value = response;
  return result
}

/**
 * Return limit of declension service
 * @param {string} token credential token to access
 * @return {number} number of requests left per day
*/
async function getDeclensionLimit(token = '287c2716-c7f5-4f2f-90cf-252881164284') {
  let url = `https://ws3.morpher.ru/get-queries-left?format=json&token=${token}`;
  let response = await fetch(url, {
    method: "GET",
    headers: {
      'Accept': 'application/json',
    }
  }).then(data => data.json())
  return response;
}