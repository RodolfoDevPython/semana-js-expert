export default class CliConfig {

    constructor({ userName, hostUri, room }) {
        this.userName = userName
        this.room = room

        const { hostname, port, protocol } = new URL(hostUri)

        this.host = hostname;
        this.port = port;
        this.protocol = protocol.replace(/\W/, "") 

    }

    static parseArguments(commands) {
        
        const cmd = new Map();

        for(const key in commands)  {

            const commandsPreffix = "--"
            const index = parseInt(key)
            const command = commands[key];

            if(!command.includes(commandsPreffix)) continue;

            cmd.set(
                command.replace(commandsPreffix, ""),
                commands[index + 1]
            )
            
        }

        return new CliConfig(Object.fromEntries(cmd)); // cmd -> vem do tipo Map e precisamos transforma em um obj
    }
}