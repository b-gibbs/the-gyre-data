import styled from '@emotion/styled';
import { colors } from 'gatsby-theme-apollo-core';
import { rgba, lighten, darken } from '../../../node_modules/polished/lib/index';

const borderColor = colors.secondary;
const headerFill = lighten(0.2, colors.secondary);
const headerText = darken(0.2, colors.secondary);
const bodyFill = rgba(colors.secondary, 0.2);

const DefinitionBox = styled('div')({
  border: '2px solid',
  borderColor: borderColor,
  borderRadius: '5px',
  margin: '1em 0',
});

const Header = styled('div')({
  borderBottom: '1px solid',
  borderColor: borderColor,
  background: headerFill,
});

const HeaderText = styled('p')({
  fontFamily: "'Times New Roman'",
  fontStyle: 'italic',
  fontWeight: 600,
  color: headerText,
  margin: '0 0 0 1em',
})

const Inner = styled('div')({
  padding: '1em',
  color: colors.text1,
  background: bodyFill,
});

export const Definition = ({ children }) => (
  <DefinitionBox>
    <Header>
      <HeaderText>Definitions</HeaderText>
    </Header>
    <Inner>
      { children }
    </Inner>
  </DefinitionBox>
) 