import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";
 
// 3a3d3f2810df4e23a9066e51de981a7d

export class News extends Component {
    
    static defaultProps ={
        country : "us",
        pageSize:8,
        category : "general",
    }

    static propTypes = {
        country : PropTypes.string,
        pageSize: PropTypes.number,
        category : PropTypes.string
        
    }

    capitalize=(string)=>{
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    constructor(props){
        super(props);
        this.state={
            articles:[],
            loading: true,
            page:1,
            totalResults :0
          
        }
        document.title = `NewsMonkey-${this.capitalize(this.props.category)}`
                
    }


    async updateNews(pageNo){
      this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3a3d3f2810df4e23a9066e51de981a7d&page=${this.state.page}&pageSize=${this.props.pageSize}`;
        this.setState({loading:true})
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await  data.json();
        this.props.setProgress(70);
        //console.log(parsedData);
        this.setState({articles:parsedData.articles , totalResults:parsedData.totalResults , loading : false});
        this.props.setProgress(100);
    }

    async componentDidMount(){
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3a3d3f2810df4e23a9066e51de981a7d&page=1&pageSize=${this.props.pageSize}`;
        // this.setState({loading:true})
        // let data = await fetch(url);
        // let parsedData = await  data.json();
        // //console.log(parsedData);
        // this.setState({articles:parsedData.articles , totalResults:parsedData.totalResults , loading : false})
    
        this.updateNews();
    }

   

    handlePrevClick= async ()=>{
        // let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3a3d3f2810df4e23a9066e51de981a7d&page=${this.state.page-1}&pageSize=${this.props.pageSize}`;
        // this.setState({
        //     loading:true
        //  })
        // let data = await fetch(url);
        // let parsedData = await  data.json();
        
        // this.setState({
        //     page:this.state.page-1,
        //     articles:parsedData.articles,
        //     loading:false
        // })
        this.setState({ page :this.state.page -1 });
        this.updateNews();
    }
    handleNextClick= async()=>{
    //     console.log(this.state.page);
    //     if (this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)) {
            
    //     }
    //     else {
    //      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3a3d3f2810df4e23a9066e51de981a7d&page=${this.state.page+1}&pageSize=${this.props.pageSize}`;
    //      this.setState({
    //         loading:true
    //      })
    //     let data = await fetch(url);

    //     let parsedData = await  data.json();

    //     this.setState({
    //         page:this.state.page+1,
    //         articles:parsedData.articles,
    //         loading:false
    //     })
    // }
    this.setState({ page :this.state.page +1 });
    this.updateNews();

        
     


    }

    fetchMoreData =  async () => {
      const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=3a3d3f2810df4e23a9066e51de981a7d&page=${this.state.page +1}&pageSize=${this.props.pageSize}`;
      this.setState({page:this.state.page +1})
      // this.setState({loading:true})
      let data = await fetch(url);
      let parsedData = await  data.json();
      //console.log(parsedData);
      this.setState({articles:this.state.articles.concat(parsedData.articles), 
          totalResults:parsedData.totalResults
            , loading : false})
    };

  render() {
    return (
      <>
        <h2 className='text-center ' style={{marginTop:"90px"}}>Top {this.capitalize(this.props.category)} HeadLines</h2>
        {this.state.loading && <Spinner />}
       
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length !== this.state.totalResults }
          loader={<h4><Spinner /></h4>} >

        <div className="container">    

        <div className="row">
        {this.state.articles.map((element)=>{

            return  <div className="col-md-4" key={element.url}>
            <NewsItem  
            title={element.title?element.title.slice(0,45):"unknown Title"} 
            description={element.description?element.description.slice(0,45):"No description"} 
            imageUrl={element.urlToImage?element.urlToImage:"https://www.sciencealert.com/images/2022-07/processed/skittles_1024.jpg"} 
            newsUrl={element.url} 
            author={element.author}
            date={element.publishedAt}
            source={element.source.name}

            />
            </div>
            
           

        })}
           
           
        </div>
        </div>
        </InfiniteScroll>
        {/* <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick={this.handlePrevClick} >&larr; previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick} >next &rarr;</button> */}
        {/* </div> */}



      </>
    )
  }
}

export default News