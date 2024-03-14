'use client'

import { motion } from 'framer-motion'
import type { PropsWithChildren } from 'react'

import { ModalStackContainer as MSC } from '~/modal'

export const ModalStackContainer = (props: PropsWithChildren) => (
  <MSC m={motion}>{props.children}</MSC>
)
