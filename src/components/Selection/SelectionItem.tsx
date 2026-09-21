import cls from 'classnames'
import type { ReactNode, HTMLAttributes } from 'react'

interface SelectionItemProps extends HTMLAttributes<HTMLLIElement> {
  icon: string
  children: ReactNode
  utilClassNames?: string
}

const SelectionItem = ({ icon, children, utilClassNames, ...restProps }: SelectionItemProps) => {
  const classNames = cls('selection__item', {
    [`${utilClassNames}`]: utilClassNames,
  })

  return (
    <li className={classNames} {...restProps}>
      <svg>
        <use href={`/sprite.svg#${icon}`} />
      </svg>
      {children}
    </li>
  )
}

export default SelectionItem
