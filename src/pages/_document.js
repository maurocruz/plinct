import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <link
            rel="shortcut icon"
            type="image/png"
            href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAQAAADZc7J/AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QA/4ePzL8AAAAJcEhZcwAADdcAAA3XAUIom3gAAAAHdElNRQfjBQgRJSiR8tVJAAACEElEQVRIx4WV204TURSGP1t6gk5LW00wHq/0vYwnBG1iYgoUhEZUbIKSEBNGPMV4541Go6+g976GaUtPTDuwvZhpO4e1p+tqkn++f9asvfZacfxRxOQ6vzlFjiIm1/ij0+c5wKbJEjMa3cSmwSJxSS5wyAkKxRFlwWKit1gO60XeubJC0eYhiQi9xX2/RZH3Hlmh6PCI5Fgv8SGg+7Is8TEgKxRdVlyLs6LepuxkWeCTICsUPaqkSGNyKupttmJAknPExKpnWKdCnL90RD3FgvNwlV/iFxSKPjXmWKIVUixeYIy8rvBTa3HMNlkWaQbwHWa96Vzmh9bC4jlZ7nosLJ75cYBLfI+wqGNwm8Y4p4xUlIt801oM2CXHTRpYPJFxgAt81RyZYsgeeW6wSpqIOB9RC5uXpDnjfT18/rb2KsOQhsh4osRn7S/02cCgwqa+Anneapp6hK/Rx+KpbJFlH1uLr2NQpafvggx1Bhq8RxWDDfr6PkxRw4rEH3vw0U2YG+EJVtzkJHyNHFsB3GmtunOZ4pTpROAGNY413WlCjFvCVZ3gSWY51BztEZuwzD8tvuqOtFJoYjr4AxLwRePeHeMQnMkO7s7lhSkDdRSTraAIbIawexgHmOeN22hN7vl3UwHT04NdKgLuWBxwQlNabXleM5yCO+/tckfejAavGND27SMpZvzzwBs5TLan4KH4D3okBa118OipAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE5LTA1LTA4VDE3OjM3OjQwLTA0OjAw37jvHAAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOS0wNS0wOFQxNzozNzo0MC0wNDowMK7lV6AAAAAASUVORK5CYII="
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument
