import { getTime } from '~/utils/index.js'

import './index.css'

export const date = getTime()
const test = () => {
  console.log('hello, rollup')
  console.log(date)
}
export { test, getTime }
