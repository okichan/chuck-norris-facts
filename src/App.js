import React from "react"
// import logo from "./logo.svg"
import "./App.css"
import axios from "axios"

const api = axios.create({
   baseURL: "https://api.chucknorris.io/jokes/"
})

class App extends React.Component {
   state = {
      value: [""],
      input: "",
      result: ""
   }

   async getCategories() {
      return await api.get("categories")
   }

   onChangeEnteredCategory = category => {
      const input = category.target // The <input>
      const value = input.value
      this.setState({
         input: value,
         categories: null,
         result: null
      })
   }

   loadQuote = (ele) => {
      this.setState({ result: null })

      const cat = ele.target.value
      // console.log(ele.target.value)
      api.get(`random?category=${cat}`).then(result =>
         this.setState({ result: result.data.value })
      )
   }

   componentDidMount() {
      this.getCategories().then(res => this.setState({ categories: res.data }))
   }

   render() {
      const cats = this.state.categories
      return (
         <div className="App">
            <h2>Choose Category</h2>
            <div className="div-wrapper">
               {cats && cats.map((item, index) => {
                  return <input type="button" key={item} value={item} onClick={this.loadQuote} />
               })}

            </div>


            {this.state.result === null ?  
            <p className='loading'>
               loading

            </p>
            :
            <h1>{this.state.result}</h1> 
            // :
            // 'yay'
            }
         </div>
      )
   }
}

export default App
