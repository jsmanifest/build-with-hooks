import React from 'react'
import Context from './Context'
import styles from './styles.module.css'

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
      className={styles.pasteBin}
      rows={25}
      {...props}
    />
  )
}

export default PasteBin
