const PubNub = require('pubnub')

const pubnub = new PubNub({
  publishKey: 'pub-c-934f960b-4384-4573-b5b7-fd5f629c51fe',
  subscribeKey: 'sub-c-b84eda9b-df05-4c21-8a10-4e51fdaccc39',
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
