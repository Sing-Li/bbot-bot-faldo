const bot = require('bbot')

const conversation = {
  // sub-sets of listeners assigned to a user ID
  current: {},

  // add a "global" listener that routes message to conversation branches
  setup: () => {
    bot.hearMiddleware((b, next, done) => {
      const user = b.message.user
      if (conversation.engaged(user)) {
        new bot.Thoughts(b, conversation.current[user.id]``).start('receive').then(done)
      } else {
        next()
      }
    })
  },

  // check if a user ID has an open conversation branch
  engaged: (user) => Object.keys(conversation.current).indexOf(user.id) > -1,

  // add listeners to a conversation branch for a user
  branch: (user) => {
    if (conversation.engaged(user)) return conversation.current[user.id]
    conversation.current[user.id] = new bot.Listeners()
    return conversation.current[user.id]
  },

  // close a conversation branch with a user
  exit: (user) => delete conversation.current[user.id]
}

const bits = [{
  id: 'welcome',
  send: [
    'Hi I\'m Faldo, I manage the bot accounts for the Rocket.Chat bots playground.',
    'To start, I need your email so I can setup your user credentials'
  ],
  callback: (b) => {
    conversation.branch(b.message.user).text(/.*/, (b) => b.respond('you in a branch'))
  }
}]

async function start () {
  await bot.load()
  // conversation.setup()
  for (let bit of bits) bot.setupBit(bit)
  bot.listenEnter('welcome')
  bot.listenCustom(() => true, 'welcome')
  // bot.listenText(/^\b(hi|hello|hey)\b$/i, () => bot.logger.debug(JSON.stringify(bot.bits.welcome)))
  await bot.start()
}

start()
