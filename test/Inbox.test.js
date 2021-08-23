const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());
const { interface, bytecode } = require('../compile');

// Rinkeby API https://rinkeby.infura.io/v3/d2f3f4b8e13e47709acd01912332789a
let accounts;
let inbox;
const INITIAL_STRING = "Hello, Solidity!";

beforeEach(async () => {
  // Get a list of all accounts
  accounts = await web3.eth.getAccounts();

  // Use one of those accounts to deploy the contract
  inbox = await new web3.eth.Contract(JSON.parse(interface))
    .deploy({ data: bytecode, arguments: [INITIAL_STRING] })
    .send({ from: accounts[0], gas: '1000000' });
});

describe('Inbox', () => {
  it('deploys a contract', () => {
    assert.ok(inbox.options.address);
  });

  it('has a default message', async () => {
    const message = await inbox.methods.message().call();
    assert.equal(message, INITIAL_STRING)
  });

  it('can change the message', async () => {
    await inbox.methods.setMessage('Hello, Hieu!').send({ from: accounts[0] });
    const message = await inbox.methods.message().call();
    assert.equal(message, 'Hello, Hieu!');
  });
});