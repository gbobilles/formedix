// @flow
import MainPage from '@page-objects/MainPage'
import ProjectSetting from '@page-objects/projects/ProjectSettingPage'
import {step} from '@core-libs/AllurUtil'
import LoginSteps from '@step-objects/LoginSteps'

const loginSteps = new LoginSteps()
const mainPage = new MainPage()
const projectSetting = new ProjectSetting()

describe(`Error and incorrect wording when adding/editing Activity with 300 characters Display Name and Title on - ${process.env.TEST_ENVIRONMENT.toUpperCase()}`, function () {
  let testTitle = this.title
  it(`Error and incorrect wording when adding/editing Activity with 300 characters Display Name and Title on - ${process.env.TEST_ENVIRONMENT.toUpperCase()}`, async function () {
    await loginSteps.Corelogin(testTitle)

    step('Tap Project Settings', async function () {
      await mainPage.tapProjectSettings()
      await projectSetting.isLoaded()
    })

    step('Tap Project Activity', async function () {
      await projectSetting.tapProjectActity()
    })

    step('Tap Add Activity Button', async function () {
      await projectSetting.tapAddActivityButton()
    })
  })
})
