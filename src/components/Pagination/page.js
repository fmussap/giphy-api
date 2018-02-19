import React from 'react'

const Dots = ({ className }) => <div className={className}>...</div>

const Page = ({ page, pageLink, onClick }) => {
  // use '...' when is necessary
  const Component = page === '...' ? Dots : 'a'

  const handleClick = !onClick ? null : (e) => {
    e.preventDefault()
    onClick(page)
  }

  return (
    <Component href={pageLink} onClick={handleClick} className='pagination-link'>
      {page}
    </Component>
  )
}

export default Page
