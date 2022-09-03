

function Item(props){
  return(
    <div className={props.value ? props.isNew ? 'item new_item' : 'item item_anim' : 'item'}>
      <p>{props.value}</p>
    </div>
  )
}

export default Item