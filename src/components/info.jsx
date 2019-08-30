import React from 'react';

class Info extends React.Component {
    constructor(props) {
        super(props);
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
    render() {
        let target = this.props.arr[this.props.chosenOption[this.props.active]];
        if (target) {
            return (
                <ul className={`info`}>
                    {
                        this.withoutIgnored(Object.keys(target),this.ignore).map(item => {
                        let str = item.replace('_',' ');
                        let capitalStr = str.charAt(0).toUpperCase() + str.slice(1);
                        let description =this.props.arr[this.props.chosenOption[this.props.active]][item];
                        return(
                            <li key = {item}>{capitalStr + ": " + description}</li>
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