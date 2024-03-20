import React from 'react'
import { Link } from 'react-router-dom';

const CategoryList = () => {
  return (
    <ul className='flex justify-between'>
        {categories.map(item => (<li key={item.id} className='bg-blue-200 text-sm px-5 py-4 capitalize font-normal rounded-md shadow-sm'>
            <Link to={`/posts/${item.name}`}>
                {item.name}
            </Link>
        </li>))}
    </ul>
  )
}

export default CategoryList;
const categories = [
    { id: 1, name: "web Development"},
    { id: 7, name: "technology" },
    {id: 4, name: "business"},
    { id: 8, name: "fitness"},
    { id: 9, name: "travel" },
    { id: 45, name: "relationship" },
    { id: 10, name: "food & Cooking" },
    { id: 11, name: "sports & Fitness" },

  ];
  