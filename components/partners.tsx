import { useRef } from "react";
import styled from "styled-components";
import { Rerousel } from 'rerousel';
import Link from "next/link";

export const PartnerBox = styled.div`
        width: 100%;
    `;

export const ImagePointer = styled.div`
    cursor: pointer;
    `;

export const Item = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        width: calc(100%/4);
        height: 100px;
        font-family: Signika;
        font-weight: bold;
        font-size: 1.5em;
        
        @media(max-width: 1150px) {
            width: calc(100%/3);
        }

        @media(max-width: 800px) {
            width: calc(100%/2);
        }
    `;

export const Partners = () => {

    const ref = useRef(null);

    return (
        <PartnerBox>
            <h2>Partners</h2>
            <Rerousel itemRef={ref}>
                <Item ref={ref}><img src={`/icons/emission-icon.png`} width="80" alt="token emission" /></Item>
                <Item><img src={`/icons/mint-icon.png`} width="80" alt="token mint nft" /></Item>
                <Item>
                    <Link href={`https://github.com/solidproof/projects/tree/main/Safu_Protocol`} passHref={true}>
                        <ImagePointer><img src={`/icons/solidproof.png`} width="80" alt="solidproof audit" /></ImagePointer>
                    </Link>
                </Item>
                <Item><img src={`/icons/mint-icon.png`} width="80" alt="token mint nft" /></Item>
                <Item><img src={`/icons/mint-icon.png`} width="80" alt="token mint nft" /></Item>
            </Rerousel>
        </PartnerBox>
    );
};