import React, { Component } from 'react'
import { connect } from 'react-redux'
import Modal from 'react-modal'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { getAllGifs, getGifsPage } from '../actions'
import PageContent from './PageContent'
import Pagination from './Pagination'

export class DashboardPage extends Component {
  state = {
    type: null,
    max: 25,
    src: '',
    isOpen: false,
    title: '',
    copyLink: false,
    name: ''
  }

  // render all the GIFs
  renderGifs () {
    if (this.props.gifs && this.props.gifs.length > 0) {
      const gifs = this.props.gifs
      return gifs.map((gif) => {
        const url = gif.images.fixed_width.url
        const urlStill = gif.images.fixed_width_still.url
        const urlModal = gif.images.downsized.url
        const title = gif.title.replace('GIF', '')
        return (
          <PageContent
            handleOpenModal={this.handleOpenModal}
            src={url}
            urlStill={urlStill}
            urlModal={urlModal}
            key={gif.id}
            title={title}
          />
        )
      })
    }
    return <div>No gifs found</div>
  }

  handleOpenModal = (src, title) => {
    this.setState(() => ({ 
      isOpen: true,
      src,
      title,
    }))
  }

  handleCloseModal = () => {
    this.setState(() => ({ 
      isOpen: false,
      src: '',
      title: '',
      copyLink: false
    }))
  }

  handleCopyLink = () => {
    this.setState(() => ({ 
      copyLink: true
    }))
  }

  handleClickAll = (page = 1) => () => {
    this.props.getAllGifs(page, this.state.max)
    this.setState(() => ({ type: null }))
  }

  handleFilterGifs = (type, page = 1) => () => {
    this.setState(() => ({ type }))
    this.props.getGifsPage(type, page)
  }

  // Load GIFs from each new page
  handlePagination = (page=1) => {
    const type = this.state.type
    if (type) {
      this.props.getGifsPage(type, page, this.state.max)
    } else {
      this.props.getAllGifs(page, this.state.max)
    }
  }

  handleSearchGifs = (e) => {
    const name = e.target.value
    this.setState(() => ({ name }))
  }

  onSearch = () => {
    if (this.state.name) {
      this.handleFilterGifs(this.state.name)()
      this.setState(() => ({ name: '' }))
    }
  }

  renderPagination () {
    const numberOfGifs = this.props.gifs ? this.props.gifs.length : 0
    if (numberOfGifs > 0) {
      return (
        <Pagination
          activePage={this.props.pagination.offset}
          max={this.state.max}
          onClick={this.handlePagination}
          total={this.props.pagination.total_count % this.state.max === 0
            ? this.props.pagination.total_count / this.state.max
            : parseInt(this.props.pagination.total_count / this.state.max) - 1} // total page / GIFs per page
        />
      )
    }
  }

  componentWillMount () {
    // required for Modal
    Modal.setAppElement('body')
  }

  componentDidMount () {
    // Load the first GIFs when the page starts for de first time
    this.props.getAllGifs(1)
  }

  render () {
    return (
      <div className='content-container'>
        <div className='search-container'>
          <input
            className='text-input'
            type='text'
            placeholder='Search GIFs'
            autoFocus
            value={this.state.name}
            onChange={this.handleSearchGifs}
          />
          <img className='img-search' title='Search' src='/images/magnify.png' onClick={this.onSearch} />
        </div>
        <div className='gifs-filter-container'>
          <button className='button all' onClick={this.handleClickAll()}>
            All
          </button>
          <button className='button cats' onClick={this.handleFilterGifs('cat')}>
            Cats
          </button>
          <button className='button dogs' onClick={this.handleFilterGifs('dog')}>
            Dogs
          </button>
        </div>
        <Modal
          isOpen={this.state.isOpen}
          contentLabel={this.state.title}
          shouldReturnFocusAfterClose={false}
          onAfterOpen={this.handleFocus}
          onRequestClose={this.handleCloseModal}
          style={{
            overlay: {
              position: 'fixed',
              backgroundColor: 'rgba(64, 64, 64, 0.75)',
            },
            content: {
              textAlign: 'center',
              border: '1px solid #000', background: '#000',
              overflow: 'none',
              borderRadius: '4px', outline: 'none', padding: '1rem',
              top: '50%', left: '50%', right: 'auto', bottom: 'auto',
              marginRight: '-50%', transform: 'translate(-50%, -50%)',
            }
          }}
        >
          <div>
            <img src={this.state.src} style={{ maxWidth: '90%' }}/>
            <div className='modal-title'>{this.state.title}</div>
            {!this.state.copyLink && (
              <CopyToClipboard text={this.state.src}>
                <div className='copy-link' onClick={this.handleCopyLink}>Copy link</div>
              </CopyToClipboard>
            )}
            {this.state.copyLink && <div className='link-message'>Link copied to clipboard</div>}
            <img title='Close' className='close-modal' src='/images/close-circle-outline.png' onClick={this.handleCloseModal} />
          </div>
        </Modal>
        {this.renderPagination()}
        <div  className='gifs-list-container'>
          {this.renderGifs()}
        </div>
        {this.renderPagination()}
      </div>
    )
  }
}

const mapStateToProps = ({ gifs }) => ({
  gifs: gifs.data || [],
  meta: gifs.meta,
  pagination: gifs.pagination
})

export default connect(mapStateToProps, {
  getAllGifs,
  getGifsPage
})(DashboardPage)
