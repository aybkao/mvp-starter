import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div>
    <h4> xkcdxkcdxkcdxkcdxkcdxkcdxkcdcxkcdxkcdxkcdxkcdxkcdxkcdxkcdxkcdxkcdxkcdxkcdkcdxkcdxckdxkcd find typo! </h4>
    There are { props.items.length } comics in database related to "{props.keyword}".
    { props.items.map(item => <ListItem item={item}/>)}
  </div>
)

export default List;