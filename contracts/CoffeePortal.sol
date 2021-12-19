//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;

import "hardhat/console.sol";

contract CoffeePortal {
  uint256 totalCoffee;

  address payable public owner;

  event NewCoffee(
    address indexed from,
    uint256 timestamp,
      string message,
      string name
  );

  constructor() payable {
    console.log("CoffeePortal constructor");

    // user who is calling this function address
    owner = payable(msg.sender);
  }

  struct Coffee {
    address giver; // The address of the user who buys me a coffee.
    string message; // The message the user sent.
    string name; // The name of the user who buys me a coffee.
    uint256 timestamp; // The timestamp when the user buys me a coffee.
  }

  Coffee[] coffee;

  function getTotalCoffee() public view returns (uint256) {
    console.log("We have %d total coffee recieved ", totalCoffee);
    return totalCoffee;
  }

  function buyCoffee(string memory _message, string memory _name, uint256 _payAmount) public payable {
    uint256 cost = 0.01 ether;

    require(_payAmount >= cost, "Not enough ether");

    totalCoffee = totalCoffee + 1;
    console.log("%s has just sent a coffee!", msg.sender);

    coffee.push(Coffee(msg.sender, _message, _name, block.timestamp));

    (bool success, ) = owner.call{ value: _payAmount }("");
    require(success, "Failed to send ether");

    emit NewCoffee(msg.sender, block.timestamp, _message, _name);
  }

  function test() public view {
    console.log("CoffeePortal test");
  }
}
