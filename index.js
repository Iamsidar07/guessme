#!/usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk"
import ora from "ora"
const stages = [
  `
  +---+
  |   |
  O   |
 /|\  |
 / \  |
      |
=========
`,
  `
  +---+
  |   |
  O   |
 /|\  |
 /    |
      |
=========
`,
  `
  +---+
  |   |
  O   |
 /|\  |
      |
      |
=========
`,
  `
  +---+
  |   |
  O   |
 /|   |
      |
      |
=========`,
  `
  +---+
  |   |
  O   |
  |   |
      |
      |
=========
`,
  `
  +---+
  |   |
  O   |
      |
      |
      |
=========
`,
  `
  +---+
  |   |
      |
      |
      |
      |
=========
`,
]

const logo = `
░██████╗░██╗░░░██╗███████╗░██████╗░██████╗███╗░░░███╗███████╗
██╔════╝░██║░░░██║██╔════╝██╔════╝██╔════╝████╗░████║██╔════╝
██║░░██╗░██║░░░██║█████╗░░╚█████╗░╚█████╗░██╔████╔██║█████╗░░
██║░░╚██╗██║░░░██║██╔══╝░░░╚═══██╗░╚═══██╗██║╚██╔╝██║██╔══╝░░
╚██████╔╝╚██████╔╝███████╗██████╔╝██████╔╝██║░╚═╝░██║███████╗
░╚═════╝░░╚═════╝░╚══════╝╚═════╝░╚═════╝░╚═╝░░░░░╚═╝╚══════╝
`

const word_list = [
  "camel",
  "iloveu",
  "monu",
  "manoj",
  "baby",
  "aardvark",
  "baboon",
  "interesting",
  "manifestation",
  "sacrifice",
  "lover",
  "monika",
  "monikasidar",
]
const chosen_word = word_list[Math.floor(Math.random() * word_list.length)]
console.log(logo)

const blanks = []
let lives = stages.length
let score = 0
let total_attempts = 0
let wrong_attempts = 0
let right_attempts = 0

const show_result = () => {
  const spinner = ora("Calculating score...\n")
  spinner.start()
  setTimeout(() => {
    console.log(chalk.greenBright(`Score: ${score}
Accuracy: ${Math.round((right_attempts / total_attempts) * 100, 2)}%
Total attempts: ${total_attempts}\nRight Attempts: ${right_attempts}
Wrong Attempts: ${wrong_attempts}
`))

    spinner.stop()
  }, 700)
}

chosen_word.split("").forEach(_blank => {
  blanks.push("_")
});

async function input() {
  const guess_input = await inquirer.prompt({
    name: "guess",
    message: "Guess a letter in word? ",
    type: "input"
  })
  return guess_input.guess.toLowerCase()

}

while (blanks.join("") !== chosen_word && lives > 0) {
  const result = blanks.join(" ")
  console.log(chalk.magenta(result))
  // take input from user
  const guess = await input()

  let is_correct = false
  total_attempts += 1

  chosen_word.split("").forEach((letter, index) => {
    if (letter === guess) {
      // replace blanks with letter
      blanks[index] = letter
      is_correct = true
    }
  });
  if (is_correct) {
    score += 10 + Math.ceil(Math.random() * 20)
    right_attempts += 1
    if (blanks.join("") === chosen_word) {
      console.log(chalk.magenta(blanks.join("")))
      console.log(chalk.redBright("Game over, you won"))
      show_result()
    }
  } else {
    score -= Math.floor(Math.random() * 10)
    wrong_attempts += 1
    console.log(stages[lives - 1])
    lives -= 1
    console.log(chalk.redBright(`Loose a life..., ${lives} lives left`))
    if (lives === 0) {
      console.log(chalk.redBright("Game over, you won"))
      show_result()
    }
  }
}
