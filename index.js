const fs = require("fs");
const csv = require("fast-csv");

// funcao substitui urls http por https e gera querys UPDATES
function verifyCsv() {
  const read = fs.createReadStream("updateFiltrado.csv");

  const readedCsv = csv
    .parse({
      headers: true,
    })
    .on("data", (data) => {
      const trimHttps = data.Url.replace(data.Url, "");
      const replaced = data.Url.replace("http", "https");

      if (data.Url.includes("https")) {
        console.log(
          trimHttps,
          "As linhas que possuem url https, foram removidas!"
        );
        return trimHttps;
      }

      if (data.Url.includes("http")) {
        console.log(replaced, "Adicionando as urls https");
        fs.writeFile(
          "updateUrls_status_c.txt",
          "UPDATE Baixaki.dbo.Programas_Urls" +
            " " +
            "SET" +
            " " +
            "Url" +
            "=" +
            " " +
            JSON.stringify(replaced) +
            " " +
            "WHERE" +
            " " +
            "CodUrl" +
            " " +
            "=" +
            " " +
            data.CodUrl +
            "\n",
          { enconding: "utf-8", flag: "a" },
          function (err) {
            console.log(replaced);
            if (err) return console.error(err);
          }
        );
        // return fs.writeFile(
        //   "Programas_urls_dominio_combr.csv",
        //   replaced + "\n",
        //   { enconding: "utf-8", flag: "a" },
        //   function (err) {
        //     console.log(replaced);
        //     if (err) return console.error(err);
        //   }
        // );
      }
    })
    .on("end", (replaced) => {
      console.log(replaced, ">>>> A operação de replace terminou <<<<");
    });

  read.pipe(readedCsv);
}
verifyCsv();
