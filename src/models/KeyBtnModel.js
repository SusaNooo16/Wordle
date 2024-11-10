const keyBtnValuesHaveLSize = ['Backspace', 'Enter']
export default class KeyBtnModel {
  constructor(keyBtnValue) {
    this.keyBtnValue = keyBtnValue
  }
  get size() {
    if (keyBtnValuesHaveLSize.includes(this.keyBtnValue)) {
      return 'm'
    }
    return 's'
  }
}
