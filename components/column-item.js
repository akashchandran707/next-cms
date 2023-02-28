import PostBody from './post-body'

export default function ColumnItem({ item }) {
    console.log('column item', item)
    const HeaderTag = item.headerTag;
    return (
    <div className="columnItem">
        <HeaderTag>{item.header}</HeaderTag>
        <PostBody content={item.content} />
    </div>)
  }
  