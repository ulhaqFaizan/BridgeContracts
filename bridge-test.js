// SPDX-License-Identifier: MIT
const { assert } = require("chai");

const EthereumBridge = artifacts.require("EthereumBridge");
const TokenA = artifacts.require("TokenA");

contract("EthereumBridge", (accounts) => {
  const owner = accounts[0];
  const user = accounts[1];
  const bscBridgeAddress = accounts[2];

  let bridgeInstance;
  let tokenAInstance;

  beforeEach(async () => {
    tokenAInstance = await TokenA.new(1000, { from: owner });
    bridgeInstance = await EthereumBridge.new(tokenAInstance.address, bscBridgeAddress, { from: owner });
  });

  it("should lock tokens", async () => {
    const amountToLock = 100;
    await tokenAInstance.approve(bridgeInstance.address, amountToLock, { from: user });
    const tx = await bridgeInstance.lockTokens(amountToLock, { from: user });
    assert.equal(tx.logs[0].event, "TokensLocked");
  });

  it("should unlock tokens", async () => {
    const amountToLock = 100;
    await tokenAInstance.approve(bridgeInstance.address, amountToLock, { from: user });
    await bridgeInstance.lockTokens(amountToLock, { from: user });
    const tx = await bridgeInstance.unlockTokens(amountToLock, { from: bscBridgeAddress });
    assert.equal(tx.logs[0].event, "TokensLocked");
    assert.equal(tx.logs[1].event, "CrossChainCommunication");
  });
});
