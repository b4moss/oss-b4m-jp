#!/usr/bin/env node
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const input = process.argv[2]

if (!input) {
  console.error('Usage: npx @b4moss/mpa-html-site-starter <project-name>')
  process.exit(1)
}

const targetDir = path.resolve(process.cwd(), input)
const packageName = path.basename(targetDir)

if (!/^(?:@[a-z0-9-~][a-z0-9-._~]*\/)?[a-z0-9-~][a-z0-9-._~]*$/.test(packageName)) {
  console.error(`Invalid project name: ${packageName}`)
  process.exit(1)
}

if (fs.existsSync(targetDir) && fs.readdirSync(targetDir).length > 0) {
  console.error(`Target directory is not empty: ${targetDir}`)
  process.exit(1)
}

const templateDir = path.resolve(__dirname, '../template')
fs.mkdirSync(targetDir, { recursive: true })
fs.cpSync(templateDir, targetDir, { recursive: true })

const gitignoreSrc = path.join(targetDir, '_gitignore')
if (fs.existsSync(gitignoreSrc)) {
  fs.renameSync(gitignoreSrc, path.join(targetDir, '.gitignore'))
}

const pkgPath = path.join(targetDir, 'package.json')
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'))
pkg.name = packageName
fs.writeFileSync(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`)

const cwd = process.cwd()
const displayPath = targetDir === cwd
  ? '.'
  : targetDir.startsWith(`${cwd}${path.sep}`)
    ? path.relative(cwd, targetDir)
    : targetDir

console.log(`\nScaffolded ${displayPath}\n`)
console.log('Next steps:')
console.log(`  cd ${displayPath}`)
console.log('  npm i')
console.log('  npm run dev\n')
