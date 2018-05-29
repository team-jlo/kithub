import React from 'react';

const ColorSet = (props) => {
    const productColors = props.product_colors;

    return (
        <ul className="color-set">
            {productColors.map((productColor, i) => {
                const styles = {
                    backgroundColor: productColor.hex_value
								}
								const title = productColor.colour_name
                return (
                    <li key={i}>
                        <div title={title} styles={styles} className="color-set__item">

                        </div>
                    </li>
                )
            })}
        </ul>
    )

}

export default ColorSet;