// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract BSCBridge {
    address public owner;
    IERC20 public bep20Token;
    address public ethereumBridge;

    event TokensLocked(address indexed from, uint256 amount);
    event TokensUnlocked(address indexed to, uint256 amount);

    constructor(address _tokenAddress) {
        owner = msg.sender;
        bep20Token = IERC20(_tokenAddress);
        ethereumBridge = address(0);
    }

    function setBSCBridgeAddress(address _ethBridge) public {
    // Ensure that only the owner or a trusted entity can set the BSC bridge address
    require(msg.sender == owner, "Unauthorized");

    // Set the BSC bridge contract's address
    ethereumBridge = _ethBridge;
    }

    function lockTokens(uint256 amount) external {
        require(msg.sender == owner, "Only owner can lock tokens");
        require(amount > 0, "Amount must be greater than zero");

        bep20Token.transferFrom(msg.sender, address(this), amount);
        emit TokensLocked(msg.sender, amount);
    }

    function unlockTokens(uint256 amount) external {
        require(msg.sender == ethereumBridge, "Only the Ethereum bridge can unlock tokens");
        require(amount > 0, "Amount must be greater than zero");

        bep20Token.transfer(msg.sender, amount);
        emit TokensUnlocked(msg.sender, amount);
    }
}
