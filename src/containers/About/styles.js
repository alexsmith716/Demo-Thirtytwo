import styled from 'styled-components';
import { colors } from '../../styled/Colors';

export const AboutStyled = styled.div`
	background-color: ${colors.lightskyblue};
`;

export const SubContainer = styled.div`
	background-color: ${colors.lightskyblue};
`;

export const AboutImageMain = styled.img`
	src: ${props => props.src};
	alt: ${props => props.alt};
`;

export const AboutImageOurCustomers = styled.img`
	src: ${props => props.src};
	alt: ${props => props.alt};
`;
