// @flow
import BasePage from '../BasePage'

const WM_BASIC = '#WorkMarketTheBasics'
const WM_LOCATION = '#WorkMarketLocation'
const WM_SCHEDULE = '#WorkMarketScheduling'
const WM_PRICE = '#WorkMarketPrice'
const WM_TEMPLATE = '#WorkMarketTemplate'
const WM_NEGOTIATION = '#WorkMarketNegotiation'
const WM_INVITE_USED_TECH = '#IsInvitePreviouslyUsedTech'
const WM_VIEW_AVAILABLE_TECH = '#btnViewAvailableTechs'
const WM_AVAILABLE_TECH_MODAL = '#viewAvailableTechModal'
const WM_SEARCH_TECH = '(//input[@type="search"])[last()]'

export default class WorkMarket extends BasePage {
  async isLoaded () {
    await this.waitForDisplayed(WM_BASIC)
    await this.waitForDisplayed(WM_LOCATION)
    await this.waitForDisplayed(WM_SCHEDULE)
    await this.waitForDisplayed(WM_PRICE)
    await this.waitForDisplayed(WM_TEMPLATE)
    await this.waitForDisplayed(WM_NEGOTIATION)
  }

  async tapBasic () {
    await this.click(WM_BASIC)
  }

  async tapLocation () {
    await this.click(WM_LOCATION)
  }

  async tapSchedule () {
    await this.click(WM_SCHEDULE)
  }

  async tapPrice () {
    await this.click(WM_PRICE)
  }

  async tapTemplate () {
    await this.click(WM_TEMPLATE)
  }

  async tapNegotiation () {
    await this.click(WM_NEGOTIATION)
  }

  async tapAvailableTechButton () {
    await this.click(WM_VIEW_AVAILABLE_TECH)
    await this.waitForDisplayed(WM_AVAILABLE_TECH_MODAL)
  }

  async tapPreviousUseTeh () {
    await this.click(WM_INVITE_USED_TECH)
  }

  async assignWMVendor (WMTech: string = 'Kinettix Worker') {
    await this.sendKeys(WM_SEARCH_TECH, WMTech)
    await this.waitForDisplayed(`//*[text()="${WMTech}"]`)
    await this.scrollElementIntoView(`//*[text()="${WMTech}"]`)
    await this.click(CREATE_ASSIGNMENT_BUTTON)
    await this.sleep(5000000)
  }
}
