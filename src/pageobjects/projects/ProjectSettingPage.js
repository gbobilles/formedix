// @flow
import BasePage from '../BasePage'

const ACTIVITY_CATEGORY_TABLE = '#definitionTypes'
const SOMETHING_WENT_WRONG = '//*[contains(text(), "Aaaah! Something went wrong")]'

export default class ProjectSettings extends BasePage {
  async isLoaded () {
    await this.waitForDisplayed(ACTIVITY_CATEGORY_TABLE)
  }
}
