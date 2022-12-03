
// function readFiles(dirname, onFileContent, onError) {
//   fs.readdir(dirname, function(err, filenames) {
//     if (err) {
//       onError(err);
//       return;
//     }
//     filenames.forEach(function(filename) {
//       fs.readFile(dirname + filename, 'utf-8', function(err, content) {
//         if (err) {
//           onError(err);
//           return;
//         }
//         onFileContent(filename, content);
        
//       });
//     });
//   });
// }

// var data = {};
// readFiles('./drugs-data-master/disease-symptoms/imp-symptoms/', (filename, content) => {
//   console.log(filename);
//   data[filename] = content;
//   console.log(content);
// }, (err) => {
//   throw err;
// });



// async function indexing() {
//   await client.index({
//     index: 'symptoms',
//     body: {
//       disease: 'disease',
//       data: 'data'
//     }
//   })
// }


// async function run() {
//     await client.index({
//         index: 'game-of-thrones',
//         body: {
//         character: 'Ned Stark',
//         quote: 'Winter is coming.'
//         }
//     })

//     await client.index({
//         index: 'game-of-thrones',
//         body: {
//         character: 'Daenerys Targaryen',
//         quote: 'I am the blood of the dragon.'
//         }
//     })

//     await client.index({
//         index: 'game-of-thrones',
//         body: {
//         character: 'Tyrion Lannister',
//         quote: 'A mind needs books like a sword needs whetstone.'
//         }
//     })

//     await client.indices.refresh({index: 'game-of-thrones'})
// }

// run().catch(console.log)





// const getData = async () => {
//     const response = await client.get({
        
//     })
//     console.log(response);
// }

// getData().catch(err => {
//     console.log(err)
// })

// const indices = await client.cat.indices({format: 'json'})

// console.log(indices);

// async function run () {
  
//     const document = await client.get({
//       index: 'game-of-thrones',
//       id: 'ec89U4QBg7y8U_Hdv4Xl'
//     })
  
//     console.log(document)
// }

//   run().catch(console.log)