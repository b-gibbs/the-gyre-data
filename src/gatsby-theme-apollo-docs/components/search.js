import React, { Fragment, useState } from 'react';
import styled from '@emotion/styled';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  connectSearchBox,
  connectHits,
  Highlight,
} from 'react-instantsearch-dom';
import { colors } from 'gatsby-theme-apollo-core';
import {position, transparentize} from 'polished';
require('dotenv').config();


const client = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_API_KEY
);

const borderRadius = 5;
const border = `1px solid ${colors.text3}`;

const boxShadowColor = transparentize(0.9, 'black');
export const boxShadow = `${boxShadowColor} 0 2px 12px`;
const Container = styled.div({
  flexGrow: 1,
  marginRight: 40,
  color: colors.text2,
  position: 'relative',
  
  zIndex: 1,
  maxHeight: '80vh',
});

const Overlay = styled.div(
  position('fixed', 0),
  props =>
    !props.visible && {
      opacity: 0,
      visibility: 'hidden'
    },
  {
    backgroundColor: transparentize(0.5, colors.text2),
    transitionProperty: 'opacity, visibility',
    transitionDuration: '150ms',
    transitionTimingFunction: 'ease-in-out',
    zIndex: 1
  }
);

const StyledInput = styled.input(props => ({
  width: '100%',
  height: 42,
  padding: 0,
  paddingLeft: 16,
  border,
  borderRadius,
  fontSize: 16,
  background: 'white',
  outline: 'none',
  appearance: 'none',
  boxShadow: props.resultsShown ? boxShadow : 'none',
}))

const HitListContainer = styled.div(
  props =>
    !props.visible && {
      opacity: 0,
      visibility: 'hidden'
    },
  {
    backgroundColor: 'white',
    maxHeight: '85vh',
    overflow: 'scroll',
    position: 'absolute',
    top: '64px',
    width: '100%',
    borderRadius: '5px',
  }
);

const List = styled('ul')({
  listStyle: 'none',
  margin: '0 auto',
  maxWidth: '95%',
  padding: 0,
});

const Result = styled('li')({
  padding: 0,
  margin: 0,
  height: '100%',
  borderRadius: 4,
  color: colors.text1,
  textDecoration: 'none',
  
  transitionProperty: 'color, background-color',
  transitionDuration: '150ms',
  transitionTimingFunction: 'ease-in-out',
  '@media (hover: hover)': {
    ':hover': {
      color: 'white',
      backgroundColor: colors.highlight3,
    }
  }
});

const Link = styled('a')({
  fontSize: '0.75rem',
  textDecoration: 'none',
});

const ResultWrapper = styled('div')({
  textDecoration: 'none',
  'mark': {
    color: colors.secondary,
    backgroundColor: 'transparent',
  }
});

const Description = styled('p')({
  paddingLeft: '1rem',
  color: colors.text3,
})

const Heading = styled('h2')({
  fontSize: '1.25rem',
  fontWeight: 500,
  paddingTop: '1rem',
  paddingLeft: '1rem',
  color: colors.text1,

  a: {
    textDecoration: 'none',
    color: colors.text1,
  },
});

const StyledHR = styled('hr')({
  borderColor: colors.divider,
  margin: '0 1rem',
  padding: 0,
});

const Hits = connectHits(({ hits }) => (
  <List>
    {hits.map(hit => (
      <Result key={hit.objectID}>
        <Link href={`https://thegyre.io/${hit.slug}`}>
          <ResultWrapper> 
            <Heading>
                <Highlight attribute="title" hit={hit} tagName="mark" />
            </Heading>
            <Description>
              <Highlight attribute="description" hit={hit} tagName="mark" />
            </Description>
            
          </ResultWrapper>
        </Link>
        <StyledHR />
      </Result>
    ))}
  </List>
));



const SearchBox = ({ currentRefinement, refine, setActive }) => (
  <form noValidate action="" role="search">
    <StyledInput
      type="search"
      id="input"
      placeholder="Search Data ∩ Product"
      value={currentRefinement}
      onBlur={() => {
        if (currentRefinement === '') {
          setActive(false);
        }
      }}
      onChange={event => {
        refine(event.currentTarget.value);
        if (currentRefinement === '') {
          setActive(false);
        } else {
          setActive(true)
        };
        
      }}
    />
  </form>
)

const CustomSearchBox = connectSearchBox(SearchBox)


export default () => {
  const [active, setActive] = useState(false);

  return (
    <Fragment>
      <InstantSearch searchClient={client} indexName="the-gyre-data">
        <Overlay visible={active} />
          <Container>
          <CustomSearchBox
            setActive={setActive} />
            <HitListContainer visible={active}>
              <Hits />
            </HitListContainer>
            
          </Container>
        
      </InstantSearch>
    </Fragment>
  )
};
