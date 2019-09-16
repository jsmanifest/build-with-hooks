import React from 'react'
import Slot from './Slot'
import { attachSlots, split } from './utils'
import Context from './Context'

const initialState = {
  slotifiedContent: [],
  drafting: true,
  modalOpened: false,
}

function reducer(state, action) {
  switch (action.type) {
    case 'set-slotified-content':
      return { ...state, slotifiedContent: action.content }
    case 'set-drafting':
      return { ...state, drafting: action.drafting }
    case 'open-modal':
      return { ...state, modalOpened: true }
    case 'close-modal':
      return { ...state, modalOpened: false }
    default:
      return state
  }
}

function useSlotify() {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const textareaRef = React.useRef()
  const textareaUtils = React.useRef()
  const modalRef = React.useRef()
  const cb = React.useRef()
  const [pendingCb, setPendingCb] = React.useState(false)

  function onSave() {
    cb.current = function() {
      const html = modalRef.current.innerHTML
      const inputEl = document.createElement('textarea')
      document.body.appendChild(inputEl)
      inputEl.value = html
      inputEl.select()
      document.execCommand('copy')
      document.body.removeChild(inputEl)
    }
    setPendingCb(true)
    setDrafting(false)
  }

  function openModal() {
    dispatch({ type: 'open-modal' })
  }

  function closeModal() {
    dispatch({ type: 'close-modal' })
  }

  function setDrafting(drafting) {
    if (typeof drafting !== 'boolean') return
    dispatch({ type: 'set-drafting', drafting })
  }

  function slotify() {
    let slotifiedContent, content
    if (textareaRef && textareaRef.current) {
      textareaUtils.current.copy()
      content = textareaUtils.current.getText()
    }
    if (content && typeof content === 'string') {
      const slot = <Slot />
      slotifiedContent = attachSlots(split(content), slot)
    }
    if (!state.drafting) {
      setDrafting(true)
    }
    dispatch({ type: 'set-slotified-content', content: slotifiedContent })
  }

  function onCopyFinalContent() {
    const html = modalRef.current.innerHTML
    const inputEl = document.createElement('textarea')
    document.body.appendChild(inputEl)
    inputEl.value = html
    inputEl.select()
    document.execCommand('copy')
    document.body.removeChild(inputEl)
  }

  return {
    ...state,
    slotify,
    onSave,
    setDrafting,
    textareaRef,
    textareaUtils,
    openModal,
    closeModal,
    modalRef,
    onCopyFinalContent,
    cb,
    pendingCb,
    setPendingCb,
  }
}

function Provider({ children }) {
  return <Context.Provider value={useSlotify()}>{children}</Context.Provider>
}

export default Provider
