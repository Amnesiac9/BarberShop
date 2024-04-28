import { ReactNode } from "react";
import Card from "../components-styled/Card.styled";
import StyledImage from "../components-styled/Img.styled";
import TextSide from "../components-styled/TextSide.styled";

//TODO: Make responsive
function CarouselItem(props: { src?: string | undefined, alt?: string | undefined, children?: ReactNode | undefined, contentSide?: string | undefined }) {

    return (
        <Card $flexDirection='row' $size="large" $noShadow>
            {props.children && props.contentSide != 'right' && (<TextSide>{props.children}</TextSide>)}
            <StyledImage src={props.src}></StyledImage>
            {props.children && props.contentSide === 'right' && (<TextSide>{props.children}</TextSide>)}
        </Card>
    )

}

export default CarouselItem
