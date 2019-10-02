import { useEffect, MouseEvent } from 'react'

export const useOutsideClick = (ref: React.RefObject<HTMLElement>, callback: () => void) => {

  const handleClick: EventListener = (e) => {
    if (ref.current && !ref.current.contains(e.target as Node))
      callback()
  }

  useEffect(() => {

    document.addEventListener('click', handleClick)

    return () => document.removeEventListener('click', handleClick)
  })

}