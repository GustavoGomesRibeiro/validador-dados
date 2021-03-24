const fs = require("fs");
const csv = require("fast-csv");

// funcao cria um arquivo pra checar os ssl
function regex() {
  const regex = /([^\/\s]+)/;
  const str = "www.ctsinformatica.com.br/";
  let m;

  if ((m = regex.exec(str)) !== null) {
    // The result can be accessed through the `m`-variable.
    m.forEach((match, groupIndex) => {
      console.log(`Found match, group ${groupIndex}: ${match}`);
    });
  }
}
regex();
