import { useState, useEffect } from 'react';
import { Spin } from "antd";


interface Haircut {
    src: string,
    title: string
}

function Haircuts() {
    const [haircuts, setHaircuts] = useState<Haircut[]>([])

    useEffect(() => {
        // This took a while to learn how to do, probably should have just setup a quick go server to serve these LOL.
        // https://vite-workshop.vercel.app/glob-import#:~:text=Here%20are%20some%20ways%20that%20I%20tend%20to,the%20same%20tests%20over%20all%20of%20them.%20
        const fetchImages = async () => {
            try {
                console.log("Fetching haircuts...")
                // Not sure if I should have the haircuts in assets or public, but public gives warnings from vite which is annoying.
                const imageFiles = import.meta.glob('../assets/haircuts/*.jpg', { eager: true, import: 'default' })

                const haircuts: Haircut[] = [];

                console.log(imageFiles)

                for (const file of Object.entries(imageFiles)) {
                    const title = file[0].split('/')[3].split('.')[0].split('-').join(' ')
                    const src = (file[1] as string)
                    console.log(title, src)
                    haircuts.push({
                        src: src,
                        title: title
                    })
                }


                console.log(haircuts.length)

                setHaircuts(haircuts)

            } catch (error) {
                console.error("while trying to load images: ", error)
            }



        }
        fetchImages()
    }, [])


    if (haircuts.length === 0) {
        return (<Spin size='large' />)
    }


    return (


        // TODO: paginate and limit to 10 haircuts per page
        // TODO: Make images smaller and clickable to view.
        <div>
            <h2>Haircut Gallery</h2>
            <ul>
                {haircuts.map((image, index) => (
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
