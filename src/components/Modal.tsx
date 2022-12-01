import React from 'react'
import { ReactComponent as Close } from '@assets/icons/Close.svg'
import classnames from 'classnames'
import { Values, VisibilityState } from '@types'
import { Button } from './Button'

interface ModalProps {
  visibility: VisibilityState
  values: Values
  setVisibility: (state: VisibilityState) => void
}

export function Modal ({ setVisibility, values, visibility }: ModalProps) {
  function handleClose () {
    setVisibility('hidden')
  }

  function handleFadeClick (e: any) {
    if (e.target.id === 'modal' && values.onFadeClick === 'close') {
      setVisibility('hidden')
    }
  }

  return (
    <div className={classnames('modal fade fixed top-0 left-0 w-full h-full flex justify-center items-center outline-none overflow-x-hidden overflow-y-auto bg-stone-800 bg-opacity-50', [visibility])}
      id="modal"
      tabIndex={-1}
      aria-labelledby="modal-label"
      aria-hidden="true"
      onClick={handleFadeClick}
    >
      <div className="w-[420px] modal-dialog relative pointer-events-none">
        <div
          className="modal-content border-none shadow-lg relative flex flex-col w-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current">
          <div className="modal-header flex flex-shrink-0 items-center justify-between p-4 shadow-sm rounded-t-md">
            <h5 className="text-sm font-bold leading-normal text-gray-800" id="modal-label">
              {values.header.title}
            </h5>
            {values.header.closable && (
              <button onClick={handleClose} className='w-8 h-8 rounded-full bg-slate-400 p-2'>
                <Close className='w-full h-full fill-white'/>
              </button>
            )}
          </div>
          <div className="modal-body flex justify-center px-0 py-4 text-base font-medium shadow-sm">
            {values.content}
          </div>
          <div className="modal-footer flex gap-[10px] flex-shrink-0 flex-wrap items-center justify-end p-4 rounded-b-md">
            <Button.Secondary
              className='small'
              title='Cancelar'
              onClick={handleClose}
            />
            {values.footer?.buttons}
          </div>
        </div>
      </div>
    </div>
  )
}
