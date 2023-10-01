// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract EthereumBridge {
    address public owner;
    IERC20 public erc20Token;
    address public bscBridge;

    event TokensLocked(address indexed from, uint256 amount);
    event TokensUnlocked(address indexed to, uint256 amount);

    constructor(address _tokenAddress, address _bscBridgeAddress) {
        owner = msg.sender;
        erc20Token = IERC20(_tokenAddress);
        bscBridge = _bscBridgeAddress;
    }

    function lockTokens(uint256 amount) external {
        require(msg.sender == owner, "Only owner can lock tokens");
        require(amount > 0, "Amount must be greater than zero");

        erc20Token.transferFrom(msg.sender, address(this), amount);
        emit TokensLocked(msg.sender, amount);
    }

    function unlockTokens(uint256 amount) external {
        require(msg.sender == bscBridge, "Only the BSC bridge can unlock tokens");
        require(amount > 0, "Amount must be greater than zero");

        erc20Token.transfer(msg.sender, amount);
        emit TokensUnlocked(msg.sender, amount);
    }
}
