import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="container-luxe py-32 text-center">
      <p className="eyebrow mb-3">Error 404</p>
      <h1 className="display-1 mb-6">A piece misplaced.</h1>
      <p className="lead max-w-md mx-auto">
        The page you were looking for does not exist or has moved. Step back into the shop —
        we suspect you will find something better.
      </p>
      <div className="mt-10 flex justify-center gap-4 flex-wrap">
        <Link href="/" className="btn-primary">Return home</Link>
        <Link href="/shop" className="btn-ghost">Discover the shop</Link>
      </div>
    </section>
  );
}
