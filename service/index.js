const { predict } = require('./sp')

const KafkaSu = require('kafkasu')

const instance = new KafkaSu()
const ioserver = instance.listen()




const pre = (input, callback) => {
    let list = []
    var i = predict(input, (data) => {
        console.log(data);
        list.push(data)
        if (i == 0) {
            callback(list)
        }
    })
}

const topic_card = 'topic-card-1'
const group_id = 'card-group-2'
const event_name = 'card-event-1'

// const topic_card2 = 'topic-card-2'
// const group_id2 = 'card-group-3'
// const event_name2 = 'card-event-2'

instance.fetch(topic_card, group_id, event_name, (err, res) => {
    if (err) {
        console.log(err);
    } else {
        // console.log(res);
        let parsed = JSON.parse(res.toString())
        // console.log(parsed);
        let skus = parsed.map(el => el.sku)
        console.log(skus);
        pre(skus, (data) => {
            console.log(data);
        })

    }
})


