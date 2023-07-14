// @flow
import { assert } from 'chai'
import allureReporter from '@wdio/allure-reporter'
import LoginPage from '@page-objects/LoginPage'
import driverutils from '@core-libs/driver-utils'
import CustomerTestData from '@input-data/CustomerTestData'
import DashBoard from '@page-objects/DashBoardPage'
import Clients from '@page-objects/ClientsPage'
import Vendors from '@page-objects/VendorsPage'
import Dispatch from '@page-objects/dispatch/DispatchPage'
import ManageProject from '@page-objects/projects/ManageProjectPage'
import Billing from '@page-objects/BillingPage'
import Reports from '@page-objects/ReportsPage'
import Settings from '@page-objects/SettingsPage'
import Help from '@page-objects/HelpPage'
import BulkUpload from '@page-objects/dispatch/BulkUploadPage'
import Map from '@page-objects/dispatch/MapPage'
import Parts from '@page-objects/dispatch/PartsPage'
import MainPage from '@page-objects/MainPage'
import WentWrong from '@page-objects/somethingwentwrong/SomethingWentWrongPage'
import ProjectReports from '@page-objects/projects/ProjectReportsPage'
import {step} from '@core-libs/AllurUtil'

const loginpage = new LoginPage()
const dashboard = new DashBoard()
const clients = new Clients()
const vendors = new Vendors()
const dispatch = new Dispatch()
const manageProjects = new ManageProject()
const billing = new Billing()
const reports = new Reports()
const settings = new Settings()
const help = new Help()
const bulkUpload = new BulkUpload()
const map = new Map()
const parts = new Parts()
const mainPage = new MainPage()
const wentwrong = new WentWrong()
const projectReport = new ProjectReports()

describe(`Acceptance Tests on - ${process.env.TEST_ENVIRONMENT.toUpperCase()}`, function () {
  describe(`Acceptance Tests - Main Menu Pages on - ${process.env.TEST_ENVIRONMENT.toUpperCase()}`, function () {
    let testTitle = this.title

    it('Sign in as exiting user', async function () {
      await step('Preparing test data', async function () {
        await driverutils.addAllureReport(allureReporter, __dirname, 'Dispatch: Smoke Testing', testTitle)
        await driverutils.goToHome()
        await loginpage.isLoaded()
      })

      await step('Sign in as exiting user', async function () {
        await loginpage.tapLoginButton()
        await loginpage.loginExistingUser(CustomerTestData.loginCredentials.username, CustomerTestData.loginCredentials.password)
      })

      await step('Verify DashBoard page loaded property', async function () {
        await dashboard.isLoaded()
        assert.isFalse(await dashboard.isQBODown(), 'Quickbooks is down')
        await dispatch.waitForPageToBeLoaded()
        assert.isFalse(await wentwrong.isSomethingWentWrong(), 'Something went wrong happened in the page')
      })

      await step('Verify Clients page loaded property', async function () {
        await mainPage.tapClientsTab()
        await clients.isLoaded()
        await dispatch.waitForPageToBeLoaded()
        assert.isFalse(await wentwrong.isSomethingWentWrong(), 'Something went wrong happened in the page')
      })

      await step('Verify Vendors page loaded property', async function () {
        await mainPage.tapVendorsTab()
        await vendors.isLoaded()
        await dispatch.waitForPageToBeLoaded()
        assert.isFalse(await wentwrong.isSomethingWentWrong(), 'Something went wrong happened in the page')
      })

      await step('Verify Dispatch page and Sub-pages loaded property', async function () {
        await mainPage.tapManageDispatch()
        await dispatch.isLoaded()
        assert.isFalse(await wentwrong.isSomethingWentWrong(), 'Something went wrong happened in the page')
        await mainPage.tapBulkUpload()
        await bulkUpload.isLoaded()
        assert.isFalse(await wentwrong.isSomethingWentWrong(), 'Something went wrong happened in the page')
        await mainPage.tapMap()
        await map.switchBrowserTab(1)
        await map.isLoaded()
        assert.isFalse(await wentwrong.isSomethingWentWrong(), 'Something went wrong happened in the page')
        await parts.switchBrowserTab(0)
        await mainPage.tapParts()
        await parts.isLoaded()
        assert.isFalse(await wentwrong.isSomethingWentWrong(), 'Something went wrong happened in the page')
      })

      await step('Verify Billing page loaded property', async function () {
        await mainPage.tapBillingTab()
        await billing.isLoaded()
        await dispatch.waitForPageToBeLoaded()
        assert.isFalse(await wentwrong.isSomethingWentWrong(), 'Something went wrong happened in the page')
      })

      await step('Verify Reports page loaded property', async function () {
        await reports.tapViewAllProjects()
        await reports.isLoaded()
        await dispatch.waitForPageToBeLoaded()
        assert.isFalse(await wentwrong.isSomethingWentWrong(), 'Something went wrong happened in the page')
      })

      await step('Verify Settings page loaded property', async function () {
        await settings.tapSystemSettings()
        await settings.isLoaded()
        await dispatch.waitForPageToBeLoaded()
        assert.isFalse(await wentwrong.isSomethingWentWrong(), 'Something went wrong happened in the page')
      })

      await step('Verify Help page loaded property', async function () {
        await mainPage.tapHelpTab()
        await help.isLoaded()
        await dispatch.waitForPageToBeLoaded()
        assert.isFalse(await wentwrong.isSomethingWentWrong(), 'Something went wrong happened in the page')
      })

      await step('Verify Projects page loaded property', async function () {
        await mainPage.tapManageProjects()
        await manageProjects.isLoaded()
        await dispatch.waitForPageToBeLoaded()
        assert.isFalse(await wentwrong.isSomethingWentWrong(), 'Something went wrong happened in the page')
      })
    })
  })

  describe(`Acceptance Tests - Dispatch Tabular Pages Verification on - ${process.env.TEST_ENVIRONMENT.toUpperCase()}`, function () {
    it(`Verify Dispath Overview sub menus tabular page loaded property on - ${process.env.TEST_ENVIRONMENT.toUpperCase()}`, async function () {
      await step('Sign in as exiting user', async function () {
        await mainPage.tapManageDispatch()
        await dispatch.isLoaded()
      })

      await step('Verify Dispath Overview sub menus tabular page loaded property', async function () {
        await dispatch.tapDispatchOverview()
        await dispatch.waitForPageToBeLoaded()
        assert.isFalse(await wentwrong.isSomethingWentWrong(), 'Something went wrong happened in the page')
      })

      await step('Verify Dispath Location sub menus tabular page loaded property', async function () {
        await dispatch.tapDispatchLocation()
        await dispatch.waitForPageToBeLoaded()
        assert.isFalse(await wentwrong.isSomethingWentWrong(), 'Something went wrong happened in the page')
      })

      await step('Verify Dispath Activity sub menus tabular page loaded property', async function () {
        await dispatch.tapDispatchActivity()
        await dispatch.waitForPageToBeLoaded()
        assert.isFalse(await wentwrong.isSomethingWentWrong(), 'Something went wrong happened in the page')
      })

      await step('Verify Dispath Audit sub menus tabular page loaded property', async function () {
        await dispatch.tapDispacthAudit()
        await dispatch.waitForPageToBeLoaded()
        assert.isFalse(await wentwrong.isSomethingWentWrong(), 'Something went wrong happened in the page')
      })

      await step('Verify Dispath Financials sub menus tabular page loaded property', async function () {
        await dispatch.tapDispatchFinancials()
        await dispatch.waitForPageToBeLoaded()
        assert.isFalse(await wentwrong.isSomethingWentWrong(), 'Something went wrong happened in the page')
      })

      await step('Verify Dispath Finacials sub menus tabular page loaded property', async function () {
        await dispatch.tapDispatchActivity()
        await dispatch.waitForPageToBeLoaded()
        assert.isFalse(await wentwrong.isSomethingWentWrong(), 'Something went wrong happened in the page')
      })

      await step('Verify Dispath Notes sub menus tabular page loaded property', async function () {
        await dispatch.tapDispatchNotes()
        await dispatch.waitForPageToBeLoaded()
        assert.isFalse(await wentwrong.isSomethingWentWrong(), 'Something went wrong happened in the page')
      })

      await step('Verify Dispath Assignments sub menus tabular page loaded property', async function () {
        await dispatch.tapDispatchAssignments()
        await dispatch.waitForPageToBeLoaded()
        assert.isFalse(await wentwrong.isSomethingWentWrong(), 'Something went wrong happened in the page')
      })

      await step('Verify Dispath Documents sub menus tabular page loaded property', async function () {
        await dispatch.tapDispatchDocuments()
        await dispatch.waitForPageToBeLoaded()
        assert.isFalse(await wentwrong.isSomethingWentWrong(), 'Something went wrong happened in the page')
      })

      await step('Verify Dispath Deliverables sub menus tabular page loaded property', async function () {
        await dispatch.tapDispatchDeliverables()
        await dispatch.waitForPageToBeLoaded()
        assert.isFalse(await wentwrong.isSomethingWentWrong(), 'Something went wrong happened in the page')
      })

      await step('Verify Dispath Vendors sub menus tabular page loaded property', async function () {
        await dispatch.tapDispatchVendors()
        await dispatch.waitForPageToBeLoaded()
        assert.isFalse(await wentwrong.isSomethingWentWrong(), 'Something went wrong happened in the page')
      })

      await step('Verify Dispath Review sub menus tabular page loaded property', async function () {
        await dispatch.tapDispatchReview()
        await dispatch.waitForPageToBeLoaded()
        assert.isFalse(await wentwrong.isSomethingWentWrong(), 'Something went wrong happened in the page')
      })

      await step('Verify Dispath Support sub menus tabular page loaded property', async function () {
        await dispatch.tapDispatchSupports()
        await dispatch.waitForPageToBeLoaded()
        assert.isFalse(await wentwrong.isSomethingWentWrong(), 'Something went wrong happened in the page')
      })
    })
  })

  describe(`Acceptance Tests - Manage Projects Tabular Pages Verification on   - ${process.env.TEST_ENVIRONMENT.toUpperCase()}`, function () {
    it(`Acceptance Tests - Manage Projects Tabular Pages Verification on  - ${process.env.TEST_ENVIRONMENT.toUpperCase()}`, async function () {
      await step('Tap Manage Projects', async function () {
        await mainPage.tapManageProjects()
        await manageProjects.isLoaded()
      })

      await step('Verify Manage Projects: Projects Overview page loaded property', async function () {
        await manageProjects.tapProjectOverview()
        await dispatch.waitForPageToBeLoaded()
        assert.isFalse(await wentwrong.isSomethingWentWrong(), 'Something went wrong happened in the page')
      })

      await step('Verify Manage Projects: DashBoard page loaded property', async function () {
        await manageProjects.tapProjectDashboard()
        await dispatch.waitForPageToBeLoaded()
        assert.isFalse(await wentwrong.isSomethingWentWrong(), 'Something went wrong happened in the page')
      })

      await step('Verify Manage Projects: Schedule page loaded property', async function () {
        await manageProjects.tapProjectSchdule()
        await dispatch.waitForPageToBeLoaded()
        assert.isFalse(await wentwrong.isSomethingWentWrong(), 'Something went wrong happened in the page')
      })

      await step('Verify Manage Projects: Jobs page loaded property', async function () {
        await manageProjects.tapProjectJobs()
        await dispatch.waitForPageToBeLoaded()
        assert.isFalse(await wentwrong.isSomethingWentWrong(), 'Something went wrong happened in the page')
      })

      await step('Verify Manage Projects: Team page loaded property', async function () {
        await manageProjects.tapProjectTeam()
        await dispatch.waitForPageToBeLoaded()
        assert.isFalse(await wentwrong.isSomethingWentWrong(), 'Something went wrong happened in the page')
      })

      await step('Verify Manage Projects: WorkFlow Builder page loaded property', async function () {
        await manageProjects.tapProjectWorkFlowBuilder()
        await dispatch.waitForPageToBeLoaded()
        assert.isFalse(await wentwrong.isSomethingWentWrong(), 'Something went wrong happened in the page')
      })

      await step('Verify Manage Projects: Projects Plan page loaded property', async function () {
        await manageProjects.tapProjectPlan()
        await dispatch.waitForPageToBeLoaded()
        assert.isFalse(await wentwrong.isSomethingWentWrong(), 'Something went wrong happened in the page')
      })

      await step('Verify Manage Projects: Invoice page loaded property', async function () {
        await manageProjects.tapProjectInvoice()
        await dispatch.waitForPageToBeLoaded()
        assert.isFalse(await wentwrong.isSomethingWentWrong(), 'Something went wrong happened in the page')
      })

      await step('Verify Manage Projects: Documents page loaded property', async function () {
        await manageProjects.tapProjectDocuments()
        await dispatch.waitForPageToBeLoaded()
        assert.isFalse(await wentwrong.isSomethingWentWrong(), 'Something went wrong happened in the page')
      })

      await step('Verify Manage Projects: Activities page loaded property', async function () {
        await manageProjects.tapProjectActivities()
        await dispatch.waitForPageToBeLoaded()
        assert.isFalse(await wentwrong.isSomethingWentWrong(), 'Something went wrong happened in the page')
      })

      await step('Verify Manage Projects: Issues and Risks page loaded property', async function () {
        await manageProjects.tapProjectIssueAndRisk()
        await dispatch.waitForPageToBeLoaded()
        assert.isFalse(await wentwrong.isSomethingWentWrong(), 'Something went wrong happened in the page')
      })

      await step('Verify Manage Projects: Schedule View page loaded property', async function () {
        await manageProjects.tapProjectScheduleView()
        assert.isFalse(await wentwrong.isSomethingWentWrong(), 'Something went wrong happened in the page')
      })
    })
  })

  describe(`Acceptance Tests - Projects Reports Pages Verification on  - ${process.env.TEST_ENVIRONMENT.toUpperCase()}`, function () {
    it(`Projects Reports Pages Verification on  - ${process.env.TEST_ENVIRONMENT.toUpperCase()}`, async function () {
      await step('Tap Projects Reports', async function () {
        await mainPage.tapProjectReports()
        await dispatch.waitForPageToBeLoaded()
        await projectReport.isLoaded()
      })

      await step('Verify Project Report: Jobs By Country page loaded properly', async function () {
        await projectReport.tapProjectReportJobsByCountry()
        await dispatch.waitForPageToBeLoaded()
        assert.isFalse(await wentwrong.isSomethingWentWrong(), 'Something went wrong happened in the page')
      })

      await step('Verify Project Report: Missing PC reports page loaded properly', async function () {
        await projectReport.tapProjectReportPcMissingReport()
        await dispatch.waitForPageToBeLoaded()
        assert.isFalse(await wentwrong.isSomethingWentWrong(), 'Something went wrong happened in the page')
      })

      await step('Verify Project Report: Revenue by country page loaded properly', async function () {
        await projectReport.tapProjectReportRevenueByCountry()
        await dispatch.waitForPageToBeLoaded()
        assert.isFalse(await wentwrong.isSomethingWentWrong(), 'Something went wrong happened in the page')
      })

      await step('Verify Project Report: Revenue Report page loaded properly', async function () {
        await projectReport.tapProjectReportRevenue()
        await dispatch.waitForPageToBeLoaded()
        assert.isFalse(await wentwrong.isSomethingWentWrong(), 'Something went wrong happened in the page')
      })

      await step('Verify Project Report: Jobs Ready to be billed page loaded properly', async function () {
        await projectReport.tapProjectReportBillableJobs()
        await dispatch.waitForPageToBeLoaded()
        assert.isFalse(await wentwrong.isSomethingWentWrong(), 'Something went wrong happened in the page')
      })

      await step('Verify Project Report: Issue and Risk report page loaded properly', async function () {
        await projectReport.tapProjectReportRiskIssue()
        await dispatch.waitForPageToBeLoaded()
        assert.isFalse(await wentwrong.isSomethingWentWrong(), 'Something went wrong happened in the page')
      })

      await step('Verify Project Report: All assets report page loaded properly', async function () {
        await projectReport.tapProjectReportJobsAssets()
        await dispatch.waitForPageToBeLoaded()
        assert.isFalse(await wentwrong.isSomethingWentWrong(), 'Something went wrong happened in the page')
      })

      await step('Verify Project Report: Asset out report page loaded properly', async function () {
        await projectReport.tapProjectReportAssetOutReport()
        await dispatch.waitForPageToBeLoaded()
        assert.isFalse(await wentwrong.isSomethingWentWrong(), 'Something went wrong happened in the page')
      })

      await step('Verify Project Report: Standart report page loaded properly', async function () {
        await projectReport.tapProjectReportStandardReport()
        await dispatch.waitForPageToBeLoaded()
        assert.isFalse(await wentwrong.isSomethingWentWrong(), 'Something went wrong happened in the page')
      })
    })
  })
})
