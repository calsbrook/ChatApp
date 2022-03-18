import React, { useState, useEffect } from 'react';

function Image(props){
    const [imageSource, setImageSource] = useState("");
    useEffect(()=> {
        const reader = new FileReader();
        reader.readAsDataURL(props.blob);
        reader.onloadend = function () {
            setImageSource(reader.result)
        }
    }, [props.blob]);
    return (
        <img style={{width:150, height: "auto"}} src={imageSource} alt="picture"/>
    );
}

export default Image;
