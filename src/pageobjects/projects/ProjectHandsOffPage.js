// @flow
import BasePage from '../BasePage'

const HANDS_OFF_PROJECT_TABLE = '#dvJobTable'
const SOMETHING_WENT_WRONG = '//*[contains(text(), "Aaaah! Something went wrong")]'

export default class ProjectHandsOff extends BasePage {
  async isLoaded () {
    await this.waitForDisplayed(HANDS_OFF_PROJECT_TABLE)
  }
}
