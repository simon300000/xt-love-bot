const { CQWebSocket } = require('cq-websocket')

const TARGET_GROUP = 536587198
const TARGET_QQ = 3054389483
const EMOJI = '🥵'

const bot = new CQWebSocket({
  host: '127.0.0.1',
  port: 6701
})

bot.on('message.group', (_, { group_id: group, message_id: id, user_id: user }) => {
  if (group === TARGET_GROUP && user === TARGET_QQ) {
    // eslint-disable-next-line @typescript-eslint/camelcase
    bot('send_group_msg', { group_id: group, message: `[CQ:reply,id=${id}] ${EMOJI}` })
  }
})

bot.on('socket.connecting', (_, attempts) => {
  console.log('CONNECTING', attempts)
})

bot.on('socket.connect', (_, __, attempts) => {
  console.log('CONNECT', attempts)
})

bot.on('socket.failed', (_, attempts) => {
  console.error('FAILED', attempts)
})

bot.on('socket.error', e => {
  console.error('ERROR', e)
})

bot.connect()
