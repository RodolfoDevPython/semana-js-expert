/*
node index.js \
    --username rodolfo \
    --room sala001 \
    --hostUri localhost
    

*/


import Events from "events";
import CliConfig from "./src/cliCongif.js";
import SocketClient from "./src/socket.js";
import TerminalController from "./src/terminalController.js";

console.log("process.argv", process.argv)

const [ nodePath, filePath, ...commands ]  = process.argv

const config = CliConfig.parseArguments(commands)

console.log("config", config)

console.log(commands)

const socketClient = new SocketClient(config)

await socketClient.initialize();

// const componentEmitter = new Events();

// const controller = new TerminalController();

// await controller.initializeTable(componentEmitter);