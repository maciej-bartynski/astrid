import React, { Component } from 'react';
import Astrid_v2 from './astrid_v2';
import Astrid_v3 from './astrid_v3';
import Astrid_v1 from './astrid_v1';

const GALLERY_PATH = './media-gallery/';
const FORMAT = '.jpg';
const MEDIA_GALLERY_PATHS = [
  { title: 'animals' },
  { title: 'books' },
  { title: 'business' },
  { title: 'coins' },
  { title: 'frog' },
  { title: 'girl' },
  { title: 'literature' },
  { title: 'money' },
  { title: 'reading' },
  { title: 'tabletop-photography' },
  { title: 'water' },
]

function getImagesArray() {
  return MEDIA_GALLERY_PATHS.map((media, i)=>{
    return GALLERY_PATH + MEDIA_GALLERY_PATHS[i].title + FORMAT; 
  })
}

function getTitlesArray() {
  return MEDIA_GALLERY_PATHS.map((media, i)=>{
    return MEDIA_GALLERY_PATHS[i].title; 
  })
}

class App extends Component {
  render() {
    const images = getImagesArray();
    const titles = getTitlesArray();
    return (
      <div>
        {/* nope <Astrid_v1/>*/}
        <Astrid_v2 { ...{images, titles} }/>
        <Astrid_v3 { ...{images, titles} }/>
      </div>
    )
  }
}

export default App;