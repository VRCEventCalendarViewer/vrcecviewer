import { Plugin } from '@nuxt/types'

declare module '@nuxt/types' {
  interface Context {
    $isString(obj: any): boolean
  }
}

const isString: Plugin = (context) => {
  context.$isString = (obj: any) =>
    typeof obj === 'string' || obj instanceof String
}

export default isString
