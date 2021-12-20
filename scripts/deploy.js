const hre = require("hardhat");

async function deploy() {
  const [deployer] = await hre.ethers.getSigners();
  const accountBalance = await deployer.getBalance();

  console.log("Deploying contracts with account: ", deployer.address)
  console.log(`Account balance: ${accountBalance.toString()}`);

  const Token = await hre.ethers.getContractFactory("CoffeePortal");
  const contract = await Token.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  });
  await contract.deployed();

  console.log("Contract address: ", contract.address);
}

deploy()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

