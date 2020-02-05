import React from "react"
import "./App.scss"
import heart from "./heart_filled.svg"
import axios from "axios"

const api = axios.create({
   baseURL: "https://api.chucknorris.io/jokes/"
})

class App extends React.Component {
   constructor(props) {
      super(props)
      this.myRef = React.createRef()
   }

   state = {
      categories: [
         "animal",
         "career",
         "celebrity",
         "dev",
         "explicit",
         "fashion",
         "food",
         "history",
         "money",
         "movie",
         "music",
         "political",
         "religion",
         "science",
         "sport",
         "travel"
      ],
      fav: [],
      favShowing: false
   }

   async getCategories() {
      return await api.get("categories")
   }

   loadQuote = ele => {
      let favArr = this.state.fav
      this.setState({ result: "" })

      const cat = ele.target.value
      // console.log(ele.target.value)
      api.get(`random?category=${cat}`).then(result => {
         this.setState({ result: result.data.value })
         if (favArr.includes(this.state.result)) {
            this.myRef.current.classList.add("saved")
         } else {
            this.myRef.current.classList.remove("saved")
         }
      })
   }

   toggleAddToFav = ele => {
      let favArr = this.state.fav

      if (favArr.includes(this.state.result)) {
         favArr = favArr.filter(e => e !== this.state.result)
         ele.target.classList.remove("saved")
      } else {
         favArr.push(this.state.result)
         ele.target.classList.add("saved")
      }

      this.setState({ fav: favArr })
   }

   onClickShowFavs = event => {
      let favShowing = this.state.favShowing

      this.setState({ favShowing: !favShowing })
      // this.myRef.current.classList.toggle("show")
   }
   
   onClickCloseFavs = e => {
      let favShowing = this.state.favShowing
      this.setState({ favShowing: !favShowing })
      e.stopPropagation()
   }

   componentDidMount() {
      // this.getCategories().then(res => this.setState({ categories: res.data }))
   }

   render() {
      const cats = this.state.categories
      // const svg = <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><g stroke="#000" ><path d="M24.39 10.32l.46 1.092.46-1.092c1.946-4.611 6.384-7.819 11.53-7.819 6.893 0 11.943 5.904 12.581 13.087l.002.026.005.023h0v.001h0l.002.01.008.052c.007.049.017.125.026.228.02.206.039.52.034.936-.008.833-.11 2.076-.49 3.684-1.032 4.375-3.462 8.27-6.745 11.246l-.002.002-17.408 15.531L7.738 31.795h0C4.454 28.819 2.024 24.922.99 20.547h0C.61 18.94.509 17.696.5 16.863c-.005-.416.014-.73.034-.936a4.68 4.68 0 01.034-.28l.002-.01h0l.005-.024.002-.026C1.216 8.404 6.266 2.5 13.159 2.5c5.134 0 9.279 3.195 11.23 7.82z"/></g></svg>

      return (
         <div className="App">
            <header>
               <h2>Choose Category</h2>
               <div className="header-fav" onClick={this.onClickShowFavs}>
                  <img src={heart} />
               </div>
            </header>

            {this.state.favShowing && (
               <section
                  className="favs-list"
                  ref={this.myRef}
                  onClick={this.onClickCloseFavs}>
                  {this.state.fav.map((m, idx) => (
                     <ul>
                        {" "}
                        <li key={idx} onClick={event => event.stopPropagation()}>{m}</li>
                     </ul>
                  ))}
               </section>
            )}

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
                     <button
                        className="fav-button"
                        onClick={this.toggleAddToFav}
                        ref={this.myRef}></button>
                  )}
               </>
            )}
         </div>
      )
   }
}

export default App
