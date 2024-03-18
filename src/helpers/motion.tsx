'use client'

import React from 'react'
import { motion } from 'framer-motion'
import type { ModalStackContainerProps } from '~/modal/index.js'
import type { FC, PropsWithChildren } from 'react'

import { ModalStackContainer as MSC } from '~/modal/index.js'

export const ModalStackContainer: FC<
  PropsWithChildren & Omit<ModalStackContainerProps, 'm'>
> = (props) => <MSC m={motion}>{props.children}</MSC>
