const sanitizeHtml = require('sanitize-html')

const sanitize = (str: string) => {
  if (str == null) {
    return ''
  }
  return sanitizeHtml(str)
}

export default ({}, inject: any) => {
  inject('sanitize', sanitize)
}
