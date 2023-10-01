const Web3 = require('web3');
const EthereumBridgeABI = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_tokenAddress",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "_bscBridgeAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "TokensLocked",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "TokensUnlocked",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "bscBridge",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "erc20Token",
		"outputs": [
			{
				"internalType": "contract IERC20",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "lockTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "unlockTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];
const BSCBridgeABI = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "lockTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_ethBridge",
				"type": "address"
			}
		],
		"name": "setBSCBridgeAddress",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_tokenAddress",
				"type": "address"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "TokensLocked",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "TokensUnlocked",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "unlockTokens",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "bep20Token",
		"outputs": [
			{
				"internalType": "contract IERC20",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "ethereumBridge",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "owner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

// Ethereum (Goerli) and BSC (Sepolia) testnet node URLs
const ethereumNodeUrl = 'https://goerli.infura.io/v3/6f30411811cc42878ecfa56964f1df63';
const bscNodeUrl = 'https://sepolia.infura.io/v3/6f30411811cc42878ecfa56964f1df63';

// Ethereum and BSC bridge contract addresses
const ethereumBridgeAddress = '0xEB5e7E301807859b7141049e8fABcC8bD2a1433d';
const bscBridgeAddress = '0x09D7FE798c118B899F91f6cc0A3DF5cD19EaF9Aa';

// Replace with your Ethereum and BSC addresses
const ethereumSenderAddress = '0xD348A94a8d35A911534F4d4E2C49A0FaE94F15DA';
const bscRecipientAddress = '0x5932799cF223d53A6690A34d08947EdE91947835';

// Specify the amount of tokens to transfer
const amountToTransfer = 1;

// Initialize Web3 providers
const ethereumProvider = new Web3.providers.HttpProvider(ethereumNodeUrl);
const bscProvider = new Web3.providers.HttpProvider(bscNodeUrl);

const ethereumWeb3 = new Web3(ethereumProvider);
const bscWeb3 = new Web3(bscProvider);

// Create contract instances for Ethereum and BSC bridges
const ethereumBridgeContract = new ethereumWeb3.eth.Contract(EthereumBridgeABI, ethereumBridgeAddress);
const bscBridgeContract = new bscWeb3.eth.Contract(BSCBridgeABI, bscBridgeAddress);

async function lockTokensOnEthereum() {
    // Lock tokens on Ethereum bridge
    await ethereumBridgeContract.methods.lockTokens(amountToTransfer).send({ from: ethereumSenderAddress });
    console.log(`Locked ${amountToTransfer} tokens on Ethereum`);
}

async function unlockTokensOnBSC() {
    // Unlock tokens on BSC bridge
    await bscBridgeContract.methods.unlockTokens(amountToTransfer).send({ from: bscRecipientAddress });
    console.log(`Unlocked ${amountToTransfer} tokens on BSC`);
}

// Execute the token transfer
async function main() {
    try {
        await lockTokensOnEthereum();
        await unlockTokensOnBSC();
    } catch (error) {
        console.error('Error:', error);
    }
}

main();
