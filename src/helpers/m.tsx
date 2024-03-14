'use client'

import { m } from 'framer-motion'
import type { PropsWithChildren } from 'react'

import { ModalStackContainer as MSC } from '~/modal'

export const ModalStackContainer = (props: PropsWithChildren) => (
  <MSC m={m}>{props.children}</MSC>
)
