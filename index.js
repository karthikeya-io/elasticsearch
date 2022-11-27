import {Client} from "@elastic/elasticsearch"
import fs from 'fs'

const client = new Client({
    node: "http://localhost:9200"
})

client.info()
  .then(response => console.log(response))
  .catch(error => console.error(error))


const readFiles1 = (dirname) => {
  return new Promise((resolve, reject) => {
    let dataset = []
    fs.readdir(dirname, function(err, filenames) {
        if (err) {
          reject(err)
          return;
        }
        filenames.forEach(function(filename) {
          let data = {};
          data['disease'] = filename.substring(0, filename.lastIndexOf('.')) || filename
          data['symptoms'] = fs.readFileSync(dirname + filename, 'utf-8')
          dataset.push(data);
        })
        resolve(dataset)

      })
  })

}


const getData = async() => {
  const dataset = await readFiles1('./drugs-data-master/disease-symptoms/imp-symptoms/')
  console.log(dataset);
  run(dataset).catch(console.log)
}

async function run (dataset) {
  await client.indices.create({
    index: 'disease-symptoms',
    operations: {
      mappings: {
        properties: {
          disease: { type: 'keyword' },
          symptoms: { type: 'text' },
        }
      }
    }
  }, { ignore: [400] })


  const operations = dataset.flatMap(doc => [{ index: { _index: 'disease-symptoms' } }, doc])

  const bulkResponse = await client.bulk({ refresh: true, operations })

  if (bulkResponse.errors) {
    const erroredDocuments = []
    // The items array has the same order of the dataset we just indexed.
    // The presence of the `error` key indicates that the operation
    // that we did for the document has failed.
    bulkResponse.items.forEach((action, i) => {
      const operation = Object.keys(action)[0]
      if (action[operation].error) {
        erroredDocuments.push({
          // If the status is 429 it means that you can retry the document,
          // otherwise it's very likely a mapping error, and you should
          // fix the document before to try it again.
          status: action[operation].status,
          error: action[operation].error,
          operation: body[i * 2],
          document: body[i * 2 + 1]
        })
      }
    })
    console.log(erroredDocuments)
  }

  const count = await client.count({ index: 'disease-symptoms' })
  console.log(count)
}

// getData()

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

  async function read() {
    const result = await client.search({
      index: 'disease-symptoms',
      query: {
        match: {
          symptoms: 'fever cold'
        }
      }
    })
    console.log(result.hits.hits)
  }
  
  read().catch(console.log)