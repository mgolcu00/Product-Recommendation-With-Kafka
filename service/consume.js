
const KafkaSu = require('kafkasu')

const instance = new KafkaSu()
instance.listen()

const topic_card2 = 'topic-card-2'
const group_id2 = 'card-group-3'
const event_name2 = 'card-event-2'


instance.kafkaServer.createProducer(topic_card2)

instance.kafkaServer.createConsumer(group_id2)
instance.kafkaServer.socketConsume(group_id2, topic_card2, event_name2)

