import words1 from '../../assets/words'
const words = words1.filter(word => word.length == 5)
console.log(words)

const countLettersOfWord = 5
export default class WordRowModel {
  constructor() {
    this.word = ''
    this.isFilled = false
  }

  setLetter(letter) {
    if (this.wordLength != countLettersOfWord) {
      this.word = `${this.word}${letter}`
    }
  }

  removeLastLetter() {
    this.word = this.word.slice(0, -1)
  }

  checkWord() {
    return words.includes(this.word)
  }

  get letters() {
    return [
      ...this.word.split(''),
      ...Array(countLettersOfWord - this.wordLength).fill(''),
    ]
  }
  get wordLength() {
    return this.word.length
  }
}
