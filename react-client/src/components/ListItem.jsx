import React from 'react';

const ListItem = (props) => (
  <div>
	<li>{props.item.title}</li>
	  <td>
		<img src={props.item.url} />
	  </td>
	  {props.item.description}
  </div>
)

export default ListItem;