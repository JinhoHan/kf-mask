/*global kakao*/
import React from 'react';

import '../../css/map/ItemMapList.css';
import '../../css/map/MapOverlay.css';




class ItemMapList extends React.Component {

    componentDidMount() {
        this.getKakaoMapMarkers();
    }

    getKakaoMapMarkers = () => {

        // 클릭한 마커를 담을 변수
        let selectedItemMarker = null;

        // 생성된 overlay 를 담을 변수
        let createdItemOverlay = null;

        const { geo, items, getDistanceFromLatLonInKm } = this.props;

        

        /*
         *      지도 생성
         */
        // ===================================================================================================
        const lat = geo[0];
        const lng = geo[1];
        const mapContainer = document.getElementById("map__List");

        let mapOption = {
            // 지도 중심좌표
            center: new kakao.maps.LatLng(lat, lng),
            // 지도 확대 레벨
            level: 4
        }
        // 지도 생성
        const map = new kakao.maps.Map(mapContainer, mapOption);
        // ===================================================================================================



        /*
         *      중심 좌표(나의 위치) 커스텀 마커 이미지 생성 및 마커 출력
         */
        // ===================================================================================================
        // 중심 좌표 마커가 표시될 위치
        const markerPosition = new kakao.maps.LatLng(lat, lng);
        // 마커이미지의 주소
        const centerImageUrl = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png';
        // 마커이미지의 크기
        const centerImageSize = new kakao.maps.Size(32, 34);
        // 마커이미지의 옵션. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정
        const centerImageOption = {
            offset: new kakao.maps.Point(27, 69)
        };

        // 마커의 이미지 정보로 마커이미지 객체 생성
        const centerMarkerImage = new kakao.maps.MarkerImage(centerImageUrl, centerImageSize, centerImageOption);
        
        // 마커 생성
        new kakao.maps.Marker ({
            // 마커를 표시할 지도
            map: map,
            // 마커의 위치
            position: markerPosition,
            // 마커 이미지
            image: centerMarkerImage
        });
        // ===================================================================================================



        /*
         *      약국 리스트
         */
        // ===================================================================================================
        let positions = items;
        // ===================================================================================================



        /*
         *      마커 이미지 주소 모음
         */
        // ===================================================================================================
        // http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png
        // http://t1.daumcdn.net/mapjsapi/images/2x/marker.png
        // https://k.kakaocdn.net/dn/1aitv/btqC3NxkUjj/kZKQNSCjnxYS0lorLaiiM0/img.png
        // http://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png
        // https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markers_sprites2.png
        // https://i1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png
        // ===================================================================================================



        /*
         *      중심 좌표(나의 위치) 주변 약국 리스트 마커 이미지 생성
         */
        // ===================================================================================================
        // 마커이미지 주소
        const storesImageUrl = 'https://t1.daumcdn.net/mapjsapi/images/2x/marker.png';
        // 마커이미지 사이즈
        const storesImageSize = new kakao.maps.Size(32, 34);
        // 마커이미지의 옵션. 마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정
        const storesImageOption = null;

        // 마커의 이미지 정보로 마커이미지 객체 생성
        const storesMarkerImage = new kakao.maps.MarkerImage(storesImageUrl, storesImageSize, storesImageOption);
        // ===================================================================================================
        


        /*
         *      마커와 커스텀오버레이 생성
         */
        // ===================================================================================================
        const makeMarkerAndCustomOverlay = (item) => {
            
            // 마커가 표시될 위치(위도&경도 설정)
            const maskStoreLatLng = new kakao.maps.LatLng(item.lat, item.lng);
            
            // 마커 생성
            const maskStoreMarker = new kakao.maps.Marker ({
                map: map,
                position: maskStoreLatLng,
                image: storesMarkerImage
            });

            // 마커 위에 커스텀오버레이 설정
            // 마커를 중심으로 커스텀오버레이를 표시하기 위해 CSS를 이용하여 위치 설정
            let customOverlay = new kakao.maps.CustomOverlay ({
                // clickable: true,
                // xAnchor: 0.5,
                yAnchor: 0.7,
                zIndex: 3,
                // content: content,
                map: map,
                position: maskStoreLatLng
            });

            // 카카오맵보기 주소
            const kakaoMapCallAddr = item.name + "," + item.lat + "," + item.lng;

            // 커스텀오버레이 HTML
            let content = '';
            content +=  '<div class="item__map__list__box size__300">';
            content +=      '<a class="kakao__map__open" href="https://map.kakao.com/link/map/' + kakaoMapCallAddr + '" target="_blank">';
            content +=          '';
            content +=      '</a>';
            content +=      '<div id="size__85__per" class="item__map__list__item '+ item.remain_stat + ' size__85__per">';
            content +=          '<div class="item__map__list__innerbody ' + item.remain_stat + ' card left__only__round">';
            content +=              '<div class="item__map__list__store__">';
            content +=                  '<div class="item__map__list__store__name ' + item.remain_stat + ' card__title">';
            content +=                      item.name;
            content +=                  '</div>';
            content +=                  '<div class="item__map__list__store__distance card__title">';
            content +=                      getDistanceFromLatLonInKm(geo[0], geo[1], item.lat, item.lng) + ' km';
            content +=                  '</div>';
            content +=              '</div>';
            content +=              '<div class="item__map__list__store__addr ' + item.remain_stat + ' card__title">';
            content +=                  item.addr;
            content +=              '</div>';
            content +=              '<div class="item__map__list__store__remain ' + item.remain_stat + ' card__title">';
            content +=                  '<div class="item__map__list__store__remain__color ' + item.remain_stat + '"></div>';
            content +=                  '<div class="item__map__list__store__remain__text">';
            content +=                      '재고 : ' + (item.remain_stat === 'plenty' ? ' 100개 이상' :
                                                            (item.remain_stat === 'some' ? ' 30개 이상 100개미만' :
                                                                (item.remain_stat === 'few' ? ' 2개 이상 30개 미만' :
                                                                    (item.remain_stat === 'empty' ? ' 1개 이하' : ' 판매중지'))))
            content +=                  '</div>';
            content +=              '</div>';
            content +=              '<div class="item__map__list__store__stock ' + item.remain_stat + ' card__title ' + (item.stock_at === null ? 'none_stock' : 'ok_stock') + '">';
            content +=                  '입고시간 : ' + (item.stock_at === null ? '입고정보없음' : item.stock_at);
            content +=              '</div>';
            content +=          '</div>';
            content +=      '</div>';
            content +=  '</div>';

            // 마커 클릭 이벤트 설정
            kakao.maps.event.addListener(maskStoreMarker, 'click', function() {
                // 클릭된 마커가 없거나 기존 클릭된 마커와 다른 마커를 클릭할 경우
                if(!selectedItemMarker || selectedItemMarker !== maskStoreMarker) {
                    !!selectedItemMarker && createdItemOverlay.setMap(null);

                    customOverlay.setContent(content);
                    customOverlay.setMap(map);

                    // 클릭된 마커&커스텀오버레이를 현재 클릭된 마커&커스텀오버레이 객체로 설정
                    selectedItemMarker = maskStoreMarker;
                    createdItemOverlay = customOverlay;
                }

                // 커스텀오버레이 닫기
                document.getElementById('size__85__per').onclick = function() {
                    createdItemOverlay.setMap(null);
                    createdItemOverlay = null;
                    selectedItemMarker = null;
                }
            });
        }
        // ===================================================================================================



        /*
         *      내 주변 약국 리스트 마커 출력
         */
        // ===================================================================================================
        for(let nIdx = 0; nIdx < positions.length; nIdx++) {
            // 마커와 커스텀오버레이 생성
            makeMarkerAndCustomOverlay(positions[nIdx]);
        }
        // ===================================================================================================
    }


    render() {
        return (
            <div className={`item__map__list`}>
                <div id="map__List"></div>
            </div>
        );
    }
}

export default ItemMapList;