import React from 'react'
import { Modal } from 'semantic-ui-react'
import Button from './Button'
import Context from './Context'
import Provider from './Provider'
import PasteBin from './PasteBin'
import styles from './styles.module.css'

// Purposely call each fn without args since we don't need them
const callFns = (...fns) => () => fns.forEach((fn) => fn && fn())

const App = () => {
  const {
    modalOpened,
    slotifiedContent = [],
    slotify,
    onSave,
    openModal,
    closeModal,
    modalRef,
  } = React.useContext(Context)

  const ModalContent = ({ innerRef, ...props }) => (
    <div ref={innerRef} {...props} />
  )

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
        <Modal.Content as={ModalContent} innerRef={modalRef}>
          <Modal.Description>
            {slotifiedContent.map((content) => (
              <div style={{ whiteSpace: 'pre-line' }}>{content}</div>
            ))}
          </Modal.Description>
          <Modal.Actions>
            <Button type='button' onClick={onSave}>
              SAVE
            </Button>
            &nbsp;
            <Button type='button' onClick={closeModal}>
              CLOSE
            </Button>
            &nbsp;
          </Modal.Actions>
        </Modal.Content>
      </Modal>
      <PasteBin onSubmit={slotify} />
    </div>
  )
}

export default () => (
  <Provider>
    <App />
  </Provider>
)
