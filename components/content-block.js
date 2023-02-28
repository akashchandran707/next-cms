import { CMS_NAME, CMS_URL } from '../lib/constants'
import PostBody from './post-body'

export default function ContentBlock(section, preview) {
    section = section.data;
    console.log('contentblock', section)
    const HeaderTag = section.headerTag;
    const background = section.background;
  return (
    <section className={"component contentBlock " + background}>
        <HeaderTag>{section.header}</HeaderTag>
        <PostBody content={section.content} />
    </section>
  )
}

