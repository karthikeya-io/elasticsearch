const elastic = require("@elastic/elasticsearch")
const Client = elastic.Client

const client = new Client({
    node: "http://localhost:9200"
})

// async function read(query) {
//     const result = await client.search({
//       index: 'disease-symptoms',
//       query: {
//         match: {
//           symptoms: query
//         }
//       }
//     })
//     console.log(result.hits.hits)
//     return result.hits.hits
//   }

function metrics(values) {
    // const labels = new Array()
    const array = new Array()
    const labels = [0,0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8,0.9]
    for(let i = 0;i<values.length;i++){
        if(values[i].value==="yes")
        array.push(1)
        else
            array.push(0);
        
    }
    let relaventRetrived = 0;
    const totalRelavent = 10;
    let precision = new Array();
    let recall = new Array();


    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        if(element === 1) {
            relaventRetrived = relaventRetrived+1;
        }
        precision.push( Number((relaventRetrived/(i+1)).toFixed(2)));
        recall.push( relaventRetrived /totalRelavent); 
    }
    console.log(precision)
    console.log(recall)
    var f1 = (recall[array.length-1]*precision[array.length-1])/(precision[array.length-1]+recall[array.length-1]);
    console.log(f1.toFixed(2))
    var f1 = f1.toFixed(2);
    return {precision,recall,f1}
}

exports.assesmentComponents = async (req, res) => {
    const feedback = req.body.arr
    console.log(feedback);
    const values = metrics(feedback)
    res.json(values)
    // res.json({results: 'data received'})
}