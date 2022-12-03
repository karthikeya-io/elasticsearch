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