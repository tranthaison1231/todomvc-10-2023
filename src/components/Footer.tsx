export default function Footer() {
  return (
    <footer className="footer flex justify-between border-t border-t-gray-300 p-4">
      <div>
        <span id="count">0</span> item left
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
      <div id="clear-completed" className="invisible cursor-pointer hover:underline">
        Clear completed
      </div>
    </footer>
  )
}
