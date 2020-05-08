import React from 'react';
import '../../css/list/Item.css';

import { Card, CardTitle } from 'reactstrap';



class Item extends React.Component {

    render() {
        const { geo, item, getDistanceFromLatLonInKm, handleClick } = this.props;
        
        const { name, addr, remain_stat, stock_at, lat, lng } = item;


        return (
            <div className={`card__item__box ${remain_stat}`} >
                <Card className={`card__item__innerbody ${remain_stat}`} onClick={() => handleClick(item)}>
                    <div className="mask__store__header">
                        <CardTitle className={`mask__store__name ${remain_stat}`}>{name}</CardTitle>

                        <CardTitle className="mask__store__distance">{getDistanceFromLatLonInKm(geo[0], geo[1], lat, lng)} km</CardTitle>
                    </div>

                    <CardTitle className={`mask__store__addr ${remain_stat}`}>{addr}</CardTitle>
                    {/* <CardText>{addr}</CardText> */}
            
                    <CardTitle className={`mask__store__remain ${remain_stat}`}>
                        <div className={`mask__store__remain__color ${remain_stat}`}></div>
                        <div className="mask__store__remain__text">
                            재고 :
                                {remain_stat === 'plenty' ? ' 100개 이상' :
                                (remain_stat === 'some' ? ' 30개 이상 100개미만' :
                                    (remain_stat === 'few' ? ' 2개 이상 30개 미만' :
                                        (remain_stat === 'empty' ? ' 1개 이하' : ' 판매중지')))}
                        </div>
                    </CardTitle>

                    <CardTitle className={`mask__store__stock ${stock_at === null ? 'none_stock' : 'ok_stock'} ${remain_stat}`}>
                        입고시간 : {stock_at === null ? '입고정보없음' : stock_at}
                    </CardTitle>
                </Card>
            </div>
        );
    }
}

export default Item;