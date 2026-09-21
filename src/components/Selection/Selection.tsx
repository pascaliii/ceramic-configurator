import cls from 'classnames'
import type { ReactNode, HTMLAttributes } from 'react'
import SelectionItem from './SelectionItem'
import SelectionSpace from './SelectionSpace'

interface SelectionProps extends HTMLAttributes<HTMLDivElement> {
  headline: string
  children: ReactNode
  utilClassNames?: string
}

const Selection = ({ headline, children, utilClassNames, ...restProps }: SelectionProps) => {
  const classNames = cls('selection', {
    [`${utilClassNames}`]: utilClassNames,
  })

  return (
    <div className={classNames} {...restProps}>
      <h3 className='selection__headline'>{headline}</h3>
      <ul className='selection__list'>{children}</ul>
    </div>
  )
}

Selection.Item = SelectionItem
Selection.Space = SelectionSpace

export default Selection
