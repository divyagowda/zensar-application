import React from 'react'
import PropTypes from 'prop-types'

function SideBar({items,searchHandler, itemClickHandler}) {
   
    return (
        <div className="col-4">
                <div className="filters">
                    <input className="form-control" placeholder="Name" onChange={searchHandler} />
                </div>
                <ul className="item-picker">
                    {
                        !items.length &&  <li> No items found</li>
                    }
                    {
                        items && items.length && items.map(item => (
                            <li className="item" key={item.id} onClick={(e) =>itemClickHandler(item)}>
                                <h2>{item.name}</h2>
                                <p>
                                {
                                    !item.dietaries && <span>No dietaries found.</span>
                                }
                                </p>
                                <p>
                                {
                                    item.dietaries && item.dietaries.length && item.dietaries.map((dietary,i) => (<span className="dietary" key={i}>{dietary}</span>))
                                }
                                </p>
                            </li>
                        ))
                    }
                
                </ul>
          </div>
    )
}

SideBar.propTypes = {
    items: PropTypes.arrayOf(PropTypes.object),
    searchHandler: PropTypes.func,
    itemClickHandler: PropTypes.func
}

export default SideBar

