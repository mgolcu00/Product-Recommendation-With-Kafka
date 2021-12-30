import React from 'react'

export const ProductOwerview = (props) => {
    const { product } = props
    return (
        <div className="card" width="200" height="300" >
            <img src={product.image} width="200" height="300" class="card-img-top" alt="..." />
            <div class="card-body">
                <h5 class="card-title">{product.name}</h5>
                <p class="card-text">₺{product.price}</p>
                <button class="btn btn-primary"  onClick={()=>{props.addToCart()}}>Add To Cart</button>
            </div>
        </div>
    )
}
