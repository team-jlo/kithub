import React from 'react';

const ColorSet = (props) => {
    const productColors = props.colorSet;

    return (
        <ul className="color-set">
            {productColors.map((productColor) => {
                const styles = {
                    backgroundColor: productColor.hex_value
                }
                return (
                    <li>
                        <div styles={styles} className="color-set__item">
                        {/*
                            need to make this clickable

                            when the user selects this color, we save (only) this color variant to their wishlist/kit
                            (does the user have to select a color variant? ie. can they save the product without the color variant?)
                        */}
                        </div>
                    </li>
                )
            })}
        </ul>
    )

}

export default ColorSet;