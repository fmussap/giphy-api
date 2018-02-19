import React from 'react'
import PropTypes from 'prop-types'
import pagination from '../../utils/pagination'
import Page from './page'

const Pagination = ({ total, activePage, pageLink, onClick, max }) => {
  const apage = activePage === 1 ? activePage : ((activePage - 1) / max) + 1
  const prev = '<'
  const next = '>'
  const nextPage = apage + 1 <= 199 ? apage + 1 : 199
  const prevPage = apage - 1 >= 1 ? apage - 1 : 1
  // the giphy development api key only allows to load 199 pages.
  // this projects is using the same key for production and development
  // for production is necessary to ask for a new type of key.
  const limit = process.env.NODE_ENV === 'development' ? 199 : null

  return (
    <ul className='pagination'>
      <Page className='prev' page={prev} pageLink={pageLink.replace('%page%', prev)} onClick={() => onClick(prevPage)} />
      {pagination({ total: total >= 200 ? (!limit ? total : limit) : total, activePage: apage }).map((page, index) => {
        return (
          <div key={index} className={`pagination-item ${apage === page ? 'active' : ''}`}>
            <Page page={page} pageLink={pageLink.replace('%page%', page)} onClick={onClick} />
          </div>
        )
      })}
      <Page className='next' page={next} pageLink={pageLink.replace('%page%', next)} onClick={() => onClick(nextPage)} />
    </ul>
  )
}

Pagination.defaultProps = {
  pageLink: '',
  activePage: 1
}

Pagination.propTypes = {
  total: PropTypes.number,
  activePage: PropTypes.number,
  pageLink: PropTypes.string,
  onClick: PropTypes.func
}

export default Pagination
