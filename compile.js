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

console.log(output.contracts);

fs.ensureDirSync(buildPath);

for (let contractName in contractMap) {
    console.log('contract:', contractName);
    const contract = contractMap[contractName];

    fs.outputJSONSync(
        path.resolve(buildPath, `${contractName}.json`),
        contractMap[contractName]
    );
}