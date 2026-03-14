type PlaceholderPageProps = {
  title: string
}

export function PlaceholderPage({ title }: PlaceholderPageProps) {
  return (
    <section className="placeholder-page">
      <h2>{title}</h2>
      <p>Mock page. 内容后续补充。</p>
    </section>
  )
}
