const sslChecker = require("ssl-checker");

const getSslDetails = async () => {
  //   await sslChecker(hostname`ex. www.maxsistem.com.br`);

  const teste = ["www.google.com.br", "www.maxsistem.com", "www.hotmail.com"];
  try {
    await sslChecker(JSON.stringify(teste), {
      method: "GET",
      port: 443,
    }).then(console.info);
  } catch (error) {
    console.log(error);
  }
};
getSslDetails();

// lineReader.eachLine("sslcheck78.txt", function (line) {
//     sslChecker(replaced, {
//       method: "GET",
//       port: 443,
//     }).then(console.info);

//     console.log(line);
//   });
