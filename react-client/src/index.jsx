import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import List from './components/List.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      items: fakeData,
      keyword: '',
      value: '',
      title: '',
      alt: ''
    };
    this.handleChangeKeyword = this.handleChangeKeyword.bind(this);
    this.handleSearchClick = this.handleSearchClick.bind(this);
    this.handleChangeUrl = this.handleChangeUrl.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeAlt = this.handleChangeAlt.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getData = this.getData.bind(this);
  }
  
  // react forms document has examples of below functions

  handleChangeKeyword(event) {
    this.setState({keyword: event.target.value});
    console.log("this is keyword", this.state.keyword);
  }

  handleSearchClick(event) {
    var obj = {
      "keyword": this.state.keyword
    };
    console.log("this is kw:", obj.keyword)

    $.ajax({
      type: "GET",
      url: 'http://127.0.0.1:3000/search/' + obj.keyword,
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

  handleChangeUrl(event) {
    this.setState({value: event.target.value});
    console.log("this is url", this.state.value);
  }

  handleChangeTitle(event) {
    this.setState({title: event.target.value});
    console.log("this is title", this.state.title);
  }

  handleChangeAlt(event) {
    this.setState({alt: event.target.value});
    console.log("this is alt", this.state.alt);
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
      "alt": this.state.alt
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
      <h1><strong>xkcd finder</strong></h1>
      <h3>Seach comic in database</h3>
        <label>
        SEARCH :
        <input type="text" value={this.state.keyword} onChange={this.handleChangeKeyword} placeholder="keyword here" />
        <button onClick={this.handleSearchClick} >Find</button>
        </label>
      <h3>Add new comic</h3>
        <label>
          URL : 
          <input type="text" value={this.state.value} onChange={this.handleChangeUrl} />
          TITLE :
          <input type="text" value={this.state.title} onChange={this.handleChangeTitle} />
          ALT :
          <input type="text" value={this.state.alt} onChange={this.handleChangeAlt} />
        </label> 
        <button onClick={this.handleSubmit} >Submit</button>
      <List items={this.state.items} keyword={this.state.keyword} />
    </div>
    )
  }
}

window.fakeData = [
{
  url: "https://imgs.xkcd.com/comics/woodpecker.png",
  title: "Woodpecker",
  alt: "If you don't have an extension cord I can get that too. Because we're friends! Right?"
},
{
  url: "https://imgs.xkcd.com/comics/avoidance.png",
  title: "Avoidance",
  alt: "Hobby: seeing how many menu selections you can get someone to go through before they realize you're not an automated system and/or hang up."
},
{
  url: "https://lh4.ggpht.com/PB__YK27QZ-pU7WPJrWyaRVVOYCs9p-7LjCXow1pB5p1qOL7oBAYJt2xjDHLjIgb_g=h310",
  title: "hey this is not xkcd!",
  alt: "blue eyes cat in jeans"
}
];

ReactDOM.render(<App />, document.getElementById('app'));