import React, { Component } from 'react'

class PageContent extends Component {
  constructor (props) {
    super()
    this.state = {
      src: props.urlStill,
      hover: ''
    }

    this.handleClick = () => {
      props.handleOpenModal(props.urlModal, props.title)
      // this changes the class to disable the hover efect
      this.setState(() => ({
        hover: 'no-hover'
      }))
    }

    // this changes the image to be load from static / animated
    this.handleHoverOver = () => {
      this.setState(() => ({
        src: props.src
      }))
    }

    // it changes the image to be load from animated / static
    this.handleHoverOut = () => {
      this.setState(() => ({
        src: props.urlStill,
        hover: ''
      }))
    }
  }

  render () {
    return (
      <div
        className={`individual-gif-container ${this.state.hover}`}
        style={{ backgroundImage: `url(${this.state.src})`, backgroundRepeat: 'no-repeat' }}
        onClick={this.handleClick}
        onMouseOver={this.handleHoverOver}
        onMouseOut={this.handleHoverOut}
      >
        <div className='individual-gif-info'>{this.props.title}</div>
      </div>
    )
  }
}

export default PageContent
