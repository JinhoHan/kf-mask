import React from 'react';

import Accept from './components/js/Accept';
import Header from './components/js/Header';
import ItemList from './components/js/list/ItemList';
import SelectedItemBox from './components/js/list/SelectedItemBox';
import ItemMapList from './components/js/map/ItemMapList';




// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';



class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			// 유저 GPS 위치정보(위도, 경도)
			geo: [],
			// 유저가 입력한 주소정보
			address: [],
			// GPS 또는 주소 정보기준 검색 거리 설정(기본 1km 설정)
			distance: 1000,
			// GPS 또는 주소 정보, 검색 거리를 바탕으로 조회된 마스크 판매처를 담을 배열
			items: [],
			// 목록상에서 선택된 아이템(마스크 판매처)
			selectedItemInTheList: null,
			// 지도상에서 선택된 아이템(마스크 판매처)
			selectedItemOnTheMap: null,
			// 위치정보확인
			acceptLocationInformation: true
		}
	}

	componentDidMount() {
		if (this.state.acceptLocationInformation) {
			this.getGeoLocation();
		}
	}

	// 사용자 GPS 정보를 가져오는 함수
	getGeoLocation = () => {
		if (!navigator.geolocation) {
			alert("현재 위치 찾기를 지원하지 않는 브라우저 입니다. 혹은 설정에서 위치정보 접근 권한을 허용해주세요!");
		} else {
			this.setState({ address: null });
			navigator.geolocation.getCurrentPosition(this.handleSuccess, this.handleError);
		}
	}

	// 사용자 GPS 정보를 가져오는데 실패할 경우 처리 함수
	handleError = (error) => {
		alert("현재 위치를 받아오는데 실패하였습니다");
		return;
	}

	// 사용자 GPS 정보를 가져오는데 성공할 경우 처리 함수
	handleSuccess = (position) => {
		// console.log(position);
		if (position !== null) {
			const geo = [position.coords.latitude, position.coords.longitude];
			this.setState({ geo: geo });
		}

		let url = "https://8oi9s0nnth.apigw.ntruss.com/corona19-masks/v1/storesByGeo/json?lat=" + this.state.geo[0] + "&lng=" + this.state.geo[1] + "&m=" + this.state.distance;

		fetch(url)
			.then(res => {
				if (!res.ok) {
					throw new Error(res.status);
				}
				return res.json();
			})
			.then(mask => this.setState({ items: mask.stores }))
			.catch(err => console.log(err))
	}

	// 사용자 GPS 정보를 토대로 한 위치와 마스크 판매처 간의 거리 구하는 함수
	getDistanceFromLatLonInKm = (userLat, userLng, marketLat, marketLng) => {
		// Radius of the earth in km
		const R = 6371;
		// degreesToRadians below
		const dLat = this.getDegreesToRadians(marketLat - userLat);
		const dLon = this.getDegreesToRadians(marketLng - userLng);
		const a = Math.sin(dLat / 2) * Math.sin(dLat / 2)
			+ Math.cos(this.getDegreesToRadians(userLat)) * Math.cos(this.getDegreesToRadians(marketLat)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		// Distance in km
		let d = R * c;
		d = d.toFixed(2);

		return d;
	}

	// 라디안 값 구하는 함수
	getDegreesToRadians = (deg) => {
		return deg * (Math.PI / 180);
	}

	// 마스크 판매처 목록에서 하나의 판매처를 클릭할 경우 처리하는 함수
	handleClick = (item) => {
		this.setState({ selectedItemInTheList: item });
	}

	// 선택된 판매처를 선택해제 하는 함수
	handleRemove = () => {
		this.setState({ selectedItemInTheList: null });
	}

	// 위치정보동의 처리 함수
	getAcceptLocationInformation = (bool) => {
		console.log(bool);
		if(bool === true) {
			// this.state.acceptLocationInformation 값이 변경된 이후에 함수 실행하도록 한다.
			this.setState({ acceptLocationInformation: bool }, (state) => {
				this.getGeoLocation();
			});
		}
	}

	// 사용자 입력 주소기반 GPS로 마스크 판매처 목록 정보 변경
	getAddressToGeoLocation = (addressObject) => {
		if(addressObject !== null) {
			this.setState({ address: addressObject.roadAddress });
			this.handleSuccess(addressObject);
		}
	}

	// 사용자 GPS 기반으로 반경 거리에 변경에 따른 마스크 판매처 목록 정보 변경
	getDistanceToUser = (distanceObject) => {
		if(this.state.distance !== distanceObject) {
			let distance = distanceObject *1;
			this.setState({ distance: distance }, (state) => {
				// console.log(this.state.distance);
				this.handleSuccess(null);
			});
		}
	}


	render() {
		return (
			<Router basename={process.env.PUBLIC_URL} >
				<Switch>

					{
						this.state.acceptLocationInformation &&
						<Route path="/list" component={() => 
							<>
								<Header 
									geo={this.state.geo}
									distance={this.state.distance}
									address={this.state.address}
									getGeoLocation={this.getGeoLocation}
									getAddressToGeoLocation={this.getAddressToGeoLocation}
									getDistanceToUser={this.getDistanceToUser}
								/>
								<ItemList
									geo={this.state.geo}
									items={this.state.items}
									getDistanceFromLatLonInKm={this.getDistanceFromLatLonInKm}
									handleClick={this.handleClick} />
								{
									this.state.selectedItemInTheList && <SelectedItemBox
																			geo={this.state.geo}
																			selectedItemInTheList={this.state.selectedItemInTheList}
																			getDistanceFromLatLonInKm={this.getDistanceFromLatLonInKm}
																			handleRemove={this.handleRemove} />
								}
							</>
						} 
						/>
					}

					{
						this.state.acceptLocationInformation &&
						<Route path="/map" component={() => 
							<>
								<Header 
									geo={this.state.geo}
									distance={this.state.distance}
									address={this.state.address}
									getGeoLocation={this.getGeoLocation}
									getAddressToGeoLocation={this.getAddressToGeoLocation}
									getDistanceToUser={this.getDistanceToUser}
								/>
								<ItemMapList
									geo={this.state.geo}
									items={this.state.items}
									getDistanceFromLatLonInKm={this.getDistanceFromLatLonInKm}
								/>
							</>
						}
						/>
					}


					{
						<Route path="/" component={() => 
							<Accept 
								getAcceptLocationInformation={this.getAcceptLocationInformation}
							/>
						}
						/>
					}

				</Switch>
			</Router>
		);
	}
}

export default App;