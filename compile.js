const path = require('path');
const fs = require('fs');
const solc = require('solc')

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8')

module.exports = solc.compile(source, 1).contracts[':Inbox']; 
/**
 * 1 is the number of contracts we are compiling
 * :Inbox - We need the colon ":" before Inbox because we can pass in "source"
 *   as a directory of multiple contract sources. So we need to specify
 *   the contract source name before the colon. However, we passed the contract
 *   source directly in this scenario, so we don't need anything before the colon
 */ 

