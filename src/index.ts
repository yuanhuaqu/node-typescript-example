import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { parse as json2csv } from 'json2csv'
import jsondata from './data/student.json'

dotenv.config()


async function main () {

   console.log(jsondata)
   const studentData = JSON.stringify(jsondata)
   fs.writeFileSync('report/student-2.json', studentData)
   await generateCsvReport('student-3.csv', jsondata)
}

main().then(() => process.exit()).catch(e => {
  console.error(e)
  process.exit(1)
})

async function generateCsvReport (fileName: string, jsondata: any) {

    // write the json data to file
    const fields = ['name', 'age', 'gender', 'department', 'car']
    console.log('jsondata', jsondata)
    await writeToFile(fileName, fields, jsondata)
}

async function writeToFile (fileName: string, fields: string[], data: any) {
  // output file in the same folder
  const filename = path.join(__dirname,'../report', `${fileName}`)
  let rows
  // If file doesn't exist, we will create new file and add rows with headers.
  if (!fs.existsSync(filename)) {
    console.log("data:", data)
    rows = json2csv(data, { header: true, fields: fields})
    console.log('rows:', rows)
  } else {
    // Rows without headers.
    rows = json2csv(data, { header: false })
  }

  // Append file function can create new file too.
  fs.appendFileSync(filename, rows)
  // Always add new line if file already exists.
  fs.appendFileSync(filename, '\r\n')
}
