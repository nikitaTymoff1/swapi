import React from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import {withRouter} from 'react-router'
import './App.css';
import Info from "./components/info";
import CoolButton from "./components/CoolButton";
import max from "./helpers/max";
import Carousel from "./components/Carousel";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            people: {},
            planets: {},
            starships: {},
            films: {},
            species: {},
            vehicles: {},
            active: 'people',
            link: '',
            change: true,
            activePage: 1,
        };

        this.makeQuery = this.makeQuery.bind(this);
        this.showInfo = this.showInfo.bind(this);
        // this.toDefault = this.toDefault.bind(this);
        this.makeMeActive = this.makeMeActive.bind(this);
        this.changePage = this.changePage.bind(this);
        this.CarouselContainer = this.CarouselContainer.bind(this);
        this.toDefaultChosenOption = this.toDefaultChosenOption.bind(this);
    }

    options = ['people', 'planets', 'starships', 'films', 'species', 'vehicles'];

    page = {
        people: 1,
        planets: 1,
        starships: 1,
        films: 1,
        species: 1,
        vehicles: 1
    };

    chosenOption = {
        people: -1,
        planets: -1,
        starships: -1,
        films: -1,
        species: -1,
        vehicles: -1
    };

    componentWillMount() {
        this.unlisten = this.props.history.listen((location, action) => {
            // let arr = location.pathname.split('/');
            // this.page[arr[1]] = arr[2] || 1;
            // this.chosenOption[arr[1]] = arr[3] || -1;
            // this.setState({
            //     active: arr[1] || 'people',
            // });
            // console.log(window.location.pathname);
        });
    }

    componentWillUnmount() {
        this.unlisten();
    }

    componentDidMount() {
        if (!this.state.people.length) {
            this.options.map((item) => {
                this.makeQuery(item)
            });
        }
        let arr = window.location.pathname.split('/');
        this.page[arr[1]] = parseInt(arr[2]) || 1;
        this.chosenOption[arr[1]] = arr[3] || -1;
        this.setState({
            active: arr[1] || 'people',
        });
    }

    makeQuery = (target = this.state.active, page = this.page[this.state.active]) => {
        fetch(`https://swapi.co/api/${target}/?page=${page}`)
            .then(response => response.json())
            .then(data => {
                this.page[target] = page;
                this.toDefaultChosenOption();
                this.setState({
                    [target]: data,
                });
            });
    };

    changePage = (choice) => {
        console.log(choice);
        if (this.page[this.state.active] < max(this.state[this.state.active]) && choice === 'next') {
            let temp = this.page[this.state.active] + 1;
            this.makeQuery(this.state.active, temp);
        } else if (this.page[this.state.active] > 1 && choice === 'prev') {
            let temp = this.page[this.state.active] - 1;
            this.makeQuery(this.state.active, temp);
        }
    };
    makeMeActive = (e) => {
        let name = e.target.className.replace(' box', '');
        this.setState({active: name});
    };

    showInfo = (e) => {
        let number = e.target.className[e.target.className.length - 1];
        this.chosenOption[this.state.active] = parseInt(number);
        this.setState({change: !!this.state.change});
    };
//
// toDefault = () => {
//     this.page = {
//         people: 1,
//         planets: 1,
//         starships: 1,
//         films: 1,
//         species: 1,
//         vehicles: 1
//     };
//     this.chosenOption = {
//         people: -1,
//         planets: -1,
//         starships: -1,
//         films: -1,
//         species: -1,
//         vehicles: -1
//     };
// };
    toDefaultChosenOption = () => {
        this.chosenOption = {
            people: -1,
            planets: -1,
            starships: -1,
            films: -1,
            species: -1,
            vehicles: -1
        };
    };
    CarouselContainer = () => {
        return (
            <Carousel
                active={this.state.active}
                page={this.page[this.state.active]}
                chosenOption={this.chosenOption}
                func={[this.changePage, this.showInfo]}
                arr={this.state[this.state.active].results}
            />
        )
    };

    render() {
        // window.onpopstate = () => {
        //     let arr = window.location.pathname.split('/');
        //     this.page[arr[1]] = arr[2] || 1;
        //     this.chosenOption[arr[1]] = arr[3] || -1;
        //     this.setState({
        //         active: arr[1] || 'people',
        //     });
        //     this.makeQuery();
        // };
        return (
            <div className="content">
                <div className='head'>STAR WARS</div>
                <div className="main-info">
                    <div className="options">
                        <div className={`left-column`}>
                            {this.options.map((item, index) => {
                                if (index < 3) {
                                    return (
                                        <CoolButton
                                            name={item}
                                            func={this.makeMeActive}
                                            active={this.state.active}
                                            pages={this.page[this.state.active]}
                                            key={item}
                                        />
                                    )
                                }
                            })}
                        </div>
                        <div className={`right-column`}>
                            {this.options.map((item, index) => {
                                if (index > 2) {
                                    return (
                                        <CoolButton
                                            name={item}
                                            func={this.makeMeActive}
                                            active={this.state.active}
                                            pages={this.page[this.state.active]}
                                            key={item}
                                        />
                                    )
                                }
                            })}
                        </div>
                    </div>
                    <Route path={`/${this.state.active}`} component={this.CarouselContainer}/>
                    <div
                        className={`pages`}>{`${this.page[this.state.active]} / ${max(this.state[this.state.active])}`}
                    </div>
                    <Info arr={this.state[this.state.active].results
                        ? this.state[this.state.active].results
                        : {}}
                          chosenOption={this.chosenOption}
                          active={this.state.active}
                    />
                </div>
            </div>

        )
    }
}

export default withRouter(App);