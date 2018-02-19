// rule for centering the component
const centerRule = ({ total, activePage }) => (
  (activePage - 1) > 0
  ? (activePage === total ? activePage - 2 : activePage - 1)
  : 1
)

const isNumber = (value) => typeof (value) === 'number'

const pagination = ({ total = 1, activePage = 1 } = {}) => {
  if (!isNumber(total) || !isNumber(activePage)) {
    throw new TypeError('total and activePage should be a number')
  }

  if (total <= 5) {
    return Array.from({ length: total }, (_, i) => i + 1)
  }

  const visiblePages = 3
  // no more than 3 pages to the left or to the right
  let pages = [
    1,
    ...Array.from({ length: visiblePages }, (_, i) => i +
    centerRule({ total, activePage })),
    total
  ]

  pages = pages.filter((item, index, array) => array.indexOf(item) === index)

  const penultimatePage = pages[pages.length - 2]
  const lastPage = pages[pages.length - 1]
  const firstpage = pages[0]
  const secondPage = pages[1]

  if (penultimatePage === (lastPage - 2)) {
    pages.push(lastPage)
    pages[pages.length - 2] = penultimatePage + 1
  } else if (penultimatePage < (lastPage - 2)) {
    pages.push(lastPage)
    pages[pages.length - 2] = '...'
  }

  if (secondPage === (firstpage + 2)) {
    pages.unshift(firstpage)
    pages[1] = firstpage + 1
  } else if (secondPage > (firstpage + 2)) {
    pages.unshift(firstpage)
    pages[1] = '...'
  }

  return pages
}

export default pagination
