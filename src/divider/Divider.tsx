import React from 'react'
import type { DetailedHTMLProps, FC, HTMLAttributes } from 'react'

import { clsxm } from '~/lib/helper'

export const Divider: FC<
  DetailedHTMLProps<HTMLAttributes<HTMLHRElement>, HTMLHRElement>
> = (props) => {
  const { className, ...rest } = props
  return (
    <hr
      className={clsxm(
        'my-4 h-[0.5px] border-0 bg-black !bg-opacity-30 dark:bg-white',
        className,
      )}
      {...rest}
    />
  )
}
