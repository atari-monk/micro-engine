const fs = require('fs')
const path = require('path')

function getPaths(sourceFile, targetDir) {
  const dirname = __dirname
  const dirname_resolve = path.resolve(dirname, '.')

  const sourcePath = path.join(dirname_resolve, sourceFile)

  const targetPath = path.join(
    dirname_resolve,
    targetDir,
    path.basename(sourceFile)
  )

  return {
    dirname_resolve: dirname_resolve,
    sourcePath: sourcePath,
    targetPath: targetPath,
  }
}

function printPaths(paths) {
  console.log('dirname_resolve:', paths.dirname_resolve)
  console.log('sourcePath:', paths.sourcePath)
  console.log('targetPath:', paths.targetPath)
}

function copyFileToBuild(paths) {
  if (!fs.existsSync(path.dirname(paths.targetPath))) {
    fs.mkdirSync(path.dirname(paths.targetPath), { recursive: true })
  }

  fs.copyFileSync(paths.sourcePath, paths.targetPath)

  console.log(`Copied ${paths.sourcePath} to ${paths.targetPath}`)
}

module.exports = { getPaths, printPaths, copyFileToBuild }
