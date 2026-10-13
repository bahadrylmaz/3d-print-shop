// Blog sayfalarını sunucu tarafında HTML'e çevirir. scripts/prerender-blog.mjs bunu Vite'ın ssrLoadModule'ü ile yükler;
// böylece build'de üretilen statik HTML, tarayıcıda çalışan BlogPage/BlogPost bileşenleriyle birebir aynı yapıyı taşır.
import { createElement as h } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import BlogPage from '../src/pages/BlogPage.jsx'
import BlogPost from '../src/pages/BlogPost.jsx'

export const blogSayfaHtml = (yol) =>
  renderToStaticMarkup(
    h(
      MemoryRouter,
      { initialEntries: [yol] },
      h(
        Routes,
        null,
        h(Route, { path: '/blog', element: h(BlogPage) }),
        h(Route, { path: '/blog/:slug', element: h(BlogPost) }),
      ),
    ),
  )
