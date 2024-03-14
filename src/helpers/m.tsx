'use client'

import { m } from 'framer-motion'
import type { ModalStackContainerProps } from '~/modal'
import type { PropsWithChildren } from 'react'

import { ModalStackContainer as MSC } from '~/modal'

export const ModalStackContainer = (
  props: PropsWithChildren & Omit<ModalStackContainerProps, 'm'>,
) => <MSC m={m}>{props.children}</MSC>
