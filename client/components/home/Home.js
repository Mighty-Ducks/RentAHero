import React, { Component } from 'react';
import Banner from '../banner/Banner';

export default class Home extends Component {
  render() {
    return (
      <>
        <Banner
          slogan="Got robbers on your backyard?!"
          title="Rent a Superhero!"
          imgSrc="./assets/heroes.jpg"
          imgAlt=""
          align=""
        />
      </>
    );
  }
}
