/*global kakao*/
import React, { useState } from 'react';
import { Link } from "react-router-dom";

import '../css/Header.css';
import '../css/HeaderModal.css';

import { Navbar, Button } from 'reactstrap';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';



const Header = ({ getGeoLocation, getAddressToGeoLocation, address, distance, getDistanceToUser }) => {

    // Modal Open&Close
    let [ modal, setModal ] = useState(false);
    const modalToggle = () => {
        setModal(!modal);
    }

    // 거리 설정
    let [ userDistance, setUserDistance ] = useState(distance);
    const handleDistanceChange = (event) => {
        let selectedValue = event.target.value;
        selectedValue = selectedValue * 1;
        setUserDistance(selectedValue);
    }

    const handleKakaoPostService = () => {
        new window.daum.Postcode({
            oncomplete: function(data) {
                // 길 최종 주소
                const roadAddress = data.roadAddress;

                // 주소-좌표 변환 객체 생성
                let geocoder = new kakao.maps.services.Geocoder();

                // 주소로 좌표를 검색
                geocoder.addressSearch(data.roadAddress, function(result, status) {
                    if(status === kakao.maps.services.Status.OK) {
                        let position = {
                            coords: {
                                latitude: result[0].y,
                                longitude: result[0].x
                            },
                            roadAddress: roadAddress
                        }
                        getAddressToGeoLocation(position);
                    }
                });
            }
        }).open();
    }


    return (
        <>
            <Navbar className="navbar fixed-top navbar-light bg-light white" >
                <div className="header__title">
                    <div id="my__location" className="header__text" onClick={() => handleKakaoPostService()}>
                        {address !== null ? address : '내 위치'}
                    </div>
                    <div className="gps__button" onClick={() => getGeoLocation()}>
                        <img className="gps__icon" src="https://k.kakaocdn.net/dn/bkl7up/btqC48UZVoy/iu1sMcCNmjuYAlZ4zW8qHK/img.png" alt="" />
                    </div>
                </div>
                <div className="user__custom__button__box">
                    <Link className="btn btn-sm btn-primary user__toggle__button" to="/list">목록보기</Link>
                    <Link className="btn btn-sm btn-danger user__toggle__button" to="/map">지도보기</Link>
                    <Button className="user__custom__button btn-sm filter" onClick={modalToggle}>
                        필터&nbsp;
                            <svg className="bi bi-filter" width="1.5em" height="1.5em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" d="M2 10.5a.5.5 0 01.5-.5h3a.5.5 0 010 1h-3a.5.5 0 01-.5-.5zm0-3a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5zm0-3a.5.5 0 01.5-.5h11a.5.5 0 010 1h-11a.5.5 0 01-.5-.5z" clipRule="evenodd" />
                            </svg>
                    </Button>
                </div>
            </Navbar>
            <Modal className="user__modal" returnFocusAfterClose={false} isOpen={modal} fade={false}>
                <ModalHeader>내 주변 마스크는 어디에?</ModalHeader>
                <ModalBody>
                    <div>
                        <div className="user__select__distance__title">
                            검색 반경
                        </div>
                        <div className="user__select__distance__box">
                            <select id="user__select__distance__selected" className="btn btn-outline-secondary btn-lg user__select__distance__selected" value={userDistance} onChange={handleDistanceChange}>
                                <option className="" value="1000">1km</option>
                                <option className="" value="2000">2km</option>
                                <option className="" value="5000">5km</option>
                            </select>
                        </div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => {
                        // console.log(document.getElementById('user-distance-select').value);
                        modalToggle();
                        getDistanceToUser(userDistance);
                    }}>
                        완료
                    </Button>
                </ModalFooter>
            </Modal>
        </>
    );
};

export default Header;