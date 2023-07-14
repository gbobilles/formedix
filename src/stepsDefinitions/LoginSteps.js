import LoginPage from '@page-objects/LoginPage'
import LoginClientPortal from '@page-objects/clientPortal/clientPortalLoginPage'
import CustomerTestData from '@input-data/CustomerTestData'
import allureReporter from '@wdio/allure-reporter'
import driverutils from '@core-libs/driver-utils'
import Dashboard from '@page-objects/clientPortal/clientPortalDashBoardPage'
import {step} from '@core-libs/AllurUtil'

const clienPortalDashboard = new Dashboard()
const loginpage = new LoginPage()
const PortalClientLogin = new LoginClientPortal()

export default class LoginSteps {
  async Corelogin (testTitle) {
    await step('Preparing test data', async function () {
      await driverutils.addAllureReport(allureReporter, __dirname, 'Dispatch Create new ticket', testTitle)
      await driverutils.goToHome()
      await loginpage.isLoaded()
    })

    await step('Sign in as exiting user', async function () {
      await loginpage.tapLoginButton()
      await loginpage.loginExistingUser(CustomerTestData.loginCredentials.username, CustomerTestData.loginCredentials.password)
    })
  }

  async ClientPortalLogin (testTitle) {
    await step('Preparing test data', async function () {
      let baseUrl = process.env.TEST_ENVIRONMENT === 'qa' ? 'https://qa-client.dispatch1.com/' : 'https://demo-client.dispatch1.com/'
      await driverutils.addAllureReport(allureReporter, __dirname, 'Client-Portal: Bulk Upload', testTitle)
      await driverutils.goToHome(baseUrl)
      await PortalClientLogin.isLoaded()
    })

    await step('Sign in as exiting user', async function () {
      await PortalClientLogin.loginExistingUser(CustomerTestData.clientPortalCredentials.username, CustomerTestData.clientPortalCredentials.password)
    })

    await step('Verify Client Portal Dashboard is loaded properly', async function () {
      await clienPortalDashboard.isLoaded()
    })
  }
}
