import React from 'react';
import Item from './Item';

import '../../css/list/ItemList.css';


class ItemList extends React.Component {

    render() {
        const { geo, items, getDistanceFromLatLonInKm, handleClick } = this.props;

        const itemList = items.map(
            ( item ) => (
                <Item
                    geo={geo}
                    item={item}
                    key={item.code}
                    getDistanceFromLatLonInKm={getDistanceFromLatLonInKm}
                    handleClick={handleClick} />
            )
        )

        return (
            <div className="item__list">
                {itemList}
            </div>
        );
    }
}

export default ItemList;