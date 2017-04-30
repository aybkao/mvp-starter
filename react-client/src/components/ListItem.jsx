import React from 'react';

const ListItem = (props) => (
  <div>
	<li>
	  <h4><strong>{props.item.title}</strong></h4>
	  <td>
		<img src={props.item.url} />
	  </td>
	  alt: {props.item.alt}
	</li>
  </div>
)

export default ListItem;