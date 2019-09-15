import React from 'react'
import { Modal } from 'semantic-ui-react'
import Button from './Button'
import Context from './Context'
import Provider from './Provider'
import PasteBin from './PasteBin'
import Slot from './Slot'
import styles from './styles.module.css'

// Purposely call each fn without args since we don't need them
const callFns = (...fns) => () => fns.forEach((fn) => fn && fn())

const App = () => {
  const {
    modalOpened,
    slotifiedContent = [],
    drafting,
    slotify,
    onSave,
    openModal,
    closeModal,
  } = React.useContext(Context)

  return (
    <div className={styles.container}>
      <Modal
        open={modalOpened}
        trigger={
          <Button type='button' onClick={callFns(slotify, openModal)}>
            Start Quotifying
          </Button>
        }
        className={styles.modal}
      >
        <Modal.Content>
          <Modal.Description>
            {slotifiedContent.map((content) => (
              <div style={{ whiteSpace: 'pre-line' }}>{content}</div>
            ))}
          </Modal.Description>
          <Modal.Actions>
            <Button type='button' onClick={callFns(onSave, closeModal)}>
              SAVE
            </Button>
          </Modal.Actions>
        </Modal.Content>
      </Modal>
      <PasteBin onSubmit={slotify} />
      {!drafting &&
        slotifiedContent.map((content) => {
          if (React.isValidElement(content)) {
            if (content.props.slot) {
              return React.cloneElement(content, {
                className: styles.slotQuoteStatic,
              })
            }
          }
          console.log(content)
          return content
        })}
    </div>
  )
}

export default () => (
  <Provider>
    <App />
  </Provider>
)
