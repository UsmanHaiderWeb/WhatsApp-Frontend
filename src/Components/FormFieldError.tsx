import React, { memo } from 'react'

const FormFieldError = ({error, styles}: {error: string, styles?: string}) => {
  return (
    <div className={`text-[orangered] text-[13px] ${styles}`}>{error}</div>
  )
}

export default memo(FormFieldError)