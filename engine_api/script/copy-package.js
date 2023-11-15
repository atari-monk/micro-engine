const lib = require('./../../script/copy-package')

const projName = 'engine_api'
const sourceFile = `../${projName}/package.json`
const targetDir = `../${projName}/build`
const debug = false

const paths = lib.getPaths(sourceFile, targetDir)
if (debug) lib.printPaths(paths)
lib.copyFileToBuild(paths)
