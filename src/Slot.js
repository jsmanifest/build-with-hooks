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

  const inputStyle = {
    border: 0,
    borderRadius: 4,
    background: 'none',
    fontSize: '1.2rem',
    color: '#fff',
    padding: '6px 15px',
    width: '100%',
    height: '100%',
    outline: 'none',
    marginRight: 4,
  }

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}
    >
      <input
        name='quote'
        type='text'
        placeholder='Insert a quote'
        onChange={onChange}
        value={quote}
        className={styles.slotQuoteInput}
        style={{ ...inputStyle, flexGrow: 1, flexBasis: '60%' }}
      />
      <input
        ref={authorRef}
        name='author'
        type='text'
        placeholder={!author ? 'Need an author!' : ''}
        onChange={onChange}
        value={author}
        className={styles.slotQuoteInput}
        style={{ ...inputStyle, flexBasis: '40%' }}
      />
    </div>
  )
}

function SlotStatic({ quote, author }) {
  // React.useEffect(() => {
  //   if (pendingCb) {
  //     console.log('invoking cb callback SlotStatic')
  //     cb.current()
  //   }
  // }, [pendingCb, cb])

  return (
    <div style={{ padding: '12px 0' }}>
      <h2 style={{ fontWeight: 700, color: '#2bc7c7' }}>{quote}</h2>
      <p
        style={{
          marginLeft: 50,
          fontStyle: 'italic',
          color: 'rgb(51, 52, 54)',
          opacity: 0.7,
          textAlign: 'right',
        }}
      >
        - {author}
      </p>
    </div>
  )
}

function Slot({ input = 'textfield' }) {
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
        staticComponent = <SlotStatic quote={quote} author={author} />
        break
      default:
        break
    }
  }

  return (
    <div
      style={{
        color: '#fff',
        borderRadius: 4,
        margin: '12px 0',
        outline: 'none',
        transition: 'all 0.2s ease-out',
        width: '100%',
        background: drafting
          ? 'rgba(175, 56, 90, 0.2)'
          : 'rgba(16, 46, 54, 0.02)',
        boxShadow: drafting
          ? undefined
          : '0 3px 15px 15px rgba(51, 51, 51, 0.03)',
        height: drafting ? 70 : '100%',
        minHeight: drafting ? 'auto' : 70,
        maxHeight: drafting ? 'auto' : 100,
        padding: drafting ? 8 : 0,
      }}
      className={cx({
        [styles.slotRoot]: drafting,
        [styles.slotRootStatic]: !drafting,
      })}
    >
      <div
        className={cx(styles.slotInnerRoot, {
          [styles.slotInnerRootStatic]: !drafting,
        })}
        style={{
          transition: 'all 0.2s ease-out',
          cursor: 'pointer',
          width: '100%',
          height: '100%',
          padding: '0 6px',
          borderRadius: 4,
          display: 'flex',
          alignItems: 'center',
          textTransform: 'uppercase',
          justifyContent: drafting ? 'center' : 'space-around',
          background: drafting
            ? 'rgba(100, 100, 100, 0.35)'
            : 'rgba(100, 100, 100, 0.05)',
        }}
      >
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
