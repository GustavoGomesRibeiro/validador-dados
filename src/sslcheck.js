const fs = require("fs");
const csv = require("fast-csv");
// funcao cria um arquivo pra checar os ssl
function sslcheck() {
  const read = fs.createReadStream("Programas_Urls_202101061453_null.csv");

  const readedCsv = csv
    .parse({
      headers: true,
    })
    .on("data", (data) => {
      const trimHttps = data.Url.replace(data.Url, "");
      const replaced = data.Url.replace(/(http[s]?:\/\/)/, "");

      if (data.Url.includes("https")) {
        console.log(
          trimHttps,
          "As linhas que possuem url https, foram removidas!"
        );
        return trimHttps;
      }

      if (data.Url.includes("http://")) {
        console.log(replaced, "Adicionando as urls https");
        const regex = /([^\/\s]+)/;
        let filter;
        if ((filter = regex.exec(replaced)) !== null) {
          // The result can be accessed through the `m`-variable.
          filter.forEach((match, groupIndex) => {
            console.log(`Found match, group ${groupIndex}: ${match}`);
          });
        }

        // Cria um novo arquivo para rodar o script sslCheck
        fs.writeFile(
          "filename.txt",
          "remover" + filter + "\n",
          { enconding: "utf-8", flag: "a" },
          function (err) {
            console.log(replaced);
            if (err) return console.error(err);
          }
        );
      }
    })
    .on("end", (replaced) => {
      console.log(replaced, ">>>> A operação de replace terminou <<<<");
    });

  read.pipe(readedCsv);
}
sslcheck();
