type EditContentPageProps = {
  id: string;
};

export function EditContentPage({ id }: EditContentPageProps) {
  return (
    <main className="page">
      <section className="hero">
        <p className="eyebrow">Contents</p>
        <h2>Edit content route is ready.</h2>
        <p>
          Content ID: <code>{id}</code>
        </p>
      </section>
    </main>
  );
}
