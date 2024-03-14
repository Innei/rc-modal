'use client'

import { motion } from 'framer-motion'
import type { ModalStackContainerProps } from '~/modal'
import type { PropsWithChildren } from 'react'

import { ModalStackContainer as MSC } from '~/modal'

export const ModalStackContainer = (
  props: PropsWithChildren & Omit<ModalStackContainerProps, 'm'>,
) => <MSC m={motion}>{props.children}</MSC>
