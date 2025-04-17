'use client'

import { m } from 'motion/react'
import React from 'react'
import type { ModalStackContainerProps } from '~/modal/index.js'
import type { FC, PropsWithChildren } from 'react'

import { ModalStackContainer as MSC } from '~/modal/index.js'

export const ModalStackContainer: FC<
  PropsWithChildren & Omit<ModalStackContainerProps, 'm'>
> = (props) => <MSC m={m}>{props.children}</MSC>
