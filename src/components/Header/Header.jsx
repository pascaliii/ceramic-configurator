import cls from 'classnames'
import React from 'react'
import HeaderItem from './HeaderItem'

const Header = ({
  title,
  fullwidth,
  utilClassNames,
  children,
  ...restProps
}) => {
  const classNames = cls('header', {
    'header--fullwidth': fullwidth,
    [`${utilClassNames}`]: utilClassNames,
  })

  return (
    <div className={classNames} {...restProps}>
      <h1 className='header__title'>{title}</h1>
      <div className='header__item-wrapper'>{children}</div>
    </div>
  )
}

Header.Item = HeaderItem

export default Header
