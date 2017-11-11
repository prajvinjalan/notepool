export default {
  universal: {
    container: {
      padding: 16,
      background: '#f9f9f9',
      textAlign: 'center',
      height: '70px'
    },
    footer: {
      bottom: '0',
      width: '100%'
    },
    formGroup: {
      position: 'relative'
    },
    formLabel: {
      position: 'absolute',
      margin: '10px'
    },
    loading: {
      width: '48px',
      margin: '0 auto',
      paddingTop: '100px'
    },
    title: {
      margin: 0,
      textDecoration: 'none'
    }
  },
  logreg: {
    container: {
      margin: '30px auto',
      padding: '30px 40px',
      width: '600px',
      border: '1px solid #ddd',
      bottom: {
        textAlign: 'center'
      }
    },
    formInput: {
      paddingLeft: '85px',
      height: '40px'
    },
    header: {
      textAlign: 'center'
    },
    paragraph: {
      marginBottom: '2rem',
      textAlign: 'center'
    },
    socialWrapper: {
      margin: '15px 0',
      textAlign: 'center',
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr'
    }
  },
  navbar: {
    width: '100%',
    borderBottom: '1px solid #ddd',
    borderTop: '1px solid #ddd'
  },
  note: {
    body: {
      whiteSpace: 'pre-wrap',
      wordWrap: 'break-word'
    },
    bodyInput: {
      paddingLeft: '55px',
      paddingTop: '10px',
      minHeight: '100px',
      maxHeight: '200px',
      minWidth: '100%',
      maxWidth: '100%'
    },
    container: {
      padding: 16,
      background: '#f9f9f9',
      border: '1px solid #ddd',
      display: 'grid',
      gridTemplateRows: '[row-start] 2fr [row-2] 1fr [row-end]',
      gridTemplateColumns: '[column-start] 3fr [column-2] 1fr [column-end]'
    },
    colourButton: {
      borderRadius: '50%',
      border: '1px solid #888',
      width: '30px',
      height: '30px',
      margin: '4px',
      outline: 'none'
    },
    formInput: {
      paddingLeft: '55px',
      height: '40px'
    },
    header: {
      marginTop: 0,
      marginBottom: 0
    },
    list: {
      listStyleType: 'none'
    },
    roundedButton: {
      borderRadius: '50%',
      border: '1px solid #888',
      width: '20px',
      height: '20px',
      outline: 'none',
      padding: '0'
    },
    title: {
      textDecoration: 'none',
      color: 'red'
    }
  }
}
