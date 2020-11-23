/**
 * ref. http://ginpei.hatenablog.com/entry/20070811/1186846446
 */

const autoLink = (str: string) => {
  if (str == null) {
    return ''
  }

  const regexpUrl = /((h?)(ttps?:\/\/[a-zA-Z0-9.\-_@:/~?%&;=+#',()*!]+))/g
  const regexpMakeLink = function (
    _all: string,
    url: string,
    _h: string,
    href: string
  ) {
    return '<a href="h' + href + '" target="_blank">' + url + '</a>'
  }

  return str.replace(regexpUrl, regexpMakeLink)
}

export default ({}, inject: any) => {
  inject('auto_link', autoLink)
}
