// @flow
import ExcelJs from 'exceljs'
import CommonUtils from '../../src/lib/CommonUtils'

const workbook = new ExcelJs.Workbook()
let workbookName
let worksheet
let text

export default {
  /**
   * Function to get cell data from given excel file and sheet and cell.
   * @param filename - Excel file name
   * @param sheetid - Excel file's worksheet id
   * @param cellId - Excel file's worksheet's cell if
   * @param retries - by default function run once but can be increase
   * @returns {Promise<*>} - return specified cell data (value)
   */
  async getCellData (filename: string, sheetid: number, cellId: string, retries: number = 1): Promise<any> {
    try {
      // $FlowIssue getting xlsx options as readFile method is a-ok
      workbookName = await workbook.xlsx.readFile(filename)
      worksheet = await workbookName.getWorksheet(sheetid)
      text = await worksheet.getCell(cellId).value
      return text
    } catch (err) {
      if (retries === 0) {
        throw new Error(`Cell ${cellId.toString()} value is not found`)
      }
      return this.getCellData(filename, sheetid, cellId, retries - 1)
    }
  },

  async getFormattedCellData (filename: string, sheetid: number, cellId: string, format: string, retries: number = 1): Promise<any> {
    try {
      workbookName = await workbook.xlsx.readFile(filename)
      worksheet = await workbookName.getWorksheet(sheetid)
      text = await worksheet.getCell(cellId).value
      return await CommonUtils.convertTo(text, format)
    } catch (err) {
      if (retries === 0) {
        throw new Error(`Cell ${cellId.toString()} value is not found`)
      }
      return this.getFormattedCellData(filename, sheetid, cellId, format, retries - 1)
    }
  },

  async setCellData (filename: string, sheetid: number, cellId: string, cellValue: string, retries: number = 1): Promise<any> {
    try {
      workbookName = await workbook.xlsx.readFile(filename)
      worksheet = await workbookName.getWorksheet(sheetid)
      worksheet.getCell(cellId).value = cellValue
      await workbook.xlsx.writeFile(filename)
    } catch (err) {
      if (retries === 0) {
        throw new Error(err.toString())
      }
      return this.setCellData(filename, sheetid, cellId, cellValue, retries - 1)
    }
  },

  async setCellDataMultiValue (filename: string, sheetid: number, cellArray: any): Promise<any> {
    try {
      workbookName = await workbook.xlsx.readFile(filename)
      worksheet = await workbookName.getWorksheet(sheetid)
      cellArray.forEach(cell => {
        worksheet.getCell(cell.id).value = cell.value
      })
      await workbook.xlsx.writeFile(filename)
      return true
    } catch (err) {
      throw new Error(err.message.toString())
    }
  },

  async setDataRow (filename: string, sheetid: number, rowValues: any, columnsMap: any): Promise<any> {
    try {
      workbookName = await workbook.xlsx.readFile(filename)
      worksheet = await workbookName.getWorksheet(sheetid)
      worksheet.spliceRows(1, 1)
      worksheet.columns = columnsMap
      worksheet.columns.forEach(column => {
        column.width = column.header.length < 12 ? 12 : column.header.length + 2
      })
      await worksheet.addRow(rowValues)
      await workbook.xlsx.writeFile(filename)
      return true
    } catch (err) {
      throw new Error(err.message)
    }
  },

  async getRowNumberByGivenCellValue (filename: string, sheetid: number, column: string, valueToSearch: string): Promise<any> {
    try {
      let row
      workbookName = await workbook.xlsx.readFile(filename)
      worksheet = await workbookName.getWorksheet(sheetid)
      let col = worksheet.getColumn(column)
      col.eachCell({includeEmpty: false}, function (cell, rowNumber) {
        if (cell.toString() === valueToSearch.toString()) {
          row = rowNumber
        }
      })
      return row
    } catch (err) {
      throw new Error(err.message)
    }
  }
}
