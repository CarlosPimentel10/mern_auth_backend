import express from 'express'
import devBundle from './devBundle'
import path from 'path'

const app = express()
devBundle.compile(app)

const CURRENT_WORKING_DIR = process.cwd()
app.arguments('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist')))
