import Dispatch from '@page-objects/dispatch/DispatchPage'
import Project from '@page-objects/projects/ManageProjectPage'
import MainPage from '@page-objects/MainPage'
import WentWrong from '@page-objects/somethingwentwrong/SomethingWentWrongPage'
import {step} from '@core-libs/AllurUtil'
import { assert } from 'chai'

const dispatch = new Dispatch()
const project = new Project()
const mainPage = new MainPage()
const wentwrong = new WentWrong()
const bulkUpload = dispatch.bulkUploadSteps
const addproject = project.addProject

export default class DispatchCore {
  async dispatchBulkUpload () {
    await step('Tap Dispatch Bulk Work', async function () {
      await mainPage.tapBulkUpload()
      await bulkUpload.isLoaded()
      await dispatch.waitForPageToBeLoaded()
    })

    await step('Tap Bulk Dispatch Upload', async function () {
      await bulkUpload.tapBulkUploadDispath()
      await dispatch.waitForPageToBeLoaded()
      assert.isFalse(await wentwrong.isSomethingWentWrong(), 'Something went wrong happened in the page')
    })

    await step('Browse and upload a dispatch bukl work', async function () {
      await bulkUpload.uploadBulkDispatch()
      await dispatch.waitForPageToBeLoaded()
    })

    await step('Tap Upload Button and validate sucessful message', async function () {
      await bulkUpload.tapUploadButton()
      await dispatch.waitForPageToBeLoaded()
      if (process.env.TEST_ENVIRONMENT === 'qa') {
        assert.strictEqual(await bulkUpload.getTotalNumberJobsUploaded(), 'Total Jobs: 11', 'The total number of jobs uploaded was correct')
        assert.strictEqual(await bulkUpload.getTotalJobsSuccessfullyUploaded(), 'Successfull: 11', 'The total number of jobs uploaded seccessfully was correct')
        assert.strictEqual(await bulkUpload.getTotalJobsUploadedWithNoMatch(), 'No Matches: 0', 'The total number of jobs uploaded with no match was correct')
        assert.strictEqual(await bulkUpload.getTotalNumberJobsUploadedFailed(), 'Failed: 0', 'The total number of jobs uploaded failed correct')
      } else {
        assert.strictEqual(await bulkUpload.getTotalNumberJobsUploaded(), 'Total Jobs: 7', 'The total number of jobs uploaded was correct')
        assert.strictEqual(await bulkUpload.getTotalJobsSuccessfullyUploaded(), 'Successfull: 7', 'The total number of jobs uploaded seccessfully was correct')
        assert.strictEqual(await bulkUpload.getTotalJobsUploadedWithNoMatch(), 'No Matches: 0', 'The total number of jobs uploaded with no match was correct')
        assert.strictEqual(await bulkUpload.getTotalNumberJobsUploadedFailed(), 'Failed: 0', 'The total number of jobs uploaded failed correct')
      }
    })

    await step('Tap OK button', async function () {
      await bulkUpload.tapOKButton()
      await dispatch.waitForPageToBeLoaded()
      assert.isFalse(await wentwrong.isSomethingWentWrong(), 'Something went wrong happened in the page')
    })
  }

  async createNewDispatch () {
    await step('Tap Manage Dispatch', async function () {
      await mainPage.tapManageDispatch()
      await dispatch.isLoaded()
    })

    await step('Tap Add Ticket button', async function () {
      await dispatch.tapAddNewTicketButton()
      await dispatch.waitForPageToBeLoaded()
      assert.isFalse(await wentwrong.isSomethingWentWrong(), 'Something went wrong happened in the page')
    })

    await step('Select Client', async function () {
      await dispatch.selectClient(['Coates Group', 'RetailNext'])
    })

    await step('add client purchase order', async function () {
      await dispatch.addClientPO()
    })

    await step('add client work order', async function () {
      await dispatch.addClientWO()
    })

    await step('Select End Client', async function () {
      await dispatch.selectEndClient([`Mcdonald's`, 'Under Armor'])
    })

    await step('Select Client Contact', async function () {
      await dispatch.selectClientContact([`Gabriel Hernandez (Dispatches)`, 'Donald Marvin'])
    })

    await step('Select Client Country', async function () {
      await dispatch.selectClientCountry(`United States`)
    })

    await step('Select Client Location Name', async function () {
      await dispatch.selectClienLocation([` Libby, MT ||905 Louisiana Avenue|Libby|MT|United States`, 'Tysons, VA||7977 Tysons Corner Center|Tysons|VA |United States'])
    })

    await step('Add Dispatch Issue', async function () {
      await dispatch.addDispatchIssue()
    })

    await step('Add Scopre of Work', async function () {
      await dispatch.addDispatchScoreOfWord()
    })

    await step('Select Ticket Problem Code', async function () {
      await dispatch.selectDispatchProblemCode()
    })

    await step('Select Technician Level', async function () {
      await dispatch.selectDispatchTechLevel()
    })

    await step('Select Number of Technician Needed', async function () {
      await dispatch.selectDispatchTechNeed(2)
      await dispatch.tapDispatchAddTecheButton()
    })

    await step('Select Response catergory', async function () {
      await dispatch.selectDispatchCategotyCode()
    })

    await step('Add NSN custome field', async function () {
      if (process.env.TEST_ENVIRONMENT === 'qa') await dispatch.addNSNDetails()
    })

    await step('Add Dispatch Required Tool', async function () {
      await dispatch.addDispatchRequiredTool()
    })

    await step('Tap Save Button', async function () {
      await dispatch.tapDispatchSaveButton()
      await dispatch.isLoaded()
    })
  }

  async projectCreation () {
    await step('Tap Manage Project', async function () {
      await mainPage.tapManageProjects()
      await project.isLoaded()
    })

    await step('Tap Add Project button', async function () {
      await project.tapAddProjectButton()
      await addproject.isLoaded()
      assert.isFalse(await wentwrong.isSomethingWentWrong(), 'Something went wrong happened in the page')
    })

    await step('Add Project Title', async function () {
      await addproject.addProjectTitle()
    })

    await step('Add Project Overview', async function () {
      await addproject.addProjectOverview()
    })

    await step('Select Client', async function () {
      await addproject.selectClient(['Pitney Bowes'])
    })

    await step('Select End Client', async function () {
      await addproject.selectEndClient(['American Locker'])
    })

    await step('Select Project Status', async function () {
      await addproject.selectProjectStatus(['In Progress'])
    })

    await step('Select Project Catergory', async function () {
      await addproject.selectProjectCategory(['Network'])
    })

    await step('Select Project Type', async function () {
      await addproject.selectProjectType(['Rollout'])
    })

    await step('Add Project Overview', async function () {
      await addproject.addProjectScopeOfWork()
    })

    await step('Tap Next Button', async function () {
      await addproject.tapNextButton()
    })

    await step('Tap Add Activities', async function () {
      await addproject.tapAddActivitiestButton()
    })

    await step('Select Activities', async function () {
      await addproject.selectActivities(2)
    })

    await step('Tap Add Button and Tap Next Button', async function () {
      await addproject.tapAddButton()
    })

    await step('Tap Add Project', async function () {
      await addproject.tapAddProjectButton()
      assert.isTrue(await addproject.isSuccessMessageDisplayed(), 'Message success was not displayed')
      await addproject.tapOKButton()
    })
  }
}
