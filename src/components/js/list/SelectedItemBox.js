import React from 'react';

import '../../css/list/SelectedItemBox.css';

import SelectedItem from './SelectedItem';



class SelectedItemBox extends React.Component {

    render() {
        const { geo, selectedItemInTheList, getDistanceFromLatLonInKm, handleRemove } = this.props;

        return (
            <div>
                <div className={`user__selected__item__detail__overlay show`} onClick={handleRemove}>
                </div>
                <div className={`user__selected__item__detail show`}>
                    <SelectedItem
                        geo={geo}
                        name={selectedItemInTheList.name}
                        addr={selectedItemInTheList.addr}
                        remain_stat={selectedItemInTheList.remain_stat}
                        stock_at={selectedItemInTheList.stock_at}
                        lat={selectedItemInTheList.lat}
                        lng={selectedItemInTheList.lng}
                        id={selectedItemInTheList.code}
                        key={selectedItemInTheList.code}
                        getDistanceFromLatLonInKm={getDistanceFromLatLonInKm} />
                </div>
            </div>
        );
    }
}

export default SelectedItemBox;