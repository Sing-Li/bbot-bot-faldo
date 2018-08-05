const bBot = require('bbot')
const tp = require('turbproxy')
const gm = require('glitchmagic')


/** Setup accounts for user and bot, first creating room for joining them in. */
async function createAccounts (credentials) {
  const { user, bot, room } = credentials
  if (!!user && !!bot && !!room) {
    bBot.logger.info(`[admin] calling createAccounts...`)
    try {
      if (user.username.match(/fail/)) throw new Error('forced fail for demo')
            // turbproxy createaccounts method signature
            // {e: email, g: group, u: uname, p: passwords}
            // uname is basename for two users:  uname + 'bot'  and uname 
            // passwords is an array of 2 passwords, first one for bot
      const passwds: 
      const result = await tp.createaccounts({
         e: user.email,
         g: room.name,
         u: user.username,
         p: user.password
      })
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

function getRemix(proj, envvars) {
  return gm.getRemixURL(proj, envvars);
}
module.exports = {
  createAccounts,
  getRemix
}
