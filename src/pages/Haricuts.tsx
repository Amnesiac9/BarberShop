import React, { useState, useEffect } from 'react';


interface Haircut {
    src: string,
    title: string
}

function Haircuts() {
    const [images, setImages] = useState<Haircut[]>([])

    useEffect(() => {
        const fetchImages = async () => {
            try {
                console.log("Fetching haircuts...")
                const imageFiles = import.meta.glob('../../public/haircuts/*.jpg')

                console.log(imageFiles)

                const haircuts: Haircut[] = [];

                for (const obj of Object.entries(imageFiles)) {
                    console.log("Obj:", obj)
                    obj[1]().then((webp) => {
                        haircuts.push({
                            src: (webp as string),
                            title: obj[0]
                        })
                    })
                }


                console.log(haircuts.length)

                setImages(haircuts)



            } catch (error) {
                console.error("while trying to load images: ", error)
            }



        }
        fetchImages()
    }, [])





    return (
        <div>
            <h2>Image List</h2>
            <ul>
                {images.map((image, index) => (
                    <li key={index}>
                        <img src={image.src} alt={image.title} />
                        <p>{image.title}</p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Haircuts
