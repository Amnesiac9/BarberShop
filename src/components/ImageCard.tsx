import { ReactNode } from "react";
import InfoCard from "../components-styled/InfoCard.styled";
import StyledImage from "../components-styled/Img.styled";
import TextSide from "../components-styled/TextSide.styled";

function ImageCard(props: { src?: string | undefined, alt?: string | undefined, children?: ReactNode | undefined, contentSide?: string | undefined }) {

    return (
        <InfoCard $flexDirection='row' $size="large" $noShadow $nowrap $wrapForMobile>
            {props.children && props.contentSide != 'right' && (<TextSide>{props.children}</TextSide>)}
            {props.src && (<StyledImage alt={props.alt} src={props.src}></StyledImage>)}
            {props.children && props.contentSide === 'right' && (<TextSide>{props.children}</TextSide>)}
        </InfoCard>
    )

}

export default ImageCard
