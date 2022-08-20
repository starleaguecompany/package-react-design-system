import { readFileSync } from 'fs'
import { join } from 'path'
import React from 'react'
import Document, {Html, Head, Main, NextScript, DocumentContext} from 'next/document'

type FileProps = {
  assetPrefix: string
  file: string
  nonce?: string
}

const InlineStyle = ({ assetPrefix, file, nonce }: FileProps): JSX.Element => {
  const cssPath = join(process.cwd(), '.next', file)
  const cssSource = readFileSync(cssPath, 'utf-8')
  const html = { __html: cssSource }
  const id = `${assetPrefix}/_next/${file}`

  return <style dangerouslySetInnerHTML={html} data-href={id} nonce={nonce} />
}

export class CriticalCssHead extends Head {
  getCssLinks({ allFiles }: { allFiles: readonly string[] }): JSX.Element[] | null {
    const {
      props: { nonce },
      context: {
        __NEXT_DATA__: { assetPrefix = '' },
      },
    } = this

    const isCss = (file: string) => /\.css$/.test(file)
    const renderCss = (file: string) => <InlineStyle key={file} file={file} nonce={nonce} assetPrefix={assetPrefix} />

    return allFiles && allFiles.length > 0 ? allFiles.filter(isCss).map(renderCss) : null
  }
}

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return {...initialProps}
  }

  render() {
    return (
      <Html lang="ru" data-theme="lager">
        <CriticalCssHead />
        <body>
        <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
