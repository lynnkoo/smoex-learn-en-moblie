import * as React from 'react'
import uuidv4 from 'uuid/v4'
import { useLocation, withRouter } from 'react-router'

const TOGGLED_MODALES = {}

export function asModalProps(props: any) {
  return {
    isOpen: props.isOpen,
    onClose: props.onClose,
    onRemove: props.onRemove,
  }
}

export const ModalContext = React.createContext<any>(null)

function useUpdateModal(modalId: any, modal: any, deps: any[]) {
  const { updateModal } = React.useContext(ModalContext)
  React.useEffect(() => {
    if (modalId) {
      updateModal(modalId, modal)
    }
  }, [modalId, modal, ...deps])
}

export function useToggleModal(modal: any, deps: any = []) {
  const { showModal, closeModal } = React.useContext(ModalContext)
  const [activeModal, setActiveModal] = React.useState(null)
  const memoModal = React.useMemo(() => modal, deps)
  const toggleModal = React.useCallback(() => {
    if (activeModal && !TOGGLED_MODALES[activeModal]) {
      setActiveModal(null)
      closeModal(activeModal)
    } else {
      if (TOGGLED_MODALES[activeModal]) {
        delete TOGGLED_MODALES[activeModal]
      }
      const modalId = showModal(memoModal)
      setActiveModal(modalId)
    }
  }, [activeModal, ...deps])
  useUpdateModal(activeModal, memoModal, deps)
  return toggleModal
}

export function useModal(modal: any, deps: any = []) {
  const { showModal, closeModal } = React.useContext(ModalContext)
  const [activeModal, setActiveModal] = React.useState()
  const memoModal = React.useMemo(() => modal, deps)
  const onShowModal = React.useCallback(() => {
    const modalId = showModal(memoModal)
    setActiveModal(modalId)
  }, deps)
  const onCloseModal = React.useCallback(() => {
    setActiveModal(null)
    closeModal(activeModal)
  }, [activeModal])
  useUpdateModal(activeModal, memoModal, deps)
  return [onShowModal, onCloseModal]
}

export function cloneModalContent(children: any) {
  return React.cloneElement(children, {
    onClick: (e: React.MouseEvent) => {
      e.stopPropagation()
      const onChildClick = children.props.onClick
      if (onChildClick) {
        onChildClick()
      }
    },
  })
}

export const ModalLayer: React.FC<any> = (props) => {
  const { children } = props
  const { pathname } = useLocation()
  const [modalsMap, setModalsMap] = React.useState({})
  const [hiddenModals, setHiddenModals] = React.useState([])

  React.useEffect(() => {
    setModalsMap({})
  }, [pathname])

  const showModal = (modal: any, id?: any) => {
    const uuid = id || uuidv4()
    setModalsMap((modals) => ({ ...modals, [uuid]: modal }))
    return uuid
  }
  const removeModal = (uuid: any) => {
    setModalsMap((modals) => {
      if (modals[uuid]) {
        delete modals[uuid]
        return { ...modals }
      }
      return modals
    })
  }

  const closeModal = (uuid: any) => {
    setHiddenModals((x) => [...x, uuid])
  }

  const updateModal = (uuid: any, modal: any) => {
    setModalsMap((modals) => {
      if (modals[uuid]) {
        return { ...modals, [uuid]: modal }
      }
      return modals
    })
  }

  const onCloseBySelf = (key: any, modal: any) => () => {
    TOGGLED_MODALES[key] = modal
    closeModal(key)
  }

  const modalContext = { showModal, closeModal, removeModal, updateModal }
  return (
    <ModalContext.Provider value={modalContext}>
      {children}
      {Object.keys(modalsMap).map((key, i) => {
        return React.createElement(modalsMap[key], {
          key,
          isOpen: !hiddenModals.includes(key),
          onClose: onCloseBySelf(key, modalsMap[key]),
          onRemove: () => removeModal(key),
        })
      })}
    </ModalContext.Provider>
  )
}
