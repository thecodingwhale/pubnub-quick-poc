require('dotenv').config()

const PubNub = require('pubnub')

const pubnub = new PubNub({
  publishKey: process.env.PUBNUB_PUBLISH_KEY,
  subscribeKey: process.env.PUBNUB_SUBSCRIBE_KEY,
  userId: 'myUniqueUserId',
})

// add listener
const listener = {
  status: (statusEvent) => {
    if (statusEvent.category === 'PNConnectedCategory') {
      console.log('Connected')
    }
  },
  message: (messageEvent) => {
    showMessage(messageEvent.message.description)
  },
  presence: (presenceEvent) => {
    // handle presence
  },
}
pubnub.addListener(listener)

// publish message
const publishMessage = async (message) => {
  await pubnub.publish({
    channel: 'hello_world',
    message: {
      title: 'greeting',
      description: message,
    },
  })
}

// subscribe to a channel
pubnub.subscribe({
  channels: ['hello_world'],
})

// built-in package for reading from stdin
const readline = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
})

readline.setPrompt('')
readline.prompt()
// publish after hitting return
readline.on('line', (message) => {
  publishMessage(message).then(() => {
    readline.prompt()
  })
})

const showMessage = (msg) => {
  console.log('message: ' + msg)
}
