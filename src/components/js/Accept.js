import React from 'react';
import { Link } from 'react-router-dom';

import '../css/Accept.css';



class Accept extends React.Component {

    acceptLocationCheck = (e) => {
        const { getAcceptLocationInformation } = this.props;

        if(!window.confirm("위치정보확인에 동의하시겠습니까?")) {
            e.preventDefault();
            getAcceptLocationInformation(false);
            return;
        }
        getAcceptLocationInformation(true);
    }

    render() {
        return (
            <div className="accept__box">
                <div className="accept__content">
                    <div className="accept__text">
                        내 주변 마스크는 어디에?
                    </div>
                    <div>
                        <Link id="accept__button" className="accept__button" onClick={this.acceptLocationCheck} to="/list">
                            위치정보동의
                        </Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Accept;