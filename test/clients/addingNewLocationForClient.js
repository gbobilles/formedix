// @flow
import { assert } from 'chai'
import allureReporter from '@wdio/allure-reporter'
import LoginPage from '@page-objects/LoginPage'
import driverutils from '@core-libs/driver-utils'
import CustomerTestData from '@input-data/CustomerTestData'
import DashBoard from '@page-objects/DashBoardPage'
import Clients from '@page-objects/ClientsPage'
import MainPage from '@page-objects/MainPage'
import {step} from '@core-libs/AllurUtil'

const loginpage = new LoginPage()
const dashboard = new DashBoard()
const clients = new Clients()
const mainPage = new MainPage()
describe(`Clients - Adding new location for clients on - ${process.env.TEST_ENVIRONMENT.toUpperCase()}`, function () {
  let testTitle = this.title

  it(`Clients - Adding new location for clients on - ${process.env.TEST_ENVIRONMENT.toUpperCase()}`, async function () {
    await step('Preparing test data', async function () {
      await driverutils.addAllureReport(allureReporter, __dirname, 'Adding new location for clients', testTitle)
      await driverutils.goToHome()
      await loginpage.isLoaded()
    })

    await step('Sign in as exiting user', async function () {
      await loginpage.tapLoginButton()
      await loginpage.loginExistingUser(CustomerTestData.loginCredentials.username, CustomerTestData.loginCredentials.password)
    })

    await step('Verify DashBoard page loaded property', async function () {
      await dashboard.isLoaded()
    })

    await step('Verify Clients page loaded property', async function () {
      await mainPage.tapClientsTab()
      await clients.isLoaded()
    })

    await step('Search client using search field and tap search icon', async function () {
      await clients.searchClientName('RetailNext')
      await clients.tapSearchIcon()
    })
  })
})
