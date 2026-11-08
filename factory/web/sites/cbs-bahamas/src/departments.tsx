import { useEffect, useState } from 'react';
import { Layout, mount } from './layout';
import { Tile } from './Wall';
import { DEPTS, ALSO, STORE, TEL, PHONE } from './data';

function Departments() {
  const [active, setActive] = useState(DEPTS[0].id);
  useEffect(() => {
    const io = new IntersectionObserver((es) => {
      const vis = es.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      if (vis) setActive(vis.target.id);
    }, { rootMargin: '-30% 0px -60% 0px' });
    DEPTS.forEach((d) => { const el = document.getElementById(d.id); if (el) io.observe(el); });
    return () => io.disconnect();
  }, []);

  return (
    <Layout page="departments" active={active}>
      <section className="cat-head" aria-labelledby="h1">
        <h1 id="h1">Every department, and what is on its shelf.</h1>
        <p className="stand">Seven departments photographed, ten more listed. Each one opens straight into the CBS online store, where prices and stock are live.</p>
      </section>

      {DEPTS.map((d) => (
        <section key={d.id} id={d.id} className="cat" aria-labelledby={`h-${d.id}`}>
          <div className="cat-side">
            <h2 id={`h-${d.id}`}>{d.name}</h2>
            <p>{d.line}</p>
            <a className="arrow-link" href={d.href}>Shop {d.name.toLowerCase()}</a>
          </div>
          <div className={`cat-grid cat-n${Math.min(d.items.length, 6)}`}>
            {d.items.map((it, i) => <Tile key={it.src} it={it} i={-1} big={i === 0} />)}
          </div>
        </section>
      ))}

      <section id="also" className="also" aria-labelledby="h-also">
        <h2 id="h-also">Also on the shelves.</h2>
        <ul>
          {ALSO.map(([n, h]) => <li key={n}><a href={h}><span>{n}</span><span className="also-go">Shop</span></a></li>)}
        </ul>
      </section>

      <section className="cat-close" aria-label="Order">
        <p>Cannot find it? CBS special orders what is not on the shelf.</p>
        <div className="cat-close-actions">
          <a className="btn-tape" href="https://www.cbsbahamas.com/shop-special-order">Ask for a special order</a>
          <a className="arrow-link" href={TEL}>Call {PHONE}</a>
          <a className="arrow-link" href={STORE}>Open the full store</a>
        </div>
      </section>
    </Layout>
  );
}

mount(<Departments />);
