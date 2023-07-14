// @flow
import BasePage from '../BasePage'

const PARTS_AND_LOGISTIC_DATATABLE = '#dataTable'
const SOMETHING_WENT_WRONG = '//*[contains(text(), "Aaaah! Something went wrong")]'

export default class Parts extends BasePage {
  async isLoaded () {
    await this.waitForDisplayed(PARTS_AND_LOGISTIC_DATATABLE)
  }
}
