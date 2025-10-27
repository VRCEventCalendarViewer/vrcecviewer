import sanitizeHtml from 'sanitize-html'

const sanitize = (str: string) => {
  if (str == null) {
    return ''
  }
  return sanitizeHtml(str)
}

export default defineNuxtPlugin(() => {
  return {
    provide: {
      sanitize,
    },
  }
})
