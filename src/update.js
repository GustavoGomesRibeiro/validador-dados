const fs = require("fs");
const csv = require("fast-csv");
function sslcheck() {
  const read = fs.createReadStream("filename.txt");

  const invalidUrls = [
    "www.unimab.com.br",
    "www.spectrum.eti.br",
    "www.institutocode.com",
    "www.h2ainformatica.com.br",
    "www.spksistemas.com.br",
  ];

  const readedCsv = csv
    .parse({
      headers: true,
    })
    .on("data", (data) => {
      const regex =
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/;

      const hasUrls = invalidUrls.map((url) => {
        const [foundUrl] = data.Url.match(regex);

        console.log(url);
        return foundUrl.includes(url);
      });

      if (hasUrls.some((hu) => hu === true)) {
        return null;
      }

      fs.writeFile(
        "filename.txt",
        JSON.stringify(data) + "\n",
        { enconding: "utf-8", flag: "a" },
        function (err) {
          if (err) return console.error(err);
        }
      );
    })
    .on("end", (replaced) => {});
  read.pipe(readedCsv);
}
sslcheck();
