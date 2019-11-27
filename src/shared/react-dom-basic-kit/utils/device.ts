const mobileRegexp = /ipad|iphone|midp|rv:1.2.3.4|ucweb|android|windows ce|windows mobile/

export const IS_MOBILE = mobileRegexp.test(navigator.userAgent.toLowerCase())

export enum BrowserType {
  IE = 'IE',
  Edge = 'Edge',
  Firefox = 'Firefox',
  Opera = 'Opera',
  Safari = 'Safari',
  Chrome = 'Chrome',
}

function getBrowserInfo() {
  let type: BrowserType
  let match: RegExpMatchArray | null
  const userAgent = navigator.userAgent
  if (userAgent.includes('Opera')) {
    type = BrowserType.Opera
    match = userAgent.match(/Opera.([\d.]+)/)
  } else if (userAgent.includes('MSIE') || userAgent.includes('Trident')) {
    type = BrowserType.IE
    match = userAgent.match(/MSIE ([\d.]+)/) || userAgent.match(/rv:([\d.]+)/)
  } else if (userAgent.includes('Edge')) {
    type = BrowserType.Edge
    match = userAgent.match(/Edge\/([\d.]+)/)
  } else if (userAgent.includes('Firefox')) {
    type = BrowserType.Firefox
    match = userAgent.match(/Firefox\/([\d.]+)/)
  } else if (userAgent.includes('Safari') && !userAgent.includes('Chrome')) {
    type = BrowserType.Safari
    match = userAgent.match(/Version\/([\d.]+)/)
  } else if (userAgent.includes('Chrome') && userAgent.includes('Safari')) {
    type = BrowserType.Chrome
    match = userAgent.match(/Chrome\/([\d.]+)/)
  }
  return { type, version: match ? parseInt(match[1]) : -1 }
}

export function isEdgeOrIE(): boolean {
  const type = BROWSER_INFO.type
  return type === BrowserType.IE || type === BrowserType.Edge
}

export const BROWSER_INFO = getBrowserInfo()
