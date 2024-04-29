import { useState, useEffect } from 'react';
import { Spin, Pagination, Image, Flex, Card } from "antd";
import type { PaginationProps } from 'antd';
import Meta from 'antd/es/card/Meta';


interface Haircut {
    src: string,
    title: string
}



function Gallery() {
    const [images, setImages] = useState<Haircut[]>([])
    const [pageSize, setPageSize] = useState(10)
    const [currentPage, setCurrentPage] = useState(1)

    const onShowSizeChange: PaginationProps['onShowSizeChange'] = (current, pageSize) => {
        setPageSize(pageSize)
        console.log(current, pageSize);
    };

    const onPageChange: PaginationProps['onChange'] = (page) => {
        setCurrentPage(page)

    }

    useEffect(() => {
        // This took a while to learn how to do, probably should have just setup a quick go server to serve these LOL.
        // https://vite-workshop.vercel.app/glob-import#:~:text=Here%20are%20some%20ways%20that%20I%20tend%20to,the%20same%20tests%20over%20all%20of%20them.%20
        const fetchImages = async () => {
            try {
                const imageFiles = import.meta.glob('../../public/haircuts/*.jpg', { eager: true, query: '?url', import: 'default' })

                const haircuts: Haircut[] = [];

                for (const file of Object.entries(imageFiles)) {
                    const title = file[0].split('/')[4].split('.')[0].split('-').join(' ')
                    haircuts.push({
                        src: (file[1] as string).replace('/public', ''),
                        title: title
                    })
                }
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


    const firstIndex = (currentPage - 1) + ((currentPage - 1) * (pageSize - 1))
    const lastIndex = firstIndex + pageSize // Slice at 10 will return 0-9

    console.log(currentPage - 1)
    console.log(firstIndex, lastIndex)

    return (
        // TODO: Make images smaller and clickable to view.
        <div>
            <h2>Haircuts Gallery</h2>

            {images.slice(firstIndex, lastIndex).map((image, index) => (
                <Flex key={index} wrap='wrap'>
                    <Card style={{ width: '25%' }} hoverable cover={<Image width={'100%'} src={image.src} alt={image.title} />}>
                        <Meta description={image.title} />
                    </Card>
                </Flex>
            ))}
            <Pagination
                showSizeChanger
                onShowSizeChange={onShowSizeChange}
                onChange={onPageChange}
                defaultCurrent={1}
                total={images.length}
            />
        </div>
    )
}

export default Gallery
