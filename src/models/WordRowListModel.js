import WordRowModel from './WordRowModel'

const countRows = 5
export default class WordRowListModel extends Array {
  constructor() {
    const value = Array(countRows).fill(null)
    value.map(() => new WordRowModel())
    super(...value.map(() => new WordRowModel()))
  }

  setLetter(letter) {
    this.firstUnfilledRow.setLetter(letter)
  }
  removeLastLetter() {
    this.firstUnfilledRow.removeLastLetter()
  }
  checkWord() {
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
}
