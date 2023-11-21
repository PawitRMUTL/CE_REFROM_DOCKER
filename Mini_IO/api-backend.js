/** @format */

const hapi = require('@hapi/hapi');
const Minio = require('minio');

const init = async () => {
  const server = hapi.server({
    // port: 9000,
    // host: '127.0.0.1'
    port: 3002,
    host: 'localhost'
  });

  let minioClient; // Declare minioClient variable

  try {
    // Initialize MinIO client
    minioClient = new Minio.Client({
      endPoint: 'localhost',
      port: 9000,
      useSSL: false,
      accessKey: 'EhR6MbVgoSkvLDLVWQUH',
      secretKey: 'yrLcqAkjtf1L4FnmsynWIUaFJpIlds3SLbiGIhlT'
    });

    await server.start();
    console.log('Service running on %s', server.info.uri);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  // API TEST CONFIG
  server.route({
    method: 'GET',
    path: '/',
    handler: () => {
      return '<h3> Host Object Server </h3>';
    },
  });
  // API OBJECT 
  server.route({
    method: 'GET',
    path: '/object',
    handler: () => {
      var data = []
      var stream = minioClient.listObjects('test', '', true)
      stream.on('data', function (obj) {
        data.push(obj)
      })
      stream.on('end', function (obj) {
        console.log(data)
      })
      stream.on('error', function (err) {
        console.log(err)
      })
      // return '<h3> Host Object Server </h3>';
    },
  });
  // Read_report
  server.route({
    method: 'GET',
    path: '/image',
    handler: async (request, h) => {
      var size = 0
      minioClient.getObject('test/image/ImageNew', 'รูปข่าว 10.jpg', { versionId: 'my-versionId' }, function (err, dataStream) {
        if (err) {
          return console.log(err)
        }
        dataStream.on('data', function (chunk) {
          size += chunk.length
        })
        dataStream.on('end', function () {
          console.log('End. Total size = ' + size)
        })
        dataStream.on('error', function (err) {
          console.log(err)
        })
      })
    }
  });

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();

//--- Schedule setAvgWaitingTime API Call every 15 minutes -----

// var schedule = require('node-schedule');
// var request = require('request');

// var serverUrl = 'http://localhost:3200/api';

// schedule.scheduleJob('*/15 * * * *', function () {
//     var options = {
//         url: serverUrl + '/setavgwaitingtime',
//         /*
//         headers: {
//             'X-Parse-Application-Id': appID,
//             'X-Parse-Master-Key': masterKey,
//             'Content-Type': 'application/json'
//         }
//         */
//     };
//     request.post(options, function (error, response, body) {
//         if (!error && response.statusCode == 200) {
//             //console.log(body);
//             console.log("Call setAvgWaitingTime API OK!!");
//         } else
//             console.log("Call setAvgWaitingTime API ERROR!!");
//     });

// });

//-----------------------
