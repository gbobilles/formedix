/* eslint-disable require-await */
/* eslint-disable no-console */
const allureReporter = require('@wdio/allure-reporter').default

const context = {
  stepTitle: undefined,
  duration: undefined,
  beforeStepFunction: async () => {},
  afterStepFunction: async () => {}
}

async function beforeStep (beforeStepBody) {
  context.beforeStepFunction = beforeStepBody
}

async function step (title, stepBody) {
  context.stepTitle = title
  await context.beforeStepFunction()
  allureReporter.startStep(title)
  console.log(`> ${title}`)
  const start = Date.now()
  await stepBody()
  const end = Date.now()
  context.duration = end - start
  allureReporter.endStep()
  await context.afterStepFunction()
}

function afterStep (afterStepBody) {
  context.afterStepFunction = afterStepBody
}

function addIssue (title) {
  allureReporter.addIssue(title)
}

function addDescription (description) {
  allureReporter.addDescription(description)
}

function addArgument (name, value) {
  allureReporter.addArgument(name, value)
}

export {
  context, step, beforeStep, afterStep, addIssue, addDescription, addArgument
}
