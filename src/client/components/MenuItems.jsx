import React from 'react';
import PropTypes from 'prop-types'

function MenuItems({selectedItems,removeSelectedItem}) {
    return (
        <div className="col-8">
            <h2>Menu preview</h2>
            {
              !selectedItems.length && <span>No menu items selected</span> 
            }
            <ul className="menu-preview">
              
              {
                selectedItems && selectedItems.length && selectedItems.map(selectedItem => {
                  return (
                    <li className="item" key={selectedItem.id}>
                      <h2>{selectedItem.name}</h2>

                      {
                        !selectedItem.dietaries && <span> No dietaries available.</span>
                      }
                      <p>
                        {
                          selectedItem.dietaries.length && selectedItem.dietaries.map((dietary, index)=> {
                            return (
                              <span className="dietary" key={index}>{dietary}</span>
                            )
                          })
                        }
                      </p>
                      <button className="remove-item" onClick={(e) => removeSelectedItem(e,selectedItem)}>x</button>
                    </li>
                  )
                })
              }
              
            </ul>
        </div>
    )
}

MenuItems.propTypes = {
    selectedItems: PropTypes.arrayOf(PropTypes.object),
    removeSelectedItem: PropTypes.func
}

export default MenuItems

