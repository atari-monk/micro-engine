import ts from 'typescript'
import fs from 'fs'

function extractInterface(
  sourceFile: ts.SourceFile,
  className: string
): string | undefined {
  let interfaceText: string | undefined

  ts.forEachChild(sourceFile, (node) => {
    if (
      ts.isClassDeclaration(node) &&
      node.name &&
      node.name.text === className
    ) {
      const interfaceDeclaration = ts.factory.createInterfaceDeclaration(
        undefined,
        `I${className}`,
        undefined,
        undefined,
        node.members as unknown as readonly ts.TypeElement[]
      )

      interfaceText = ts
        .createPrinter()
        .printNode(ts.EmitHint.Unspecified, interfaceDeclaration, sourceFile)
    }
  })

  return interfaceText
}

function saveInterfaceToFile(interfaceText: string, outputPath: string): void {
  fs.writeFileSync(outputPath, interfaceText, 'utf-8')
}

function main() {
  const sourceFilePath =
    'C:/atari-monk/code/micro-engine/engine/src/utils/MapManager.ts' // Replace with your actual source file path
  const className = 'MapManager' // Replace with the name of the class for which you want to extract the interface
  const outputPath = `./I${className}.ts`

  const sourceCode = fs.readFileSync(sourceFilePath, 'utf-8')
  const sourceFile = ts.createSourceFile(
    sourceFilePath,
    sourceCode,
    ts.ScriptTarget.Latest
  )

  const interfaceText = extractInterface(sourceFile, className)

  if (interfaceText) {
    saveInterfaceToFile(interfaceText, outputPath)
    console.log(`Interface extracted and saved to ${outputPath}`)
  } else {
    console.error(`Class "${className}" not found in the source file.`)
  }
}

main()
