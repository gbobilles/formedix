// @flow
import BasePage from '../BasePage'

const PROJECT_TITLE = '//*[@name="title"]'
const PROJECT_OVERVIEW = '#overview_ifr'
const CLIENT_OPTION_DROPDOWN = '#clientId'
const END_CLIENT_OPTION_DROPDOWN = '#endclient'
const PROJECT_STATUS = '//*[@name="status"]'
const PROJECT_CATEGORY = '//*[@name="catagory"]'
const PROJECT_TYPE = '//*[@name="type"]'
const PROJECT_SCOPE_WORK = '#scopeOfWork_ifr'
const NEXT_BUTTON = '#btnOverviewNext'
const ADD_ACTIVITIES = '//*[text()="Add Activities" and @class="activitiesLibraryBtn nnoActivityListFound btn btn-default empty"]'
const ACTIVIES_OPTION = '//*[@class="activitygroupCheckBox"]'
const ADD_BUTTON = '#getSelectedActivitiesAndCreateTableBtn'
const NEXT_BUTTON_ACTIVITIES = '#btnActivitiesNext'
const ADD_PROJECT_BUTTON = '#addProjectBtn'
const PROJECT_ADDED_SUCCESS_MESSAGE = '//*[text()="Jobs created for selected locations succesfully!" or text()="Project Added Succesfully!"]'
const OK_BUTTON = '//*[@class="confirm"]'
const TIMEOUT = 5000

export default class AddProject extends BasePage {
  async isLoaded () {
    await this.waitForDisplayed(PROJECT_TITLE)
  }

  async addProjectTitle (title: string = 'This is just a test project automation title') {
    await this.sendKeys(PROJECT_TITLE, title)
  }

  async addProjectOverview (overview: string = 'This is just a test overview-automated') {
    await this.switchToElementFrame(PROJECT_OVERVIEW)
    await this.sendKeys('#tinymce', overview)
    await this.switchToDefaultFrame()
  }

  async addProjectScopeOfWork (scopeOfWork: string = 'This is just a test scope of work-automated') {
    await this.switchToElementFrame(PROJECT_SCOPE_WORK)
    await this.sendKeys('#tinymce', scopeOfWork)
    await this.switchToDefaultFrame()
  }

  async selectClient (contact: string | string[]) {
    const client = process.env.TEST_ENVIRONMENT === 'qa' ? contact[0] : contact[1]
    await this.selectDropDownByText(CLIENT_OPTION_DROPDOWN, client)
    await this.sleep(TIMEOUT)
  }

  async selectEndClient (contact: string | string[]) {
    const endClient = process.env.TEST_ENVIRONMENT === 'qa' ? contact[0] : contact[1]
    await this.selectDropDownByText(END_CLIENT_OPTION_DROPDOWN, endClient)
    await this.sleep(TIMEOUT)
  }

  async selectProjectStatus (contact: string | string[]) {
    const endClient = process.env.TEST_ENVIRONMENT === 'qa' ? contact[0] : contact[1]
    await this.selectDropDownByText(PROJECT_STATUS, endClient)
    await this.sleep(TIMEOUT)
  }

  async selectProjectCategory (contact: string | string[]) {
    const endClient = process.env.TEST_ENVIRONMENT === 'qa' ? contact[0] : contact[1]
    await this.selectDropDownByText(PROJECT_CATEGORY, endClient)
    await this.sleep(TIMEOUT)
  }

  async selectProjectType (contact: string | string[]) {
    const endClient = process.env.TEST_ENVIRONMENT === 'qa' ? contact[0] : contact[1]
    await this.selectDropDownByText(PROJECT_TYPE, endClient)
  }

  async tapNextButton () {
    await this.click(NEXT_BUTTON)
  }

  async tapAddButton () {
    await this.waitForExist(ADD_BUTTON)
    await this.click(ADD_BUTTON)
    await this.waitForExist(NEXT_BUTTON_ACTIVITIES)
    await this.click(NEXT_BUTTON_ACTIVITIES)
  }

  async tapAddProjectButton () {
    await this.waitForExist(ADD_PROJECT_BUTTON)
    await this.click(ADD_PROJECT_BUTTON)
  }

  async tapAddActivitiestButton () {
    await this.click(ADD_ACTIVITIES)
    await this.waitForExist(ACTIVIES_OPTION)
  }

  async tapOKButton () {
    await this.waitForExist(OK_BUTTON)
    await this.click(OK_BUTTON)
  }

  async isSuccessMessageDisplayed () {
    const timeout = 5000
    const message = await this.isDisplayedWithin(PROJECT_ADDED_SUCCESS_MESSAGE, timeout)
    return message
  }

  async selectActivities (contact: number = 0) {
    for (let i = contact; i <= await this.getCountOfArrayList(ACTIVIES_OPTION) - i; i++) {
      await this.click(`(//*[@class="activitygroupCheckBox"])[${i}]`)
      await this.sleep(500)
    }
  }
}
