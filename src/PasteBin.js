import React from 'react'
import Context from './Context'

function PasteBin(props) {
  const { textareaRef, textareaUtils } = React.useContext(Context)

  React.useImperativeHandle(textareaUtils, () => ({
    copy: () => {
      textareaRef.current.select()
      document.execCommand('copy')
      textareaRef.current.blur()
    },
    getText: () => {
      return textareaRef.current.value
    },
  }))

  return (
    <textarea
      ref={textareaRef}
      style={{
        width: '100%',
        margin: '12px 0',
        outline: 'none',
        padding: 12,
        border: '2px solid #eee',
        color: '#666',
        borderRadius: 4,
      }}
      rows={25}
      {...props}
    />
  )
}

export default PasteBin
