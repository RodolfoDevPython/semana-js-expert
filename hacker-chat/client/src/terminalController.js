import ComponentsBuilder from "./components.js"

export default class TerminalController {
    constructor() {}

    #onInputReceived(eventEmitter) {
        return function () {
            const message = this.getValue()
            console.log(message)

            this.clearValue()
        }
    }

    async initializeTable(eventEmitter) {
        const components = new ComponentsBuilder()
            .setScreen({ title: "HackerChat - Rodolfo" })
            .setLayoutComponent()
            .setInputComponent(this.#onInputReceived(eventEmitter))
            .setChatComponent()
            .build()

        components.input.focus()
        components.screen.render()

    }

    // parei emmm 37minutos de video  https://javascriptexpert.com.br/lc_jse_mar21_aulas?blog=2kvfihemb&video=1
    // revisar todos os componentes
}