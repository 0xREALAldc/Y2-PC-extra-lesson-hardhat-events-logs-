const hre = require("hardhat")

async function main() {
  // await Hardhat Run Time environment compile our contract
  await hre.run("compile")

  // we are going to deploy the contract 
  // 1 - we get the contract using the contractFactory with the contract 'name'
  const SimpleStorage = await hre.ethers.getContractFactory("SimpleStorage")
  // 2 - we get a instance of the contract deployed
  const simpleStorage = await SimpleStorage.deploy()
  // 3 -  wait for the blocks be mined
  await simpleStorage.deployed()
  console.log(simpleStorage.address)

  // now we're going to call the 'store' function to see the 'event' being emitted
  const transactionResponse = await simpleStorage.store(4)
  const transactionReceipt = await transactionResponse.wait()
  // console.log(transactionReceipt)
  console.log('-----------------------------------------------------------------')
  console.log(transactionReceipt.events[0].args.oldNumber.toString())
  console.log(transactionReceipt.events[0].args.newNumber.toString())
  console.log(transactionReceipt.events[0].args.addedNumber.toString())
  console.log(transactionReceipt.events[0].args.sender)
  console.log('-----------------------------------------------------------------')
  // console.log(transactionReceipt.events)
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})