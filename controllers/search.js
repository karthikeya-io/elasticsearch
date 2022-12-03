const elastic = require("@elastic/elasticsearch")
const Client = elastic.Client

const client = new Client({
    node: "http://localhost:9200"
})

async function read(query) {
    const result = await client.search({
      index: 'disease-symptoms',
      query: {
        match: {
          symptoms: query
        }
      }
    })
    console.log(result.hits.hits)
    return result.hits.hits
  }

exports.search = (req, res) => {
    const query = req.body.search
    read(query).catch(console.log)
}