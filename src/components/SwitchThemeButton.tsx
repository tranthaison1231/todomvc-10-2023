import { useState } from 'react'

export default function SwitchThemeButton() {
  const [darkTheme, setDarkTheme] = useState(localStorage.getItem('theme') === 'dark')

  const switchTheme = () => {
    document.documentElement.classList.toggle('dark')
    if (document.documentElement.classList.contains('dark')) {
      localStorage.setItem('theme', 'dark')
      setDarkTheme(true)
    } else {
      setDarkTheme(false)
      localStorage.setItem('theme', 'light')
    }
  }

  return (
    <svg
      onClick={switchTheme}
      className="lucide lucide-moon cursor-pointer dark:text-white"
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {darkTheme ? (
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
      ) : (
        <>
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </>
      )}
    </svg>
  )
}
