var GovernorAlpha = artifacts.require("GovernorAlpha");
var MasterChef = artifacts.require("MasterChef");
var Migrator = artifacts.require("Migrator");
var MockERC20 = artifacts.require("MockERC20");
var SushiBar = artifacts.require("SushiBar");
var SushiMaker = artifacts.require("SushiMaker");
var SushiToken = artifacts.require("SushiToken");
var Timelock = artifacts.require("Timelock");

module.exports = function(deployer) {
  deployer.deploy(GovernorAlpha);
  deployer.deploy(MasterChef);
  deployer.deploy(Migrator);
  deployer.deploy(MockERC20);
  deployer.deploy(SushiBar);
  deployer.deploy(SushiMaker);
  deployer.deploy(SushiToken);
  deployer.deploy(Timelock);
};
