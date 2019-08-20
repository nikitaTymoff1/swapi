import React from 'react';
import './App.css';
import List from "./components/list";
import Info from "./components/info";
import CoolButton from "./components/CoolButton";

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            people: {},
            planets: {},
            starships: {},
            active: 'people',
            change: true
        };
        this.makeQuery = this.makeQuery.bind(this);
        this.addOne = this.addOne.bind(this);
        this.minusOne = this.minusOne.bind(this);
        this.showInfo = this.showInfo.bind(this);
        this.toDefaults = this.toDefaults.bind(this);
        this.makePeopleActive = this.makePeopleActive.bind(this);
        this.makePlanetsActive = this.makePlanetsActive.bind(this);
        this.makeStarShipsActive = this.makeStarShipsActive.bind(this);
    }
    pages = {
        people: 1,
        planets: 1,
        starships: 1
    };
    lists = {
        people: -1,
        planets: -1,
        starships: -1
    };
    maximum = {
        people: 9,
        planets: 7,
        starships: 4
    };

    componentDidMount() {
        this.makeQuery(`people`);
        this.makeQuery(`planets`);
        this.makeQuery(`starships`);
    }

    makeQuery = (target = this.state.active) => {
        fetch(`https://swapi.co/api/${target}/?page=${this.pages[this.state.active]}`)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    loading: false,
                    [target]: data,
                })
            });
    };

    addOne = () => {
        if (this.pages[this.state.active] < this.maximum[this.state.active]){
            this.lists = {
                people: -1,
                planets: -1,
                starships: -1
            };
            this.pages[this.state.active]++;
            this.makeQuery(this.state.active)
        }
    };
    minusOne = () => {
        if (this.pages[this.state.active] > 1){
            this.lists = {
                people: -1,
                planets: -1,
                starships: -1
            };
            this.pages[this.state.active]--;
            this.makeQuery(this.state.active)
        }
    };
    makePeopleActive = () => {
        this.setState({active: 'people'});
    };
    makePlanetsActive = () => {
        this.setState({active: 'planets'});
    };
    makeStarShipsActive = () => {
        this.setState({active: 'starships'});
    };

    showInfo = (e) => {
        let number = e.target.className[e.target.className.length - 1];
        this.lists[this.state.active] = parseInt(number);
        this.setState({
            change: !!this.state.change
        });
    };
    toDefaults = () => {
        this.pages = {
            people: 1,
            planets: 1,
            starships: 1
        };
        this.lists = {
            people: -1,
            planets: -1,
            starships: -1
        };
        this.setState({active:'people'})
    };
    render() {
        return (
            <div className='container'>
                <div className="content">
                    <div className='head' onClick={this.toDefaults}>STAR WARS</div>
                    <div className="main-info">
                        <div className="options">
                            <CoolButton className="box people" name={`people`} func={this.makePeopleActive} active={this.state.active}>people</CoolButton>
                            <CoolButton className="box planets" name={`planets`} func={this.makePlanetsActive} active={this.state.active}>planets</CoolButton>
                            <CoolButton className="box star-ships" name={`starships`} func={this.makeStarShipsActive} active={this.state.active}>star-ships</CoolButton>
                        </div>
                        <div className={`first-stage`}>
                            <div className={`prev-btn main-btn`}
                                 style={this.pages[this.state.active] > 1
                                     ?  null
                                     :  {borderColor: `transparent rgba(243, 235, 211, 0.51) transparent transparent`,cursor: `default`}
                                 }
                                 onClick={this.minusOne}> </div>
                            <List arr={this.state[this.state.active].results
                                ? this.state[this.state.active].results
                                : null}
                                  func={this.showInfo}
                                  active={this.lists[this.state.active]}
                            />
                            <div className={`next-btn main-btn`}
                                 style={this.pages[this.state.active] < this.maximum[this.state.active]
                                     ? null
                                     :  {borderColor: `transparent transparent transparent rgba(243, 235, 211, 0.51)`,cursor: `default`}
                                 }
                                 onClick={this.addOne}> </div>
                        </div>
                        <div className={`pages`}>{`${this.pages[this.state.active]} / ${this.maximum[this.state.active]}`}</div>
                        <Info arr = {this.state[this.state.active].results
                            ? this.state[this.state.active].results[this.lists[this.state.active]]
                            : null}
                              active = {this.state.active}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

export default App;

