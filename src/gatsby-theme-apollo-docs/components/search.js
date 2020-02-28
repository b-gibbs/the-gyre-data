import React, { Fragment, useState } from 'react';
import styled from '@emotion/styled';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  connectSearchBox,
  Index,
  Hits,
  Highlight,
  Configure,
} from 'react-instantsearch-dom';
import { position, transparentize } from 'polished';
import { colors, smallCaps, breakpoints } from 'gatsby-theme-apollo-core';
require('dotenv').config();


const client = algoliasearch(
  process.env.GATSBY_ALGOLIA_APP_ID,
  process.env.GATSBY_ALGOLIA_API_KEY
);

const borderRadius = 5;
const border = `1px solid ${colors.text3}`;

const boxShadowColor = transparentize(0.9, 'black');
export const boxShadow = `${boxShadowColor} 0 2px 12px`;

const SearchArea = styled('div')({
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
}));

const Link = styled('a')({
  fontSize: '0.75rem',
  textDecoration: 'none',
});

const StyledHR = styled('hr')({
  borderColor: colors.divider,
  margin: '0 1rem',
  padding: 0,
});

const SearchBox = ({ currentRefinement, refine, setActive }) => (
  <form noValidate action="" role="search">
    <StyledInput
      type="search"
      id="input"
      placeholder="Search Data ∩ Product"
      value={currentRefinement}
      autoComplete='off'
      onFocus={e => {
        if (currentRefinement !== '') {
          setActive(true);
        } else {
          setActive(false)
        }
      }}
      onBlur={() => {
        if (currentRefinement === '') {
          setActive(false);
        }
      }}
      onChange={e => {
        refine(e.currentTarget.value);
        if (e.currentTarget.value === '') {
          setActive(false)
        } else {
          setActive(true)
        }
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
          <SearchArea>
          <CustomSearchBox setActive={setActive} />
          <ResultsContainer visible={active}>
            <Index indexName="the-gyre">
              <Configure hitsPerPage={1} />
              <Hits hitComponent={Hit} />
            </Index>

            <Index indexName="the-gyre-product">
              <Configure hitsPerPage={1} />
              <Hits hitComponent={Hit} />
            </Index>

            <Index indexName="the-gyre-data">
              <Configure hitsPerPage={1} />
              <Hits hitComponent={Hit} />
            </Index>
          </ResultsContainer>
          </SearchArea>
      </InstantSearch>
    </Fragment>
  )
};


const ResultsContainer = styled('div')(props => ({
  visibility: props.visible ? 'visible' : 'hidden',
  opacity: props.visible ? 1 : 0,
  backgroundColor: 'white',
  maxHeight: '85vh',
  overflow: 'scroll',
  position: 'absolute',
  top: '64px',
  width: '100%',
  borderRadius: '5px',
  color: colors.text2,
  zIndex: 1,
  'mark': {
    color: colors.secondary,
    background: 'transparent',
  },

  [breakpoints.md]: {
    marginRight: 0,
  },
  ".ais-Hits": {
    color: colors.primaryLight,
  },
  ".ais-Hits-list": {
    listStyle: 'none',
    textDecoration: 'none',
    margin: '0 auto',
  },
  '.ais-Hits-item': {
    margin: '0 auto 0 12px',
    height: '100%',
    color: colors.text1,
    textDecoration: 'none',
    backgroundColor: 'transparent',
    transitionProperty: 'color, background-color',
    transitionDuration: '150ms',
    transitionTimingFunction: 'ease-in-out',
    '@media (hover: hover)': {
      ':hover': {
        color: 'white',
        backgroundColor: colors.highlight3,
        borderRadius: 4,
      },
    },
  },
  '.hit-category': {
    marginTop: 0,
    marginBottom: 2,
    headerBottom: 0,
    marginLeft: 10,
    fontSize: 14,
    color: colors.text2,
    ...smallCaps,
  },
  '.hit-section': {
    marginTop: 0,
    marginBottom: 2,
    marginLeft: 10,
    fontSize: 18,
    color: colors.text1,
    textTransform: 'capitalize',
  },
  '.hit-title': {
    marginTop: 0,
    marginBottom: 0,
    headerBottom: 0,
    marginLeft: 10,
    fontSize: 16,
    color: colors.text2,
  },
  '.hit-description': {
    marginTop: 0,
    marginBottom: 10,
    headerBottom: 0,
    marginLeft: 10,
    fontSize: 14,
    color: colors.text3,
  },
}));

function Hit(props) {
  return (
    <div key={props.hit.objectID}>
      <Link href={`https://thegyre.io/${props.hit.path}`}>
        <div className="hit-category">
          <Highlight attribute="category" hit={props.hit} tagName='mark' />
        </div>
        <div className='hit-section'>
          <Highlight attribute="section" hit={props.hit} tagName='mark' />
        </div>
        <div className="hit-title">
          <Highlight attribute="title" hit={props.hit} tagName='mark' />
        </div>
        <div className="hit-description">
          <Highlight attribute="description" hit={props.hit} tagName='mark' />
        </div>
        <StyledHR />
      </Link>
    </div>
  );
}
