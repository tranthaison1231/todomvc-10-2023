import { useEffect, useState } from 'react'

export const useHash = () => {
  const [hash, setHash] = useState(() => window.location.hash)

  useEffect(() => {
    const hashChangeHandler = () => {
      setHash(window.location.hash)
    }

    window.addEventListener('hashchange', hashChangeHandler)
    return () => {
      window.removeEventListener('hashchange', hashChangeHandler)
    }
  }, [])

  return hash
}
