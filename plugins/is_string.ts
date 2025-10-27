const isString = (obj: any): boolean =>
  typeof obj === 'string' || obj instanceof String

export default defineNuxtPlugin(() => {
  return {
    provide: {
      isString,
    },
  }
})
