import cls from 'classnames'
import React from 'react'

const HeaderItem = ({
  href,
  active,
  utilClassNames,
  children,
  ...restProps
}) => {
  const classNames = cls('header__item', {
    'header__item--active': active,
    [`${utilClassNames}`]: utilClassNames,
  })

  return (
    <a className={classNames} href={href} {...restProps}>
      {children}
    </a>
  )
}

export default HeaderItem
