import React, {useEffect, useState} from 'react';
import ClassName from 'classnames'
import axios from 'axios'
import Fuse from 'fuse.js'

const Cryptolist = () => {
    const [oldList, setOldList] = useState([])
    const [list, setList] = useState([])
    const [filter, setFilter] = useState([])

    const getData = async () => {
        await axios.get('https://api.coinlore.com/api/tickers/')
            .then(res => {
                if (list === []) {
                    setOldList(res.data.data)
                }
                else {
                    setOldList(list)
                }
                
                setList(res.data.data)
                setFilter(res.data.data)
            })
    }

    useEffect(() => {
        getData()
        setInterval(() => {
            getData()
            console.log('Ten Seconds have passed.')
        }, 10000)
    }, [])

    

    const search = event => {
        const options = {
            keys: ['name', 'rank', 'symbol']
        }
        const fuse = new Fuse(list, options)
        const result = fuse.search(event.target.value)
        
        if (event.target.value === '') {
            setFilter(list)
        }
        else {
            setFilter(result)
        }
    }

    return (
        <>
            <input className="input-group" type="text" onChange={search} placeholder="Enter a crypto-currency..." />
            
            <ul className="list nomargin">
                {filter.map((item, i) => {
                    return (
                        <li className={`center unit`} key={i}>
                            <h1>{item.name} | {item.symbol}</h1>
                            <hr></hr>
                            <div>
                                <p>
                                    Price: {item.price_usd}
                                </p>
                                <p>
                                    Change in last hour: {item.percent_change_1h}
                                </p>
                                <p>
                                    Change in last 24 hours: {item.percent_change_24h}
                                </p>
                                <p>
                                    Change in last 7 days: {item.percent_change_7d}
                                </p>
                            </div>
                        </li>
                    )
                })}    
            </ul>
        </>
    );
}

export default Cryptolist;
