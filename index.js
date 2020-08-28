const fetch = require('node-fetch'),
  fileSys = require('fs');

const createFile = fileSys.stat("./dados", err => {
  if (err)
    fileSys.mkdir("./dados", err => {
      if (err)
        throw err;
    });

    fileSys.writeFile("./dados/usuarios.csv", "primeiro_nome,sobrenome,email,idade,genero,username,password\n", "utf8", err => {
      if (err)
        throw err;
    });
});

async function randomCsv() {

  createFile;

  const response = await fetch("https://randomuser.me/api/?results=1000");
  const respJson = await response.json();

  respJson.results.forEach( user => {
    const text = fileSys.createWriteStream("./dados/usuarios.csv", {flags: "a"})
    text.write(`${user.name.first}, ${user.name.last}, ${user.email}, ${user.dob.age}, ${user.gender}, ${user.login.username}, ${user.login.password}\n`)
  });
}

randomCsv();