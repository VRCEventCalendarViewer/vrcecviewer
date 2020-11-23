const sanitizeHtml = require('sanitize-html')

const sanitize = (str: string) => sanitizeHtml(str)

export default ({}, inject: any) => {
  inject('sanitize', sanitize)
}
