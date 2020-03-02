import styled from '@emotion/styled';
import { colors } from 'gatsby-theme-apollo-core';
import { rgba, lighten, darken } from '../../../node_modules/polished/lib/index';

const borderColor = darken(0.2, colors.primaryLight);
const headerFill = colors.primaryLight;
const headerText = darken(0.4, colors.primaryLight);
const bodyFill = rgba(colors.primaryLight, 0.2);

const NoteBox = styled('div')({
  border: '2px solid',
  borderColor: borderColor,
  borderRadius: '6px',
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
  fontFamily: "'Source Sans Pro', sans-serif",
  fontSize: '16px',
});

export const Note = ({ children }) => (
  <NoteBox>
    <Header>
      <HeaderText>Note</HeaderText>
    </Header>
    <Inner>
      { children }
    </Inner>
  </NoteBox>
) 