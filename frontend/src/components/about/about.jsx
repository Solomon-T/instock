import React from 'react';
import './about.css';

class About extends React.Component {

    render() {
        return(
            <div id="about-container">
                <span className="modal-closer-button" onClick={this.props.closeModal}>
                    <i className="fas fa-times"></i>
                </span>

                <br/>
                <br/>

                <div id="just-the-four-of-us">

                <div>
                    <img className="profile-pic" src="./ben.jpg"></img>
                    <div className="profile-text">
                            <a className="profile-link" href="https://benhsieh-dev.github.io/" target="_blank">Ben Hsieh</a> is a New York based software engineer who enjoys playing guitar and investing in the stock market.
                    </div>
                </div>

                <br></br>

                <div>
                    <img className="profile-pic" src="./jared.jpg"></img>
                    <div className="profile-text">
                            <a className="profile-link" href="https://jmkaneshiro.github.io/" target="_blank">Jared Kaneshiro</a> is a software engineer based in New York, versed in the healthcare business, and a former QA lead at One Medical.
                    </div>
                </div>

                <br></br>

                <div>
                    <img className="profile-pic" src="./solomon.jpeg"></img>
                    <div className="profile-text">
                            <a className="profile-link" href="https://solomon-t.github.io/" target="_blank">Solomon Manyaga</a> is a software engineer and he loves it.

                    </div>
                </div>

                <br></br>

                <div>
                    <img className="profile-pic" src="./taylor.jpg"></img>
                    <div className="profile-text">
                        <a className="profile-link" href="https://twofford.github.io/" target="_blank">Taylor Wofford</a> is a NYC-based software engineer who specializes in React, Redux, Rails and JS. He likes dogs and riding his bike.
                    </div>
                </div>

                </div>

            </div>
        )
    }
}

export default About;