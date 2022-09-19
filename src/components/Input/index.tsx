import React, { useEffect, useRef } from 'react'
import styles from './index.module.scss'
import classNames from 'classnames'

// Option1
// interface Props extends InputHTMLAttributes<HTMLInputElement> {
//   extra?: string
//   onExtraClick?: () => void
//   className?: string
//   autoFocus?: boolean
//   // 不需要从父类继承所有type，可以进行限制。
//   type?: 'text' | 'password'
// }

// Option2
// type Props = InputHTMLAttributes<HTMLInputElement> & {
type Props = Omit<
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
  'type'
> & {
  extra?: string
  onExtraClick?: () => void
  className?: string
  autoFocus?: boolean
  type?: 'text' | 'password'
}

export default function Input({
  extra,
  onExtraClick,
  className,
  autoFocus,
  ...rest
}: Props) {
  // focus
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    if (autoFocus) {
      inputRef.current!.focus()
    }
  }, [autoFocus])
  return (
    <div className={styles.root}>
      <input
        ref={inputRef}
        className={classNames('input', className)}
        {...rest}
      />
      {extra ? (
        <div className="extra" onClick={onExtraClick}>
          {extra}
        </div>
      ) : null}
    </div>
  )
}
