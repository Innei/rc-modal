'use client'

import React from 'react'
import { motion } from 'framer-motion'
import type { ModalStackContainerProps } from '~/modal'
import type { FC, PropsWithChildren } from 'react'

import { ModalStackContainer as MSC } from '~/modal'

export const ModalStackContainer: FC<
  PropsWithChildren & Omit<ModalStackContainerProps, 'm'>
> = (props) => <MSC m={motion}>{props.children}</MSC>
