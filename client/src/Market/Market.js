import React, { useEffect } from 'react'
import './Market.css'

import { ProductOwerview } from '../components/ProductOwerview'
import ioClient from 'socket.io-client';
const products = require('../data/products.json')

import KafkaClient from '../lib/kafk'

export default function Market() {

    const [cart, setCart] = React.useState([])
    const [isCartOpen, setIsCartOpen] = React.useState(false)

    const kc = new KafkaClient('http://localhost:9898')
    const addToCart = (product) => {
        setCart([...cart, product])
        sendToKafka([...cart, product])
    }

    // kc.consumer('card-event-1',(data)=>{
    //     let parsed = JSON.parse(data.toString())
    //     console.log(parsed);
    //     alert(parsed.map(s=>s.output))
    // })
    // kc.consumer('card-event-2', (data) => {
    //     console.log(data);
    //     let parsed = JSON.parse(data.toString());
    //     alert(parsed)
    // })
    const removeFromCart = (product) => {
        setCart(cart.filter(p => p.id !== product.id))
    }

    const buy = () => {
        setCart([])
        setIsCartOpen(false)
        //   sendToKafka(cart)
    }

    const sendToKafka = (data) => {
        const socket = ioClient('http://localhost:9898');
        socket.on('connection',(socket)=>
        {
            console.log(socket);
           socket.on('card-event-2',(data)=>{
            console.log(data);
            alert(data)
           })
        })

        // Send the payload as a message to the Kafka cluster
        kc.producer('card-event-1', data);

    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h1>Market</h1>
                </div>
                <div className="col-12">
                    <button className="btn btn-primary" onClick={() => setIsCartOpen(!isCartOpen)}>
                        {!isCartOpen ? 'Open Cart' : 'Close Cart'}
                    </button>
                </div>
            </div>
            {isCartOpen ?
                <div className="row">
                    <div className="col-12">
                        <button className="btn btn-primary" onClick={buy}>
                            Buy
                        </button>
                    </div>
                </div>
                : null}
            {isCartOpen ?
                <div className="row">
                    {cart.map(product => (
                        <div className="col-3 item" >
                            <ProductOwerview product={product} removeFromCart={() => {
                                removeFromCart(product)
                            }
                            } />
                        </div>
                    ))}
                </div>
                :
                <div className="row">
                    {products.map(product => (
                        <div className="col-3 item" >
                            <ProductOwerview product={product} addToCart={() => {
                                addToCart(product)
                            }} />
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}
