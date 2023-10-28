type FooterProps = {
  leftTotal: number
  canClearCompleted: boolean
  clearCompleted: () => void
}

export default function Footer({ leftTotal, canClearCompleted, clearCompleted }: FooterProps) {
  return (
    <footer className="footer flex justify-between border-t border-t-gray-300 p-4">
      <div>
        <span id="count">{leftTotal}</span> item left
      </div>
      <div className="flex items-center gap-2">
        <a href="#/" className="inline-block cursor-pointer p-1 hover:border hover:border-red-500">
          All{' '}
        </a>
        <a href="#/active" className="inline-block cursor-pointer p-1 hover:border hover:border-red-500">
          Active{' '}
        </a>
        <a href="#/completed" className="inline-block cursor-pointer p-1 hover:border hover:border-red-500">
          Completed
        </a>
      </div>
      <button className={`hover:underline ${canClearCompleted ? 'visible' : 'invisible'}`} onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  )
}
