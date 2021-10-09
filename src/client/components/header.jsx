import React from 'react'
import PropTypes from 'prop-types'

const Header = ({selectedItems,dietCount}) => {
    return (
        <div className="menu-summary">
            <div className="container">
                <div className="row">
                    <div className="col-6 menu-summary-left">
                    <span>{selectedItems.length} items</span>
                    </div>
                    <div className="col-6 menu-summary-right">
                    {
                        dietCount && Object.entries(dietCount).map(([key, value]) => {
                        //console.log("---------------------"+key+"---------------------"+value);
                        return (<span key={key}>{value}x <span className="dietary">{key}</span></span>)
                        })
                    }
                    </div>
                </div>
            </div>
      </div>
    )
}

Header.propTypes = {
    selectedItems:PropTypes.arrayOf(PropTypes.object),
    dietCount: PropTypes.object
}

export default Header


