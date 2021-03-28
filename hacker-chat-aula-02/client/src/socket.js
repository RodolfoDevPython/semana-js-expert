export default class SocketClient {

    #serverConnection = {}

    constructor({ host, port, protocol }) {
        this.host = host;
        this.port = port; 
        this.protocol = protocol;
    }

    async createConnectionServer() {
        const options = {
            port: this.port,
            host: this.host,
            headers: {
                Connection: "Upgrade",
                Upgrade: "websocket"
            }
        }

        const http = await import(this.protocol) //passsei dessa forma o import pq o js tem a lib http e a lib https. dessa forma pegamos dinamicamente
        const req = http.request(options)
        req.end()// dispara para o socket


        return new Promise( resolve => {
                //quando rolar o upgrade faca oq esta dentro da function
                req.once("upgrade", (req, socket) => resolve(socket))

                //obs: como a Promise ela é executa uma unica vez vamos usar o once
            }
            
        )

    }

    async initialize() {
        this.#serverConnection = await this.createConnectionServer()

        console.log("I connection to the server!!!")
    }

}