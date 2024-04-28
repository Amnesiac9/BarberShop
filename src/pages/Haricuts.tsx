import React, { useState, useEffect } from 'react';
import { Spin } from "antd";


interface Haircut {
    src: string,
    title: string
}

function Haircuts() {
    const [images, setImages] = useState<Haircut[]>([])

    useEffect(() => {
        // This took a while to learn how to do, probably should have just setup a quick go server to serve these LOL.
        // https://vite-workshop.vercel.app/glob-import#:~:text=Here%20are%20some%20ways%20that%20I%20tend%20to,the%20same%20tests%20over%20all%20of%20them.%20
        const fetchImages = async () => {
            try {
                console.log("Fetching haircuts...")
                const imageFiles = import.meta.glob('../../public/haircuts/*.jpg', { eager: true, as: 'url' })

                const haircuts: Haircut[] = [];

                for (const file of Object.entries(imageFiles)) {
                    const title = file[0].split('/')[4].split('.')[0].split('-').join(' ')
                    console.log(title)
                    haircuts.push({
                        src: file[1],
                        title: title
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


    if (images.length === 0) {
        return (<Spin size='large' />)
    }


    return (



        <div>
            <h2>Haircut Gallery</h2>
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
