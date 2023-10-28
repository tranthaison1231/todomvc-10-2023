import { forwardRef, type KeyboardEventHandler, type Ref } from 'react'

export type InputProps = {
  onKeyUp: KeyboardEventHandler<HTMLInputElement>
  iconClass?: string
  iconClick?: () => void
}

function Input({ onKeyUp, iconClass, iconClick }: InputProps, ref: Ref<HTMLInputElement>) {
  return (
    <div className="p-4">
      <div className="relative">
        <input
          ref={ref}
          onKeyUp={onKeyUp}
          placeholder="What needs to be done"
          className="h-14 w-full pl-10 text-2xl outline-none placeholder:text-2xl dark:bg-gray-500 dark:placeholder:text-white"
        />
        <svg
          onClick={iconClick}
          className={`absolute top-1/2 -translate-y-1/2 cursor-pointer ${iconClass}`}
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
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </div>
  )
}

export default forwardRef(Input)
