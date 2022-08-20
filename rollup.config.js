import fs from 'fs'
import path from 'path'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import commonjs from '@rollup/plugin-commonjs'
import typescript from 'rollup-plugin-ts'
import writeJson from 'write-json'

import styles from '@starleaguecompany/rollup-plugin-styles'

import pkg from './package.json'

function hash(str, seed = 0) {
  let l = str.length
  let h = seed ^ l
  let i = 0
  let k

  while (l >= 4) {
    k =
      (str.charCodeAt(i) & 0xff) |
      ((str.charCodeAt(++i) & 0xff) << 8) |
      ((str.charCodeAt(++i) & 0xff) << 16) |
      ((str.charCodeAt(++i) & 0xff) << 24)

    k = (k & 0xffff) * 0x5bd1e995 + ((((k >>> 16) * 0x5bd1e995) & 0xffff) << 16)
    k ^= k >>> 24
    k = (k & 0xffff) * 0x5bd1e995 + ((((k >>> 16) * 0x5bd1e995) & 0xffff) << 16)
    h = ((h & 0xffff) * 0x5bd1e995 + ((((h >>> 16) * 0x5bd1e995) & 0xffff) << 16)) ^ k
    l -= 4

    ++i
  }

  switch (l) {
    case 3:
      h ^= (str.charCodeAt(i + 2) & 0xff) << 16
      break
    case 2:
      h ^= (str.charCodeAt(i + 1) & 0xff) << 8
      break
    case 1:
      h ^= str.charCodeAt(i) & 0xff
      h = (h & 0xffff) * 0x5bd1e995 + ((((h >>> 16) * 0x5bd1e995) & 0xffff) << 16)
      break
  }

  h ^= h >>> 13
  h = (h & 0xffff) * 0x5bd1e995 + ((((h >>> 16) * 0x5bd1e995) & 0xffff) << 16)
  h ^= h >>> 15

  return (h >>> 0).toString(36)
}

const PACKAGES_DIR = './lib'
const OUTPUT = {
  cjs: {
    dir: './dist/cjs',
    entryFileNames: '[name]/index.js',
  },
  esm: {
    dir: './dist/esm',
    entryFileNames: '[name]/index.js',
  },
  types: {
    dir: './dist/types',
    fileName: '[name]/index.d.ts',
  },
}

const createEntriesFromFolder = pathToFolder => {
  const entriesDir = path.join(__dirname, pathToFolder)

  const entries = fs
    .readdirSync(entriesDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

  return entries.reduce((acc, folderName) => {
    return {
      ...acc,
      [`${folderName}`]: path.join(path.relative(__dirname, pathToFolder), folderName, 'index.ts'),
    }
  }, {})
}

const createPackagesJsons = entries => {
  Object.keys(entries).forEach(entry => {
    const packageFolder = path.join(__dirname, PACKAGES_DIR, entry)
    const main = path.relative(
      packageFolder,
      path.join(__dirname, OUTPUT.cjs.dir, 'components', OUTPUT.cjs.entryFileNames.replace('[name]', entry))
    )
    const module = path.relative(
      packageFolder,
      path.join(__dirname, OUTPUT.esm.dir, 'components', OUTPUT.esm.entryFileNames.replace('[name]', entry))
    )
    const types = path.relative(
      packageFolder,
      path.join(__dirname, OUTPUT.types.dir, 'components', OUTPUT.types.fileName.replace('[name]', entry))
    )

    writeJson.sync(path.join(packageFolder, 'package.json'), {
      name: `${pkg.name}/${entry}`,
      main: main,
      module: module,
      'jsnext:main': module,
      types: types,
      sideEffects: false,
    })
  })
}

const entries = createEntriesFromFolder('./src/components')

createPackagesJsons(entries)

export default {
  // input: entries,
  input: './src/index.ts',
  preserveModules: true,
  treeshake: false,
  external: id => !id.startsWith('\0') && !id.startsWith('.') && !id.startsWith('/'),
  output: [
    {
      dir: OUTPUT.cjs.dir,
      format: 'cjs',
      exports: 'named',
      sourcemap: true,
      banner: `/* ${pkg.name} version ${pkg.version} */`,
      // entryFileNames: OUTPUT.cjs.entryFileNames,
      // assetFileNames: 'assets/[name][extname]',
      // chunkFileNames: '[name]/index.js',
    },
    {
      dir: OUTPUT.esm.dir,
      format: 'esm',
      exports: 'named',
      sourcemap: true,
      banner: `/* ${pkg.name} version ${pkg.version} */`,
      // entryFileNames: OUTPUT.esm.entryFileNames,
      // assetFileNames: 'assets/[name][extname]',
      // chunkFileNames: '[name]-[hash].js',
    },
  ],
  plugins: [
    commonjs(),
    peerDepsExternal(),

    typescript({
      tsconfig: 'tsconfig.json',
      browserslist: false,
    }),

    styles({
      use: ['less'],
      extensions: ['.less'],
      mode: 'extract',
      modules: {
        generateScopedName: function (name, filename, css) {
          const i = css.indexOf('.' + name)
          const line = css.substr(0, i).split(/[\r\n]/).length

          return '_' + hash(filename + '_' + line + '_' + name)
        },
      },
    }),
  ],
}
