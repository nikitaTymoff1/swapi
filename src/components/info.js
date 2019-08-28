import React from 'react';

class Info extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.withoutIgnored=this.withoutIgnored.bind(this)
    }
    ignore = [
        'homeworld',
        'films',
        'species',
        'vehicles',
        'starships',
        'residents',
        'pilots',
        'MGLT',
        'people',
        'created',
        'edited',
        'url',
        'planets',
        'characters',
        'manufacturer'
    ];

    withoutIgnored = (arr1,arr2) =>{
        let ret = [];
        for(let i in arr1) {
            if(arr2.indexOf(arr1[i]) === -1){
                ret.push(arr1[i]);
            }
        }
        return ret;
    };
    arr;

    render() {
        if (this.props.arr) {
            return (
                <ul className={`info`}>
                    {this.withoutIgnored(Object.keys(this.props.arr),this.ignore).map(item => {
                        let str = item.replace('_',' ');
                        let capitalStr = str.charAt(0).toUpperCase() + str.slice(1);
                        return(
                            <li key = {item}>{capitalStr + ": " + this.props.arr[item]}</li>
                        )
                    })}
                </ul>
            );
        }
        else{
            return '';
        }
    }
}

export default Info;