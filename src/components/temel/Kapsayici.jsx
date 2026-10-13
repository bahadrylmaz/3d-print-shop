// Kapsayici: sayfa genişliği (en çok 1360 px + kenar boşlukları) ve yatay kenar boşluğu.
// Izgara: mobilde 4, md (768 px) üstünde 12 kolon; oluk --mf-oluk. Çocuklar col-span-* / md:col-start-* ile yerleşir.
// Örnek: <Kapsayici><Izgara><div className="col-span-4 md:col-span-5">…</div></Izgara></Kapsayici>
export function Kapsayici({ as: Etiket = 'div', className = '', children, ...rest }) {
  return (
    <Etiket
      className={`mx-auto w-full max-w-[calc(var(--mf-max)+2*var(--mf-kenar))] px-(--mf-kenar) ${className}`}
      {...rest}
    >
      {children}
    </Etiket>
  )
}

export function Izgara({ as: Etiket = 'div', className = '', children, ...rest }) {
  return (
    <Etiket className={`grid grid-cols-4 gap-x-(--mf-oluk) md:grid-cols-12 ${className}`} {...rest}>
      {children}
    </Etiket>
  )
}
