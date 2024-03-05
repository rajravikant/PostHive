import React from 'react'

const Pagination = () => {
    const page = 1;
    const totalPages = 10;

  return (
    <>
    <section className='pagination'>
        <button>Prev</button>
        <p>{page} of {totalPages}</p>
        <button>Next</button>
    </section>
    </>
  )
}

export default Pagination