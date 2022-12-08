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
        },
        // more_like_this: {
        //   fields: [ "symptoms" ],
        //   like: [
        //     {
        //       _id: "-QTLYYQB4PmHVk2lZZKT"
        //     }
        //   ]
        // }



      }
    })
    console.log(result.hits.hits)
    return result.hits.hits
  }

exports.search = async (req, res) => {
    const query = req.body.search
    const data = await read(query).catch(console.log)
    res.json({results: data})
}