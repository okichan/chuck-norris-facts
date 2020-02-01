import React from "react"
import "./App.css"
import axios from "axios"

const api = axios.create({
   baseURL: "https://api.chucknorris.io/jokes/"
})

class App extends React.Component {
   state = {
      categories: []
      // input: ""
      // result: "loaded"
   }

   async getCategories() {
      return await api.get("categories")
   }

   loadQuote = ele => {
      this.setState({ result: "" })

      const cat = ele.target.value
      // console.log(ele.target.value)
      api.get(`random?category=${cat}`).then(result =>
         this.setState({ result: result.data.value })
      )
   }

   onClickAddFav = ele => {
      this.setState({ fav: this.state.fav.push(this.state.result) })
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
               {cats &&
                  cats.map((item, index) => {
                     return (
                        <input
                           type="button"
                           key={item}
                           value={item}
                           onClick={this.loadQuote}
                        />
                     )
                  })}
            </div>

            {this.state.result === "" ? (
               <p className="loading">loading</p>
            ) : (
               <>
                  <h1 className="result">{this.state.result}</h1>
                  {this.state.result && (
                     <div className="fav" onClick={this.onClickAddFav} />
                  )}
               </>
            )}
         </div>
      )
   }
}

export default App
