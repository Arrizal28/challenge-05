import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import { Navbar, Container, Nav, Button, Form} from "react-bootstrap"
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import axios from "axios"
import { useEffect, useState } from "react"
import {  FormControl } from "react-bootstrap"
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css"
import "./style/landingPage.css"
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Home() {
  const [movies, setMovies] = useState([])
  const [query, setQuery] = useState('')
  const navigate = useNavigate();
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/discover/movie`, {
      params: {
        api_key: process.env.REACT_APP_TMDB_KEY
      }
    }).then((response) => {
      console.log(response.data.results)
      setMovies(response.data.results)
    })
  }, [query])
  
  const searchMovie = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_SEARCH}=${query}`)
      setMovies(response.data.results)
    } catch (e) {
      console.log(e)
    }
  }

  const handleSearch = (e) => {
    setQuery(e.target.value);
  }

    return (
        <div>
          <div>
          <div>
              <Navbar expand="lg" fixed="top" variant="dark">
                <Container>
                  <Navbar.Brand href="#" className="mb-2 text-danger" style={{fontSize:"32px", fontWeight: 'bold'}} onClick={(e) => {
                      e.preventDefault();
                      navigate('/')
                              }}>MOVIELIST</Navbar.Brand>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto">
                    <Form className="d-flex" onSubmit={searchMovie} autoComplete="off">
                      <FormControl
                      type="search"
                      placeholder="Movie Search"
                      className="me-2"
                      aria-label="search"
                      name="query"
                      value={query} onChange={handleSearch}></FormControl>
                      <Button variant="secondary" type="submit">Search</Button>
                    </Form>
                    </Nav>
                  </Navbar.Collapse>
                  <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto mb-2">
                    <Button variant="outline-danger" className="mx-3 rounded">Login</Button>
                    <Button variant="danger" className="rounded">Register</Button>
                    </Nav>
                  </Navbar.Collapse>
                </Container>
              </Navbar>
              </div>
            <Carousel>
            <Carousel.Item className='myBG'>
              <div
                className="w-100 vh-100 d-flex flex-column justify-content-center align-items-center text-white brightimg" style={{backgroundImage: 'url("https://cdn.discordapp.com/attachments/776795674594639873/1025598148267229284/1258407.jpg")', backgroundPosition: 'center', backgroundSize: 'cover'}}
                >
              </div>
                  <div className='textbox'>
                    <h1>Doctor Strange in the Multiverse of Madness</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil sunt quae expedita pariatur odio iste similique officia eaque, tempore sapiente amet fugit? Quos sequi, possimus repudiandae cupiditate tempore optio animi.</p>
                    <button className='rounded-pill'>
                      <PlayCircleOutlineIcon/>
                      <span>Watch Trailer</span>
                    </button>
                  </div>
            </Carousel.Item>
            <Carousel.Item className='myBG'>
            <div
                className="w-100 vh-100 d-flex flex-column justify-content-center align-items-center text-white brightimg" style={{backgroundImage: 'url("https://cdn.discordapp.com/attachments/776795674594639873/1027476925746249738/1253596.jpg")', backgroundPosition: 'center', backgroundSize: 'cover'}}
                >
              </div>
                  <div className='textbox'>
                    <h1>DC League of Super-Pets</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil sunt quae expedita pariatur odio iste similique officia eaque, tempore sapiente amet fugit? Quos sequi, possimus repudiandae cupiditate tempore optio animi.</p>
                    <button className='rounded-pill'>
                      <PlayCircleOutlineIcon/>
                      <span>Watch Trailer</span>
                    </button>
                  </div>
            </Carousel.Item>
            <Carousel.Item className='myBG'>
            <div
                className="w-100 vh-100 d-flex flex-column justify-content-center align-items-center text-white brightimg" style={{backgroundImage: 'url("https://cdn.discordapp.com/attachments/776795674594639873/1027477704796282890/1196349.jpg")', backgroundPosition: 'center', backgroundSize: 'cover'}}
                >
              </div>
                  <div className='textbox'>
                    <h1>Sonic the hedgehog 2</h1>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil sunt quae expedita pariatur odio iste similique officia eaque, tempore sapiente amet fugit? Quos sequi, possimus repudiandae cupiditate tempore optio animi.</p>
                    <button className='rounded-pill'>
                      <PlayCircleOutlineIcon/>
                      <span>Watch Trailer</span>
                    </button>
                  </div>
            </Carousel.Item>
          </Carousel>
          </div>
          <div className="trending">
            <br />
            {!query.length
                  ?
                  <h1 className="text-white">POPULAR MOVIE</h1>
                  :
                  <h1 className="text-white">RESULT...</h1>
                 }
            <br />
          <Slider {...settings}>
            {movies.map((item) => (
              <div className="card">
                <div className="card-top">
                  <img
                    src={`${process.env.REACT_APP_IMG_PATH}/${item.poster_path}`} alt={"..."} className="images" title={item.title} onClick={(e) => {
                      e.preventDefault();
                      navigate(`details/${item.id}`)
                              }}
                  />
                </div>
              </div>
            ))}
          </Slider>
          </div>
        </div>
      )
}

export default Home