import { forwardRef, type KeyboardEventHandler, type Ref } from 'react'

type InputProps = {
  onKeyUp: KeyboardEventHandler<HTMLInputElement>
}

function Input({ onKeyUp }: InputProps, ref: Ref<HTMLInputElement>) {
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
          className="lucide lucide-chevron-down absolute top-1/2 -translate-y-1/2 text-gray-300"
          xmlns="http://www.w3.org/2000/svg"
          id="toggle-all"
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
