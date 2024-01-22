import axios from "axios"
import { IScenesGenerator } from "../../../src/types/scene"

// Define various scenes and their behavior for the bot
const ScenesGenerator: IScenesGenerator = {
    // Define the 'start' scene
    start: {
        // The 'enter' method defines what happens when this scene starts
        enter: async (ctx) => {
            // Send a welcome message and ask for the user's choice
            ctx.reply("Hi, I'm a bot that provides weather information\n\nDo you want to get the current weather or the weather for tomorrow?\nSelect /today or /tomorrow")
        },
        // Handle text messages in this scene
        text: (ctx) => {
            const text = ctx.message.text
            // Respond to specific commands and switch scenes accordingly
            switch (text) {
                case "/today":
                    ctx.scene.enter("currentWeatherInformation")
                    break;
                case "/tomorrow":
                    ctx.scene.enter("tommorowtWeatherInformation")
                    break;
                default:
                    // Handle unrecognized input
                    ctx.reply("Select /today or /tomorrow")
                    break;
            }
        },
        // Handle any other type of message in this scene
        message: (ctx) => {
            ctx.reply("Select /today or /tomorrow")
        }
    },
    // Define the 'currentWeatherInformation' scene
    currentWeatherInformation: {
        // Define behavior when entering the scene
        enter: (ctx) => {
            // Prompt user for the city name
            ctx.reply("Enter the city name to find out today's weather or type /back")
        },
        // Handle text messages in this scene
        text: async (ctx) => {
            const text = ctx.message.text
            if (text == '/back') {
                // Go back to the 'start' scene if '/back' is typed
                return ctx.scene.enter('start')
            }
            try {
                // Make an API call to get weather information
                const weatherApiRes = await axios.get(`[Weather API URL with parameters]`)
                // Respond with the current weather condition
                ctx.reply(weatherApiRes.data.current.condition.text)
            } catch (error) {
                console.error(error)
                // Handle errors in API call
                ctx.reply("Weather API error")
            }
        },
        // Handle any other type of message in this scene
        message: (ctx) => {
            ctx.reply("Enter the city name or type /back")
        }
    },
    // Define the 'tommorowtWeatherInformation' scene
    tommorowtWeatherInformation: {
        // Define behavior when entering the scene
        enter: (ctx) => {
            // Prompt user for the city name for tomorrow's weather
            ctx.reply("Enter a city name to get tomorrow's weather or type /back")
        },
        // Handle text messages in this scene
        text: async (ctx) => {
            const text = ctx.message.text
            if (text == '/back') return ctx.scene.enter('start')
            try {
                // Make an API call to get tomorrow's weather information
                const weatherApiRes = await axios.get(`[Weather API URL with parameters]`)
                // Respond with the weather condition for the next day
                ctx.reply(weatherApiRes.data.forecast.forecastday[0].day.condition.text)
            } catch (error) {
                console.error(error)
                // Handle errors in API call
                ctx.reply("Weather API error")
            }
        },
        // Handle any other type of message in this scene
        message: (ctx) => {
            ctx.reply("Enter the city name or type /back")
        }
    },
}

export { ScenesGenerator }