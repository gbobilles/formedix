// @flow
import BasePage from '../BasePage'

const SOMETHING_WENT_WRONG = '//*[contains(text(), "Aaaah! Something went wrong")]'

export default class WentWrong extends BasePage {
  async isSomethingWentWrong () {
    const somethingWentWrong = await this.isExistingWithin(SOMETHING_WENT_WRONG)
    return somethingWentWrong
  }
}
