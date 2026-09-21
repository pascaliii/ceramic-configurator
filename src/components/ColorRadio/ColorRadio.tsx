import cls from 'classnames'
import type { ReactNode } from 'react'
import ColorRadioItem from './ColorRadioItem'

interface ColorRadioProps {
  children: ReactNode
  utilClassNames?: string
}

const ColorRadio = ({ children, utilClassNames }: ColorRadioProps) => {
  const classNames = cls('color-radio', {
    [`${utilClassNames}`]: utilClassNames,
  })

  return <div className={classNames}>{children}</div>
}

ColorRadio.Item = ColorRadioItem

export default ColorRadio
