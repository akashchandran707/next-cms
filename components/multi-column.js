import { CMS_NAME, CMS_URL } from '../lib/constants'
import ColumnItem from './column-item';
import PostBody from './post-body'

export default function MultiColumn(section, preview) {
  section = section.data;
  const HeaderTag = section.headerTag;
  const background = section.background;

  return (
    <section className={"component multiColumn " + background}>
      <HeaderTag>{section.header}</HeaderTag>
      {section.headerContent ? <PostBody content={section.headerContent} /> :
      <> </>}
      <div className='columnContainer flex flex-col md:flex-row'>
        {
          section.columnsCollection.items.map((item, Index) => {
            return <ColumnItem item={item}/>
          })
        }
      </div>
    </section>
  )
}
