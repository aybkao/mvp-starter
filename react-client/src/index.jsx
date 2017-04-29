import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';

window.fakeData = [
{
  url: "https://s-media-cache-ak0.pinimg.com/originals/cd/9f/02/cd9f021625b3738ef5413c1edcf8c177.jpg",
  title: "cat on a laptop",
  description: "he looks a little lonely"
},
{
  url: "https://eltrantsreviewsreflections.files.wordpress.com/2014/07/confused-cat.jpg",
  title: "confused cat",
  description: "sideway view of the world is best"
},
{
  url: "https://lh4.ggpht.com/PB__YK27QZ-pU7WPJrWyaRVVOYCs9p-7LjCXow1pB5p1qOL7oBAYJt2xjDHLjIgb_g=h310",
  title: "cat in jeans",
  description: "blue eyes"
}
];


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: fakeData.slice(0, 2),
      value: '',
      title: '',
      description: ''
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeUrl = this.handleChangeUrl.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.getData = this.getData.bind(this);
  }

  // componentDidMount() {
  //   $.ajax({
  //     url: '/items', 
  //     success: (data) => {
  //       this.setState({
  //         items: data
  //       })
  //     },
  //     error: (err) => {
  //       console.log('err', err);
  //     }
  //   });
  // }

  // react forms document has examples of below functions
  handleChangeUrl(event) {
    this.setState({value: event.target.value});
    console.log("this is url", this.state.value);
  }

  handleChangeTitle(event) {
    this.setState({title: event.target.value});
    console.log("this is title", this.state.title);
  }

  handleChangeDescription(event) {
    this.setState({description: event.target.value});
    console.log("this is description", this.state.description);
  }
  
  getData() {
    $.ajax({
      type: "GET",
      url: 'http://127.0.0.1:3000/items',
      success: (data) => {
        console.log("getData successful GET request from mongodb", data)
        this.setState({items: JSON.parse(data)});
      },
      error: (err) => {
        console.log("getData failed GET request from mongodb")
        console.log('err', err);
      }
    })
  }

  handleSubmit(event) {
    var obj = {
      "url": this.state.value, 
      "title": this.state.title, 
      "description": this.state.description
    };
    $.ajax({
      type: "POST",
      url: 'http://127.0.0.1:3000/itemlist', 
      data: JSON.stringify(obj),
      contentType: 'application/json',
      success: () => {
        // after POST request send GET request to get all data
        console.log("successful starting ajax GET request")
        this.getData() ;
      },
      error: (err) => {
        console.log('err', err);
      }
    })
    //event.preventDefault();
  }

  render () {
    return (
    <div>
      <h1>Title</h1>
        <label>
           URL : 
          <input type="text" value={this.state.value} onChange={this.handleChangeUrl} />
           TITLE :
          <input type="text" value={this.state.title} onChange={this.handleChangeTitle} />
           DESC :
          <input type="text" value={this.state.description} onChange={this.handleChangeDescription} />
        </label> 
        <button onClick={this.handleSubmit} >Submit</button>
      <List items={this.state.items}/>
    </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));