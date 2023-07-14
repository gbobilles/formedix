// @flow
import BasePage from './BasePage'

const DASH_BOARD_TAB_MENU = '#dashboardUrl'
const CLIENTS_TAB_MENU = '#clientUrl'
const VENDORS_TAB_MENU = '#vendorsUrl'
const BILLING_TAB_MENU = '#billingUrl'
const HELP_TAB_MENU = '#help'
const PROJECT_REPORTS = '//a[text()="Reports"]'
const MANAGE_PROJECTS = '//a[text()="Manage Project"]'
const PROJECT_SETTINGS = '//a[text()="Settings"]'
const PROJECT_HAND_OFF = '//a[text()="Job HandOffs"]'
const BULK_UPLOAD = '//a[text()="Dispatch Bulk Work"]'
const MAP = '//a[text()="Map"]'
const PARTS = '//a[text()="Parts"]'
const MANAGE_DISPATCH = '//a[text()="Manage"]'
const DISPATCH_TAB_MENU = '#dispatchUrl'
const REPORTS_TAB_MENU = '#reportsUrl'
const PROJECTS_TAB_MENU = '#projectsUrl'

export default class MainPage extends BasePage {
  async hoverDispatchMenu () {
    await this.moveToLocatorPosition(DISPATCH_TAB_MENU)
  }

  async hoverReportsMenu () {
    await this.moveToLocatorPosition(REPORTS_TAB_MENU)
  }

  async hoverProjectMenu () {
    await this.moveToLocatorPosition(PROJECTS_TAB_MENU)
  }

  async tapDashBoard () {
    await this.click(DASH_BOARD_TAB_MENU)
  }

  async tapManageDispatch () {
    await this.hoverDispatchMenu()
    await this.click(MANAGE_DISPATCH)
  }

  async tapBulkUpload () {
    await this.hoverDispatchMenu()
    await this.click(BULK_UPLOAD)
  }

  async tapMap () {
    await this.hoverDispatchMenu()
    await this.click(MAP)
  }

  async tapParts () {
    await this.hoverDispatchMenu()
    await this.click(PARTS)
  }

  async tapClientsTab () {
    await this.click(CLIENTS_TAB_MENU)
  }

  async tapVendorsTab () {
    await this.click(VENDORS_TAB_MENU)
  }

  async tapBillingTab () {
    await this.click(BILLING_TAB_MENU)
  }

  async tapHelpTab () {
    await this.click(HELP_TAB_MENU)
  }

  async tapManageProjects () {
    await this.hoverProjectMenu()
    await this.click(MANAGE_PROJECTS)
  }

  async tapProjectReports () {
    await this.hoverProjectMenu()
    await this.click(PROJECT_REPORTS)
  }

  async tapProjectSettings () {
    await this.hoverProjectMenu()
    await this.click(PROJECT_SETTINGS)
  }

  async tapProjectHandsOff () {
    await this.hoverProjectMenu()
    await this.click(PROJECT_HAND_OFF)
  }
}
