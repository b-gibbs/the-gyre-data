import PropTypes from 'prop-types';
import React, {useRef, useState} from 'react';
import SectionNav from 'gatsby-theme-apollo-docs/src/components/section-nav';
import styled from '@emotion/styled';
import useMount from 'react-use/lib/useMount';
import { HEADER_HEIGHT } from 'gatsby-theme-apollo-docs/src/utils';
import {PageNav, breakpoints, colors} from 'gatsby-theme-apollo-core';
import { ReactComponent as SpectrumLogo } from 'gatsby-theme-apollo-docs/src/assets/spectrum.svg';
import {withPrefix} from 'gatsby';

const Wrapper = styled.div({
  display: 'flex',
  alignItems: 'flex-start'
});

const InnerWrapper = styled.div({
  flexGrow: 1,
  width: 0
});

const BodyContent = styled.div({
  // style all anchors with an href and no prior classes
  // this helps avoid anchors with names and styled buttons
  'a[href]:not([class])': {
    color: colors.primary,
    textDecoration: 'none',
    ':hover': {
      textDecoration: 'underline'
    },
    code: {
      color: 'inherit'
    }
  },
  [['h1', 'h2', 'h3', 'h4', 'h5', 'h6']]: {
    ':not(:hover) a svg': {
      visibility: 'hidden'
    },
    code: {
      whiteSpace: 'normal'
    },
    'a.anchor': {
      ':hover': {
        opacity: colors.hoverOpacity
      },
      svg: {
        fill: colors.primary
      },
      '&.before': {
        top: 'auto'
      }
    }
  },
  [['h2', 'h3', 'h4']]: {
    ':not(:first-child)': {
      marginTop: 56
    }
  },
  img: {
    display: 'block',
    maxWidth: '100%',
    margin: '0 auto'
  },
  '.jargon-term': {
    textDecoration: 'underline',
    color: colors.secondary,
    fontStyle: 'normal',
    ':hover': {
      cursor: 'help',
      position: 'relative',

      '.jargon-info': {
        display: 'block',
        position: 'absolute',
        top: '1.5em',
        left: 0,
        background: '#1d1e1d',
        border: '1px solid #ccc',
        color: '#ccc',
        padding: '0.5rem',
        borderRadius: '6px',
        fontSize: '80%',
        minWidth: '200px',
        maxWidth: '450px',
        zIndex: 1,
        'b': {
          color: '#9cdcfe',
        }
      },
    },

    '.jargon-info': {
      display: 'none',
    }
  }
});

const Aside = styled.aside({
  display: 'flex',
  flexDirection: 'column',
  flexShrink: 0,
  width: 240,
  maxHeight: `calc(100vh - ${HEADER_HEIGHT}px)`,
  marginTop: -36,
  padding: '40px 0',
  marginLeft: 40,
  position: 'sticky',
  top: HEADER_HEIGHT,
  [breakpoints.lg]: {
    display: 'none'
  },
  [breakpoints.md]: {
    display: 'block'
  },
  [breakpoints.sm]: {
    display: 'none'
  }
});

const AsideHeading = styled.h4({
  fontWeight: 600
});

const AsideLinkWrapper = styled.h5({
  display: 'flex',
  marginBottom: 0,
  ':not(:last-child)': {
    marginBottom: 16
  }
});

const AsideLinkInner = styled.a({
  display: 'flex',
  alignItems: 'center',
  color: colors.text2,
  textDecoration: 'none',
  ':hover': {
    color: colors.text3
  },
  svg: {
    width: 20,
    height: 20,
    marginRight: 6,
    fill: 'currentColor'
  }
});

function AsideLink(props) {
  return (
    <AsideLinkWrapper>
      <AsideLinkInner target="_blank" rel="noopener noreferrer" {...props} />
    </AsideLinkWrapper>
  );
}


export default function PageContent(props) {
  const contentRef = useRef(null);
  const [imagesToLoad, setImagesToLoad] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(0);

  useMount(() => {
    if (props.hash) {
      // turn numbers at the beginning of the hash to unicode
      // see https://stackoverflow.com/a/20306237/8190832
      const hash = props.hash.toLowerCase().replace(/^#(\d)/, '#\\3$1 ');
      try {
        const hashElement = contentRef.current.querySelector(hash);
        if (hashElement) {
          hashElement.scrollIntoView();
        }
      } catch (error) {
        // let errors pass
      }
    }

    let toLoad = 0;
    const images = contentRef.current.querySelectorAll('img');
    images.forEach(image => {
      if (!image.complete) {
        image.addEventListener('load', handleImageLoad);
        toLoad++;
      }
    });

    setImagesToLoad(toLoad);
  });

  function handleImageLoad() {
    setImagesLoaded(prevImagesLoaded => prevImagesLoaded + 1);
  }

  const pageIndex = props.pages.findIndex(page => {
    const prefixedPath = withPrefix(page.path);
    return (
      prefixedPath === props.pathname ||
      prefixedPath.replace(/\/$/, '') === props.pathname
    );
  });


  return (
    <Wrapper>
      <InnerWrapper>
        <BodyContent ref={contentRef} className="content-wrapper">
          {props.children}
        </BodyContent>
        <PageNav
          prevPage={props.pages[pageIndex - 1]}
          nextPage={props.pages[pageIndex + 1]}
        />
      </InnerWrapper>
      <Aside>
        <AsideHeading>{props.title}</AsideHeading>
        {props.headings.length > 0 && (
          <SectionNav
            headings={props.headings}
            contentRef={contentRef}
            imagesLoaded={imagesLoaded === imagesToLoad}
          />
        )}
        {props.spectrumUrl && (
          <AsideLink href={props.spectrumUrl}>
            <SpectrumLogo /> Discuss on Spectrum
          </AsideLink>
        )}
      </Aside>
    </Wrapper>
  );
}

PageContent.propTypes = {
  children: PropTypes.node.isRequired,
  pathname: PropTypes.string.isRequired,
  pages: PropTypes.array.isRequired,
  hash: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  headings: PropTypes.array.isRequired,
  spectrumUrl: PropTypes.string
};
