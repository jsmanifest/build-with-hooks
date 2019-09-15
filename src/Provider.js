import React from 'react'
import Slot from './Slot'
import { attachSlots, split } from './utils'
import Context from './Context'

const initialState = {
  slots: 0,
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
    case 'set-slots':
      return { ...state, slots: action.amount }
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

  function onSave() {
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
    const slot = <Slot />
    if (content && typeof content === 'string') {
      const setSlots = (amount) => dispatch({ type: 'set-slots', amount })
      slotifiedContent = attachSlots(split(content), slot, setSlots)
    }
    if (!state.drafting) {
      setDrafting(true)
    }
    dispatch({ type: 'set-slotified-content', content: slotifiedContent })
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
  }
}

function Provider({ children }) {
  return <Context.Provider value={useSlotify()}>{children}</Context.Provider>
}

export default Provider
