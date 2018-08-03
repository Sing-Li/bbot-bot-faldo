const bBot = require('bbot')
// const tp = require('turbproxy')

// Place holder for mocking async callbacks
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

/** Setup accounts for user and bot, first creating room for joining them in. */
async function createAccounts (credentials) {
  const { user, bot, room } = credentials
  if (!!user && !!bot && !!room) {
    bBot.logger.info(`[admin] calling createAccounts...`)
    try {
      // pretend to do stuff...
      const result = await delay(2500).then(() => { return { success: true } })
      if (user.username.match(/fail/)) throw new Error('forced fail for demo')
      // actually do stuff...
      // const result = await tp.createaccounts({
      //   e: user.email,
      //   g: room.name,
      //   u: user.username,
      //   p: user.password
      // })
      bBot.logger.info(`[admin] createAccounts returned ${JSON.stringify(result)}`)
    } catch (err) {
      bBot.logger.error(`[admin] createAccounts failed: ${err.message}`)
      throw new Error('could not create accounts due to a playground server error.')
    }
  } else {
    bBot.logger.error('[admin] createAccounts called without all attributes.')
    if (!user) throw new Error('could not create accounts, missing user attributes.')
    if (!bot) throw new Error('could not create accounts, missing bot attributes.')
    if (!room) throw new Error('could not create accounts, missing room attributes.')
  }
}

module.exports = {
  createAccounts
}
