import React from 'react';
import {BrowserRouter as Router, Link, Route} from 'react-router-dom';
import './App.css';
import List from "./components/list";
import Info from "./components/info";
import CoolButton from "./components/CoolButton";

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
            change: true
        };

        this.makeQuery = this.makeQuery.bind(this);
        this.addOne = this.addOne.bind(this);
        this.minusOne = this.minusOne.bind(this);
        this.showInfo = this.showInfo.bind(this);
        // this.toDefault = this.toDefault.bind(this);
        this.makeMeActive = this.makeMeActive.bind(this);
        this.carousel = this.carousel.bind(this);
        this.max = this.max.bind(this);
        // this.changePage = this.changePage.bind(this)
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
    max = (name) => {
        let q = this.state[name].count / 10;
        return Math.ceil(q) || '...';
    };

    componentDidMount() {
        // eslint-disable-next-line array-callback-return
        this.options.map((item) => {
            this.makeQuery(item)
        });
    }

    makeQuery = (target = this.state.active) => {
        fetch(`https://swapi.co/api/${target}/?page=${this.page[this.state.active]}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    [target]: data,
                })
            });
    };

    // changePage = (choice) => {
    //     if (this.page[this.state.active] < this.max(this.state.active) && this.page[this.state.active] > 1) {
    //         if (choice === 'next') ++this.page[this.state.active];
    //         else if (choice === 'prev') --this.page[this.state.active];
    //         this.chosenOption = {
    //             people: -1,
    //             planets: -1,
    //             starships: -1,
    //             films: -1,
    //             species: -1,
    //             vehicles: -1
    //         };
    //         this.makeQuery(this.state.active)
    //     }
    // };


    addOne = () => {
        if (this.page[this.state.active] < this.max(this.state.active)) {
            this.chosenOption = {
                people: -1,
                planets: -1,
                starships: -1,
                films: -1,
                species: -1,
                vehicles: -1
            };
            ++this.page[this.state.active];
            this.makeQuery(this.state.active)
        }
    };

    minusOne = () => {
        if (this.page[this.state.active] > 1) {
            this.chosenOption = {
                people: -1,
                planets: -1,
                starships: -1,
                films: -1,
                species: -1,
                vehicles: -1
            };
            --this.page[this.state.active];
            this.makeQuery(this.state.active);
        }
    };

    makeMeActive = (e) => {
        let name = e.target.className.replace(' box', '');
        this.setState({active: name});
    };

    showInfo = (e) => {
        let number = e.target.className[e.target.className.length - 1];
        this.chosenOption[this.state.active] = parseInt(number);
        this.setState({
            change: !!this.state.change
        });
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

    carousel = () => {
        return (
            <div className={`first-stage`}>
                <Link onClick={this.minusOne} to={`/${this.state.active}/${this.page[this.state.active] + 1}`}>
                    <div className={`prev-btn main-btn`}
                         style={this.page[this.state.active] > 1
                             ? null
                             : {
                                 borderColor: `transparent rgba(243, 235, 211, 0.51) transparent transparent`,
                                 cursor: `default`
                             }}
                    />
                </Link>
                <List arr={this.state[this.state.active].results
                    ? this.state[this.state.active].results
                    : null}
                      func={this.showInfo}
                      active={this.chosenOption[this.state.active]}
                      activeOption={this.state.active}
                      currentPage={this.page[this.state.active]}
                />
                <Link onClick={this.addOne} to={`/${this.state.active}/${this.page[this.state.active] + 1}`}>
                    <div className={`next-btn main-btn`}
                         style={this.page[this.state.active] < this.max(this.state.active)
                             ? null
                             : {
                                 borderColor: `transparent transparent transparent rgba(243, 235, 211, 0.51)`,
                                 cursor: `default`
                             }}
                    />
                </Link>
            </div>
        )
    };

    render() {
        window.onpopstate = () => {
            let arr = window.location.pathname.split('/');
            this.page[arr[1]] = arr[2] || 1;
            this.chosenOption[arr[1]] = arr[3] || -1;
            this.setState({
                active: arr[1] || 'people',
            });
            this.makeQuery();
        };
        return (
            <Router>
                <div className='container'>
                    <div className="content">
                        <div className='head'>STAR WARS</div>
                        <div className="main-info">
                            <div className="options">
                                <div className={`left-column`}>
                                    {this.options.map((item, index) => {
                                        if (index < 3) {
                                            return (
                                                <CoolButton name={item}
                                                            func={this.makeMeActive}
                                                            active={this.state.active}
                                                            pages={this.page[this.state.active]}
                                                            key={item}
                                                />
                                            )
                                        } else {
                                            return '';
                                        }
                                    })}
                                </div>
                                <div className={`right-column`}>
                                    {this.options.map((item, index) => {
                                        if (index > 2) {
                                            return (
                                                <CoolButton name={item}
                                                            func={this.makeMeActive}
                                                            active={this.state.active}
                                                            pages={this.page[this.state.active]}
                                                            key={item}
                                                />
                                            )
                                        } else {
                                            return null;
                                        }
                                    })}
                                </div>
                            </div>
                            <Route path={`/${this.state.active}`} component={this.carousel}/>
                            <div
                                className={`pages`}>{`${this.page[this.state.active]} / ${this.max(this.state.active)}`}
                            </div>
                            <Info arr={this.state[this.state.active].results
                                ? this.state[this.state.active].results[this.chosenOption[this.state.active]]
                                : null}
                                  active={this.state.active}
                            />
                        </div>
                    </div>
                </div>
            </Router>
        )
    }
}

export default App;