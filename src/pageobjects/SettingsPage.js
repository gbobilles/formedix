// @flow
import BasePage from './BasePage'

const SETTINGS_TAB_MENU = '#settingUrlMain'
const SYSTEM_SETTING = '//a[text()="System"]'
const SYSTEM_CHECKLIST_DATA_TABLE = '#checklistDataTable'

export default class Settings extends BasePage {
  async isLoaded () {
    await this.waitForDisplayed(SYSTEM_CHECKLIST_DATA_TABLE)
  }

  async hoverOverSettings () {
    await this.moveToLocatorPosition(SETTINGS_TAB_MENU)
  }

  async tapSystemSettings () {
    await this.hoverOverSettings()
    await this.click(SYSTEM_SETTING)
  }
}
