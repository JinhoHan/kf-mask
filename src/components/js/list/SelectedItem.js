/*global kakao*/
import React from 'react';

import '../../css/list/SelectedItem.css';

import { Card, CardTitle } from 'reactstrap';



class SelectedItem extends React.Component {

    componentDidMount() {
        const { lat, lng, name } = this.props;

        /*
         *      지도 생성
         */
        // ===================================================================================================
        // 지도를 표시할 div container
        const mapContainer = document.getElementById('map');
        let mapOption = {
            // 지도의 중심좌표
            center: new kakao.maps.LatLng(lat, lng),
            // 지도의 확대 레벨
            level: 4
        };

        // 지도를 표시할 div 와 지도 옵션으로 지도를 생성
        const map = new kakao.maps.Map(mapContainer, mapOption);
        // ===================================================================================================



        /*
         *      중심 좌표(나의 위치) 커스텀 마커 이미지 생성 맟 마커 출력
         */
        // ===================================================================================================
        // 마커가 표시될 위치
        const markerPosition = new kakao.maps.LatLng(lat, lng);
        // 마커이미지의 주소
        const centerImageUrl = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png';
        // 마커이미지의 크기
        const centerImageSize = new kakao.maps.Size(40, 44);
        // 마커이미지의 옵션. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정
        const centerImageOption = null;

        // 마커의 이미지 정보로 마커이미지 객체 생성
        const centerMarkerImage = new kakao.maps.MarkerImage(centerImageUrl, centerImageSize, centerImageOption);
        
        // 마커 생성
        let marker = new kakao.maps.Marker ({
            position: markerPosition,
            image: centerMarkerImage
        });
        
        // 지도 위에 마커 표시
        marker.setMap(map);
        // ===================================================================================================
        


        /*
         *      커스텀 오버레이에 표출될 내용(HTML 문자열이나 document element 사용) 작성 및 생성
         */
        // ===================================================================================================
        let content = document.createElement("div");
        content.className = "user__custom__overlay";

        const kakaoMapCallAddr = name + "," + lat + "," + lng;
        let html = '';
        html +=    '<a href="https://map.kakao.com/link/map/' + kakaoMapCallAddr + '" target="_blank">';
        html +=         '<span class="title">' + name + '</span>';
        html +=     '</a>';

        content.innerHTML = html;
        
        // 커스텀 오버레이가 표시될 위치
        const overlayPosition = marker.getPosition();
        
        // 커스텀 오버레이 생성
        new kakao.maps.CustomOverlay ({
            map: map,
            position: overlayPosition,
            content: content,
            yAnchor: 0.3
        });
        // ===================================================================================================
    }

    
    render() {
        const { geo, name, addr, remain_stat, stock_at, lat, lng, getDistanceFromLatLonInKm } = this.props;

        return (
            <div>
                <Card className={`innerbody__ user__selected__item`}>
                    <CardTitle className={`user__selected__mask__store__name`}>{name}</CardTitle>

                    <CardTitle className={`distance__ user__selected__item`}>{getDistanceFromLatLonInKm(geo[0], geo[1], lat, lng)} km</CardTitle>

                    <CardTitle className={`user__selected__mask__addr`}>{addr}</CardTitle>

                    <CardTitle className={`user__selected__mask__remain`}>
                        <div className={`user__selected__mask__remain__color`}></div>
                        <div className="user__selected__mask__remain__text">
                            재고 :
                                {remain_stat === 'plenty' ? ' 100개 이상' :
                                (remain_stat === 'some' ? ' 30개 이상 100개미만' :
                                    (remain_stat === 'few' ? ' 2개 이상 30개 미만' :
                                        (remain_stat === 'empty' ? ' 1개 이하' : ' 판매중지')))}
                        </div>
                    </CardTitle>

                    <CardTitle className={`user__selected__mask__stock`}>
                        입고시간 : {stock_at === null ? '입고정보없음' : stock_at}
                    </CardTitle>
                </Card>
                <Card id="map" className="kakao__map"></Card>
            </div>
        );
    }
}

export default SelectedItem;