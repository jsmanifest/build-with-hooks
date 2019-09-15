import React from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import Context from './Context'
import styles from './styles.module.css'

function SlotDrafting({ quote, author, onChange }) {
  const authorRef = React.createRef()

  React.useLayoutEffect(() => {
    const elem = authorRef.current
    if (!author) {
      elem.classList.add(styles.slotQuoteInputAttention)
    } else if (author) {
      elem.classList.remove(styles.slotQuoteInputAttention)
    }
  }, [author, authorRef])

  return (
    <div className={styles.slotQuoteInputs}>
      <input
        name='quote'
        className={styles.slotQuoteInput}
        type='text'
        placeholder='Insert a quote'
        style={{ flexGrow: 1, flexBasis: '60%' }}
        onChange={onChange}
        value={quote}
      />
      <input
        ref={authorRef}
        name='author'
        className={styles.slotQuoteInput}
        type='text'
        placeholder={!author ? 'Need an author!' : ''}
        style={{ flexBasis: '40%' }}
        onChange={onChange}
        value={author}
      />
    </div>
  )
}

function SlotStatic({ quote, author }) {
  return (
    <div className={styles.slotQuoteStatic}>
      <div className={styles.slotQuoteStaticAuthor}>{author}</div>
      <div className={styles.slotQuoteStaticQuote}>{quote}</div>
    </div>
  )
}

function Slot({ input = 'textfield', staticValues }) {
  const [quote, setQuote] = React.useState('')
  const [author, setAuthor] = React.useState('')
  const { drafting } = React.useContext(Context)

  function onChange(e) {
    if (e.target.name === 'quote') {
      setQuote(e.target.value)
    } else {
      setAuthor(e.target.value)
    }
  }

  let draftComponent, staticComponent

  if (drafting) {
    switch (input) {
      case 'textfield':
        draftComponent = (
          <SlotDrafting onChange={onChange} quote={quote} author={author} />
        )
        break
      default:
        break
    }
  } else {
    switch (input) {
      case 'textfield':
        staticComponent = <SlotStatic {...staticValues} />
        break
      default:
        break
    }
  }

  return (
    <div className={cx(styles.slotQuoteContainer, styles.slotStyle)}>
      <div className={styles.slotQuoteInner}>
        {drafting ? draftComponent : staticComponent}
      </div>
    </div>
  )
}

Slot.defaultProps = {
  slot: true,
}

Slot.propTypes = {
  input: PropTypes.oneOf(['textfield']),
}

export default Slot
