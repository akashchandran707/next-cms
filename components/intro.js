import { CMS_NAME, CMS_URL } from '../lib/constants'
import style from '../styles/intro.module.scss'

export default function Intro() {
  return (
    <section className="introHeader">
      <h1 className="main-title text-6xl md:text-8xl font-bold tracking-tighter leading-tight md:pr-8">
        My Blog
      </h1>
      <h4 className="md:text-left">
        A statically generated blog example using{' '}
        <a
          href="https://nextjs.org/"
          className="underline hover:text-success duration-200 transition-colors"
        >
          Next.js
        </a>{' '}
        and{' '}
        <a
          href={CMS_URL}
          className="underline hover:text-success duration-200 transition-colors"
        >
          {CMS_NAME}
        </a>
        .
      </h4>
    </section>
  )
}
