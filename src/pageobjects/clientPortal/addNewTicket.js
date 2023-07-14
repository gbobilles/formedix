// @flow
import BasePage from '../BasePage'

const SOMETHING_WENT_WRONG = '//*[contains(text(), "Aaaah! Something went wrong")]'
const BULK_UPLOAD_BUTTON = '//button[text() = "Bulk Ticket Upload"]'
const ISSUE_DISCRIPTIONS = '//input[@type ="text" and @placeholder = "Enter a Description of the Issue"]'
const SCOPE_OF_WORKS = '//textarea[@formcontrolname="ScopeOfWork" and @placeholder = "Enter the details of the work to be completed"]'
const CLIENT_WORK_ORDER = '//input[@type ="text" and @placeholder = "Client WO Number"]'
const CLIENT_PURCHASE_ORDER = '//input[@type ="text" and @placeholder = "Client PO Number"]'
const CLIENT_PROBLEM_CODE = '#mat-select-0'
const CLIENT_PROBLEM_CODE_VALUE = '//span[@class="mat-option-text" and text()=" Connectivity "]'
const END_CLIENT = '(//*[@class="select2-hidden-accessible"])[1]'
const END_CLIENT_COUNTRY = '(//*[@class="select2-hidden-accessible"])[2]'
const END_CLIENT_LOCATION = '(//*[@class="select2-hidden-accessible"])[3]'
const TECH_LEVEL = '(//*[@class="select2-hidden-accessible"])[4]'
const TECH_NUMBERS = '(//*[@class="select2-hidden-accessible"])[5]'
const ADD_BTN = '//*[@class="btn btn-default btn-block" and text()= "Add"]'
const REQUEST_SCHEDULE_DATE = '//input[ @formcontrolname= "requestedResponseDate"]'
const REQUIRED_TOOLS = '//*[@formcontrolname= "TicketRequiredTools"]'
const SET_DATE = '//span[ text() = " Set "]'
const SAVE_BTN = '//button[text()="Save" and @type="button"]'
const MY_TICKET = '//*[text()=" My Tickets "]/..'

export default class AddNewTicket extends BasePage {
  async isLoaded () {
    await this.waitForDisplayed(BULK_UPLOAD_BUTTON)
    await this.waitForDisplayed(ISSUE_DISCRIPTIONS)
  }

  // async tapBulkUpload () {
  //   await this.click(BULK_UPLOAD_BUTTON)
  // }

  async addTicketIssue (issue: string = 'This is just a automated test  from client portal issue description') {
    await this.sendKeys(ISSUE_DISCRIPTIONS, issue)
  }

  async addScheduleDate () {
    await this.click(REQUEST_SCHEDULE_DATE)
    await this.waitForDisplayed(SET_DATE)
    await this.click(SET_DATE)
  }

  async addClientWONumber (WO: number = 42434343) {
    await this.sendKeys(CLIENT_WORK_ORDER, WO)
  }

  async addClientPONumber (PO: number = 23423432) {
    await this.sendKeys(CLIENT_PURCHASE_ORDER, PO)
  }

  async addScopeOfWorks (works: string = 'This is just a test client portal scope of works description') {
    await this.sendKeys(SCOPE_OF_WORKS, works)
  }

  async addRequiredTool (requireTool: string = 'This is just a test client portal scope of works description') {
    await this.scrollElementIntoView(REQUIRED_TOOLS)
    await this.sendKeys(REQUIRED_TOOLS, requireTool)
  }

  async tapProblemCode () {
    await this.click(CLIENT_PROBLEM_CODE)
    await this.sleep(500)
    await this.click(CLIENT_PROBLEM_CODE_VALUE)
    await this.sleep(5000)
  }

  async tapAddBtn () {
    await this.click(ADD_BTN)
  }

  async tapSaveBtn () {
    await this.click(SAVE_BTN)
  }

  async selectEndClient (endclient: string = ' American Eagle Outfitters ') {
    await this.selectDropDownByText(END_CLIENT, endclient)
    await this.sleep(5000)
  }

  async selectEndClientCountry (country: string = 'United States') {
    await this.selectDropDownByText(END_CLIENT_COUNTRY, country)
    await this.sleep(5000)
  }

  async selectEndClientLocation (location: string | string[]) {
    const clientLocation = process.env.TEST_ENVIRONMENT === 'qa' ? location[0] : location[1]
    await this.selectDropDownByText(END_CLIENT_LOCATION, clientLocation)
    await this.sleep(5000)
  }

  async selectTechLevel (techLevel: string = 'Advanced Network Technician') {
    await this.selectDropDownByText(TECH_LEVEL, techLevel)
    await this.sleep(5000)
  }

  async selectTechNumbers (techNumbers: number = 2) {
    await this.selectDropDownByText(TECH_NUMBERS, techNumbers)
  }

  async isSomethingWentWrong () {
    const somethingWentWrong = await this.locatorFound(SOMETHING_WENT_WRONG)
    return somethingWentWrong
  }

  async getValue () {
    const getData = await this.getAttributesValue(MY_TICKET, 'class')
    return getData
  }
}
