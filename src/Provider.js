import React from 'react'
import Slot from './Slot'
import { attachSlots, isArray, isString, split } from './utils'
import Context from './Context'

const initialState = {
  slots: {}, // keys are slot indexes. values is an object with shape { quote, author }
  modalOpened: false,
  slotifiedContent: [],
  finalizedContent: null,
  drafting: true, // default
}

function reducer(state, action) {
  switch (action.type) {
    case 'set-slotified-content':
      return { ...state, slotifiedContent: action.content }
    default:
      return state
  }
}

function useSlotify() {
  const [state, dispatch] = React.useReducer(reducer, initialState)
  const textareaRef = React.useRef()

  const slotify = React.useCallback(
    function slotify() {
      let slotifiedContent, content
      if (textareaRef && textareaRef.current) {
        content = textareaRef.current.value
      }
      const slot = <Slot drafting={state.drafting} />
      if (content && isString(content)) {
        slotifiedContent = attachSlots(split(content), slot)
      } else if (isArray(content)) {
        slotifiedContent = attachSlots(content, slot)
      }
      dispatch({ type: 'set-slotified-content', content: slotifiedContent })
    },
    [state.drafting],
  )

  return {
    ...state,
    slotify,
    textareaRef,
  }
}

function Provider({ children }) {
  return <Context.Provider value={useSlotify()}>{children}</Context.Provider>
}

export default Provider
