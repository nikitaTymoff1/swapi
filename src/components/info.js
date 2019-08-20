import React from 'react';

class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        if (this.props.arr) {
            switch (this.props.active) {
                case "people":
                    return (
                        <ul className={`info`}>
                            <li>Name: {this.props.arr.name}</li>
                            <li>Height: {this.props.arr.height}</li>
                            <li>Mass: {this.props.arr.mass}</li>
                            <li>Hair color: {this.props.arr.hair_color}</li>
                            <li>Skin color: {this.props.arr.skin_color}</li>
                            <li>Eye color: {this.props.arr.eye_color}</li>
                            <li>Birth year: {this.props.arr.birth_year}</li>
                            <li>Gender: {this.props.arr.gender}</li>
                        </ul>
                    );
                case "planets":
                    return (
                        <ul className={`info`}>
                            <li>Name: {this.props.arr.name}</li>
                            <li>Rotation period: {this.props.arr.rotation_period}</li>
                            <li>Orbital period: {this.props.arr.orbital_period}</li>
                            <li>Diameter: {this.props.arr.diameter}</li>
                            <li>Climate: {this.props.arr.climate}</li>
                            <li>Gravity: {this.props.arr.gravity}</li>
                            <li>Terrain: {this.props.arr.terrain}</li>
                            <li>Surface water : {this.props.arr.surface_water}</li>
                            <li>Population: {this.props.arr.population}</li>
                        </ul>
                    );
                case "starships":
                    return (
                        <ul className={`info`}>
                            <li>Name: {this.props.arr.name}</li>
                            <li>Model: {this.props.arr.model}</li>
                            <li>Cost in credits: {this.props.arr.cost_in_credits}</li>
                            <li>Length: {this.props.arr.length}</li>
                            <li>Max atmosphering speed: {this.props.arr.max_atmosphering_speed}</li>
                            <li>Crew: {this.props.arr.crew}</li>
                            <li>Cargo capacity: {this.props.arr.cargo_capacity}</li>
                            <li>Consumables: {this.props.arr.consumables}</li>
                            <li>Hyperdrive rating: {this.props.arr.hyperdrive_rating}</li>
                            <li>MGLT: {this.props.arr.MGLT}</li>
                            <li>Starship class: {this.props.arr.starship_class}</li>
                        </ul>
                    );
                default:
                    return (<div> </div>)
            }

        } else {
            return (<div> </div>)
        }
    }
}

export default Info;