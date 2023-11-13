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
            <h3>Partners</h3>
            <Rerousel itemRef={ref}>
                <Item>
                    <Link href={`https://safuyield.medium.com/partnership-safu-net-x-avarta-io-7d18083ad769`} passHref={true}>
                        <ImagePointer><img src={`/icons/avarta.png`} width="100" alt="avarta" /></ImagePointer>
                    </Link>
                </Item>
                <Item>
                    <Link href={`https://github.com/solidproof/projects/tree/main/Safu_Protocol`} passHref={true}>
                        <ImagePointer><img src={`/icons/solidproof.png`} width="100" alt="solidproof audit" /></ImagePointer>
                    </Link>
                </Item>
                <Item>
                    <Link href={`https://x.com/safu_official/status/1480512003529715712?s=20`} passHref={true}>
                        <ImagePointer><img src={`/icons/troopers.svg`} width="100" alt="troppers nft" /></ImagePointer>
                    </Link>
                </Item>
                <Item>
                    <Link href={`https://unn-finance-main.medium.com/union-partners-with-safu-net-around-protection-and-technology-components-7a7faa03ca3e`} passHref={true}>
                        <ImagePointer><img src={`/icons/union.png`} width="100" alt="union partners" /></ImagePointer>
                    </Link>
                </Item>
            </Rerousel>
        </PartnerBox>
    );
};