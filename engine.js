/**
 * Return diffetent forms of input value: genitive, dative etc
*/
// 5ecd5111-ffbf-4f9a-80e1-92f609c95aad damir
// f8610d17-6d77-4756-83c8-ab21d0b7a6b0 pereplan
// 287c2716-c7f5-4f2f-90cf-252881164284 csoft
// https://ws3.morpher.ru/russian/spell?n=235&unit=рубль (ukrainian/spell)

/* Example to run */
function getM() {
  getDeclensionLimit().then(data => {
    if (data > 0) {
      console.log(data);
      getDeclension().then(data => {
        if (data.status == 200) {
          console.log('dat', data)
        } else {
          console.log('err', data)
        }
      });
    }
  });
}

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