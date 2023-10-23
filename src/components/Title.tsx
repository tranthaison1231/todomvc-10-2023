type TitleProps = {
  color?: string
}

export default function Title({ color = 'red' }: TitleProps) {
  return (
    <h1
      className="text-5xl"
      style={{
        color
      }}
    >
      TODOS
    </h1>
  )
}
