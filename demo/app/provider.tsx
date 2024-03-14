"use client"

import type { PropsWithChildren } from "react"
import { motion } from "framer-motion"
import { ModalStackContainer } from "~/modal"

export const Providers = (props: PropsWithChildren) => (
  <ModalStackContainer m={motion}>{props.children}</ModalStackContainer>
)
