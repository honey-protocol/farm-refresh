import fs from 'fs'
var dataArray = JSON.parse(fs.readFileSync('data.json', 'utf-8'))

const keysArray = [];

dataArray.map((items, index )=> {
    keysArray.push([items.publicKey, items.account.gemsStaked])
    // keysArray.push(items.publicKey)
})

fs.writeFile("./output.json", JSON.stringify(keysArray), (err: any) => {
    // throws an error, you could also catch it here
    if (err) throw err;

    // success case, the file was saved
    console.log("Accounts saved!");
  });