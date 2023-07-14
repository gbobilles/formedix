// @flow
import BasePage from '../BasePage'
import AddProject from './AddProjectPage'

const JOB_PROFILE_DETAILS = '#dv_JobProfileDetails'
const PROJECT_OVERVIEW_TAB = '//a[text()="Project Overview"]'
const PROJECT_DASHBOARD_TAB = '//a[text()="Dashboard" and @class="tabs"]'
const PROJECT_SCHEDULE_TAB = '//a[text()="Schedule"]'
const PROJECT_JOBS_TAB = '//a[starts-with(text(),"Jobs")]'
const PROJECT_TEAM_TAB = '//a[text()="Team"]'
const PROJECT_WORKFLOW_BUILDER_TAB = '//a[text()="Workflow Builder"]'
const PROJECT_PLAN_TAB = '//a[text()="Project Plan"]'
const PROJECT_INVOICE_TAB = '//a[text()="Invoice"]'
const PROJECT_DOCUMENTS_TAB = '//a[text()="Documents"]'
const PROJECT_ACTIVITIES_TAB = '//a[text()="Activities"]'
const PROJECT_ISSUE_AND_RISK_TAB = '//a[text()="Issues & Risks"]'
const PROJECT_SCHEDULE_VIEW_TAB = '//a[text()="Schedule View"]'
const PROJECT_ADD_PROJECT_BUTTON = '#btnAddProject'
const PROJECT_SEARCH = '#tbSearch'
const ADD_PROJECT_JOB = '//*[@class="btn empty pull-right addLocations" and text()=" Add Jobs"]'
const PROJECT_LOCATIONS = '//input[@class="groupCheckBox"]'
const ADD_LOCATION_BUTTON = '#addSelectedLocations'

export default class ManageProject extends BasePage {
  async isLoaded () {
    await this.waitForDisplayed(JOB_PROFILE_DETAILS)
  }

  async tapProjectOverview () {
    await this.click(PROJECT_OVERVIEW_TAB)
  }

  async tapProjectDashboard () {
    await this.click(PROJECT_DASHBOARD_TAB)
  }

  async tapProjectSchdule () {
    await this.click(PROJECT_SCHEDULE_TAB)
  }

  async tapProjectJobs () {
    await this.click(PROJECT_JOBS_TAB)
  }

  async tapProjectTeam () {
    await this.click(PROJECT_TEAM_TAB)
  }

  async tapProjectWorkFlowBuilder () {
    await this.click(PROJECT_WORKFLOW_BUILDER_TAB)
  }

  async tapProjectPlan () {
    await this.click(PROJECT_PLAN_TAB)
  }

  async tapProjectInvoice () {
    await this.click(PROJECT_INVOICE_TAB)
  }

  async tapProjectDocuments () {
    await this.click(PROJECT_DOCUMENTS_TAB)
  }

  async tapProjectActivities () {
    await this.click(PROJECT_ACTIVITIES_TAB)
  }

  async tapProjectIssueAndRisk () {
    await this.click(PROJECT_ISSUE_AND_RISK_TAB)
  }

  async tapProjectScheduleView () {
    await this.click(PROJECT_SCHEDULE_VIEW_TAB)
  }

  async tapAddProjectButton () {
    await this.click(PROJECT_ADD_PROJECT_BUTTON)
  }

  async searchProject (projectName) {
    await this.click(PROJECT_SEARCH)
    await this.sendKeys(PROJECT_SEARCH, projectName)
    await browser.keys('Enter')
  }

  async tapProjecJobsTab () {
    await this.click(PROJECT_JOBS_TAB)
  }

  async tapAddProjecJobButton () {
    await this.click(ADD_PROJECT_JOB)
  }

  async selectProjectLocation (contact: number = 0) {
    await this.waitForDisplayed(PROJECT_LOCATIONS)
    for (let i = contact; i <= await this.getCountOfArrayList(PROJECT_LOCATIONS) - i; i++) {
      await this.click(`(//input[@class="groupCheckBox"])[${i}]`)
      await this.sleep(500)
    }
    await this.click(ADD_LOCATION_BUTTON)
    // await this.sleep(45000000)
  }

  get addProject () {
    return new AddProject()
  }
}
