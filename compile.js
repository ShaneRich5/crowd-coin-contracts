const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, 'contracts', 'campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');


var input = {
    language: 'Solidity',
    sources: {
        'campaign.sol': {
            content: source
        }
    },
    settings: {
        outputSelection: {
            '*': {
                '*': ['*']
            }
        }
    }
};

const output = JSON.parse(solc.compile(JSON.stringify(input)));
const contractMap = output.contracts['campaign.sol'];

fs.ensureDirSync(buildPath);

for (let contractName in contractMap) {
    console.log(`Building contract ${contractName}...`);
    const contract = contractMap[contractName];
    const abi = contract.abi;
    const bytecode = contract.evm.bytecode.object;

    fs.outputJSONSync(
        path.resolve(buildPath, `${contractName}.json`),
        {
            abi,
            bytecode,
        }
    );
    console.log(`Built contract ${contractName}!`);
}