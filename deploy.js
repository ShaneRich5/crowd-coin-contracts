const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');

const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(process.env.MNEMONIC, process.env.ENDPOINT);
const web3 = new Web3(provider);

const deploy = async () => {
    const [account, ...rest] = await web3.eth.getAccounts();

    console.log('Attempting to deploy from account', account);

    const result = await new web3.eth.Contract(compiledFactory.abi)
        .deploy({ data: `0x${compiledFactory.bytecode}` })
        .send({ from: account });

    console.log('Contract deployed to', result.options.address);

};

deploy();
