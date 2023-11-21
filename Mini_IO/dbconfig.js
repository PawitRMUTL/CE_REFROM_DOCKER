/** @format */

var dbconfig = {
  development: {
    //connectionLimit : 10,
    // host: '172.17.0.1',
    host: '0.0.0.0',
    port: '3306',
    user: 'root',
    password: '',
    // password: 'keep1234',
    database: 'Portal',
  },
  production: {
    //connectionLimit : 10,
    host: '128.199.188.223',
    port: '4406',
    user: 'root',
    //// password: '1q2w3e4rP;;',
    password: '1q2w3e4rP@ssw0rd',
    database: '3cx-buzz',
  },
  docker:{
     host: '172.17.0.1',
     port: '9000',
     useSSL: false,
     asscessKey: 'EhR6MbVgoSkvLDLVWQUH',
     secretKey: 'yrLcqAkjtf1L4FnmsynWIUaFJpIlds3SLbiGIhlT',



     
  }
};
module.exports = dbconfig;
