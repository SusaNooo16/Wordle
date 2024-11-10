import WordRowModel from './WordRowModel'

const countRows = 5
export default class WordRowListModel extends Array {
  constructor() {
    const value = Array(countRows).fill(null)
    value.map(() => new WordRowModel())
    super(...value.map(() => new WordRowModel()))
  }

  setLetter(letter) {
    this.firstUnfilledRow.setLetter(letter.toLowerCase())
  }
  removeLastLetter() {
    this.firstUnfilledRow.removeLastLetter()
  }
  checkWord() {
    if (this.firstUnfilledRow.word.length < countRows) {
      return false
    }
    if (this.some((row) => row.isFilled && row.word == this.firstUnfilledRow.word)) {
      return false
    }
    return this.firstUnfilledRow.checkWord()
  }
  get firstUnfilledRow() {
    return this.find(row => !row.isFilled)
  }
  get firstUnfilledRowIndex() {
    return this.findIndex(row => !row.isFilled)
  }
  get isAllRowFilled() {
    return this.every(row => row.isFilled)
  }
  get inputedLetters() {
    let result = new Set(
      this.reduce((acc, x) => {
        if (!x.isFilled) {
          return acc
        }
        return [...acc, ...x.word.split('')]
      }, []),
    )
    return Array.from(result)
  }
  get inputedLettersWithIndex() {
    return this.reduce((acc, x) => {
      if (!x.isFilled) {
        return acc
      }

      const lettersWithIndex = x.word.split('').map((letter, index) => ({
        letter,
        index,
      }))
      return [...acc, ...lettersWithIndex]
    }, [])
  }
}
