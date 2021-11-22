const OFF = 0
const ERROR = 2

module.exports = {
  extends: [
    'next/core-web-vitals'
  ],
  rules: {
    'import/no-anonymous-default-export': [OFF]
  }
}
