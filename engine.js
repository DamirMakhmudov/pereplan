/** REQUSITES */
// getRequsitesByINN("1655321455");

exampleINN();
function exampleINN() {
  getRequsitesByINN("1655321455").then(response => {
    if (response.ok) {
      console.log(response.data);
    } else {
      console.log(response.data);
    }
  });
}

async function getRequsitesByINN(inn) {
  const token = '7fb984c31036a445d6f7c9e4324ff0160bfb1142s';
  var url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party";
  var options = {
    'method': 'POST',
    'mode': "cors",
    'body': JSON.stringify({ query: inn, branch_type: "MAIN" }), //type:"LEGAL" - чтоб только юрлица
    'headers': {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "Authorization": "Token " + token
    }
  };
  var result = {};
  let response = await fetch(url, options)
  if (response.ok) {
    result.data = await response.json()
  } else {
    result.data = await response.json()
  };
  result.ok = response.ok;
  return result
}

function getInfo_by_dadata(INN) {
  const token = '7fb984c31036a445d6f7c9e4324ff0160bfb1142';
  var url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party";
  var options = {
    'method': 'post',
    'contentType': 'application/json',
    'payload': JSON.stringify({ query: INN, branch_type: "MAIN" }), //type:"LEGAL" - чтоб только юрлица
    'headers': {
      "Accept": "application/json",
      "Authorization": "Token " + token
    }
  };
  var res = UrlFetchApp.fetch(url, options);
  if (res.getResponseCode() != 200) throw new Error('Не получен ответ от базы');
  var data = JSON.parse(res.getContentText());
  if (!data.suggestions || data.suggestions.length < 1) throw new Error('В запросе нет данных'); //return {error: "no suggestions in response!"};

  var data_main = data.suggestions[0];
  if (!data_main.data) return { error: "no 'data' part in response" };

  var out = {};
  if (data_main.data.type == "INDIVIDUAL") {
    // у ИП нужны : фио, огрнип, адрес регистрации
    out = {
      type: "INDIVIDUAL",
      condensed: {
        name: data_main.data.name ? data_main.data.name.full : "n/a",
        ogrn: data_main.data.ogrn,
        address: data_main.data.address ? data_main.data.address.unrestricted_value : "n/a",
      },
      value: data_main.unrestricted_value,
      inn: data_main.data.inn,//for self check
      ogrn: data_main.data.ogrn,
      address: data_main.data.address,
      name: data_main.data.name
    }
  } else {
    // Юрлицо
    out = {
      type: "LEGAL",
      condensed: {
        name: data_main.data.name ? data_main.data.name.full : "n/a",
        kpp: data_main.data.kpp,
        ogrn: data_main.data.ogrn,
        management: data_main.data.management ? (data_main.data.management.post + ' ' + data_main.data.management.name) : "n/a",
        address: data_main.data.address ? data_main.data.address.unrestricted_value : "n/a",
        opf: data_main.data.opf ? data_main.data.opf.short : "n/a",
      },
      value: data_main.unrestricted_value,
      inn: data_main.data.inn,//for self check
      kpp: data_main.data.kpp,
      ogrn: data_main.data.ogrn,
      management: data_main.data.management,
      address: data_main.data.address,
      opf: data_main.data.opf,
      name: data_main.data.name
    }
  }
  return out;
}


/** DECLENSION*/

/**
 * Example functon illustrating how to use 'getDeslension' function
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