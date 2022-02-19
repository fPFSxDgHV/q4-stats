const dark = {
  header: '#172636',
  background: '#686F7E',
  subHeader: '#27303F',
  subBackground: '#686F7E',
  typography: {
    headerColor: '#fff',
    textColor: 'rgba(255, 255, 255, 0.5)',
    success: '#2DEB90',
    failure: '#ff5859',
    caution: '#FDB05F',
    ally: '#2aa3cc',
    enemy: '#ff5859',
    modalColor: '#3A4556',
    fontHeader: 'Open_Sans',
    fontText: 'Roboto',
  },
}

export class ThemeHelper {
  static getFontHeader(props) {
    return props?.theme?.typography?.fontHeader
  }

  static getHeaderColor(props) {
    return props?.theme?.typography?.headerColor
  }

  static getFontText(props) {
    return props?.theme?.typography?.fontText
  }

  static getModalColor(props) {
    return props?.theme?.typography?.modalColor
  }

  static getSubheaderColor(props) {
    return props?.theme?.subHeader
  }

  static getAllyColor(props) {
    return props?.theme?.typography?.ally
  }
}

export { dark }