import ComponentsBuilder from "./components.js"
import { constants } from "./constants.js";


export default class TerminalController {

    #usersCollors = new Map();

    constructor() {}

    //criar uma cor aleatoria
    #pickCollor() {
        return `#` + ( (1 << 24) * Math.random() | 0 ).toString(16) + '-fg' 
    }

    #getUserCollor(userName) {

        if( this.#usersCollors.has(userName) ) return this.#usersCollors.get(userName);

        const collor = this.#pickCollor();
        this.#usersCollors.set(userName, collor);

        return collor;

    }


    #onInputReceived(eventEmitter) {
        return function () {
            const message = this.getValue()
            console.log(message)

            this.clearValue()
        }
    }

    #onMessageReceived({ screen, chat }) {
        return msg => {

            const { userName, message } = msg;
            const collor = this.#getUserCollor(userName);

            chat.addItem(`{${collor}}{bold}${userName}{/}: ${message}`);
            screen.render(); // atualizar a tela

        }
    }

    #onLogChanged({ screen, activityLog }) {
        return msg => {

            const [ userName ]= msg.split(/\s/);
            const collor = this.#getUserCollor(userName);

            activityLog.addItem(`{${collor}}{bold}${msg.toString()}{/}`);
            screen.render(); // atualizar a tela

        }
    }

    #onStatusChanged({ screen, status }) {
        return users => {

            //vamos pegar o primeiro elemento da lista

            const { content } = status.items.shift();

            status.clearItems()
            status.addItem(content)

            users.forEach(userName => {
                const collor = this.#getUserCollor(userName);

                status.addItem(`{${collor}} {bold}${userName}{/}`);
            });

            screen.render(); // atualizar a tela
        }
    }

    #registerEvents(eventEmitter, components)  {
        // eventEmitter.emit("Turma01", "hey");
        // eventEmitter.on("Turma01", msg => console.log(msg.toString()) );
        eventEmitter.on(constants.events.app.MESSAGE_RECEIVED, this.#onMessageReceived(components) )
        eventEmitter.on(constants.events.app.ACTIVITYLOG_UPDATED, this.#onLogChanged(components) )
        eventEmitter.on(constants.events.app.STATUS_UPDATED, this.#onStatusChanged(components) )
    }

    async initializeTable(eventEmitter) {
        const components = new ComponentsBuilder()
            .setScreen({ title: "HackerChat - Rodolfo" })
            .setLayoutComponent()
            .setInputComponent(this.#onInputReceived(eventEmitter))
            .setChatComponent()
            .setActivityLogComponent()
            .setStatusComponent()
            .build()

        this.#registerEvents(eventEmitter, components);
        components.input.focus()
        components.screen.render()

        
        const users = ["RodolfoSr"]
        eventEmitter.emit(constants.events.app.STATUS_UPDATED, users);
        users.push("RodolfoPl")
        eventEmitter.emit(constants.events.app.STATUS_UPDATED, users);
        users.push("RodolfoJr")
        eventEmitter.emit(constants.events.app.STATUS_UPDATED, users);
        users.push("RomuloJr")
        eventEmitter.emit(constants.events.app.STATUS_UPDATED, users);

    }

    // parei emmm 37minutos de video  https://javascriptexpert.com.br/lc_jse_mar21_aulas?blog=2kvfihemb&video=1
    // revisar todos os componentes
}