const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const CoffeeContractFactory = await hre.ethers.getContractFactory("CoffeePortal");

  const coffeeContract = await CoffeeContractFactory.deploy({
    value: hre.ethers.utils.parseEther("0.1"),
  })

  await coffeeContract.deployed();
  console.log("Coffee Contract deployed to:", coffeeContract.address);

  await showBalance();

  const coffeeTxn = await coffeeContract.buyCoffee(
    "This is coffee #1",
    "idris",
    ethers.utils.parseEther("0.01")
  );

  await showBalance();

  const totalCoffee = await coffeeContract.getTotalCoffee();
  console.log('Total coffee:', totalCoffee.toString());

  async function showBalance() {
    const contractBalance = await hre.ethers.provider.getBalance(
      coffeeContract.address
    );
    console.log("Contract balance:", hre.ethers.utils.formatEther(contractBalance));
  }
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
