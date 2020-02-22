import PropTypes from 'prop-types';
import React from 'react';
import {Helmet} from 'react-helmet';

export default function SEO(props) {
  const {title, description, siteName, twitterCard, children, favicon} = props;
  return (
    <Helmet>
      <title>{title}</title>
      <meta property="og:title" content={title} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:description" content={description} />
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <link rel="icon" href={favicon} />
      {/* Favicon stuff from realfavicongenerator.net */}
      <meta name="apple-mobile-web-app-title" content="thegyre.io" />
      <meta name="application-name" content="thegyre.io" />
      <link rel="icon" href="https://thegyre.io/favicon.ico" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="msapplication-TileColor" content="#da532c" />
      <meta name="theme-color" content="#ffffff" />
      {children}
    </Helmet>
  );
}

SEO.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  siteName: PropTypes.string.isRequired,
  twitterCard: PropTypes.string,
  children: PropTypes.node,
  favicon: PropTypes.string
};

SEO.defaultProps = {
  twitterCard: 'summary',
  favicon: 'https://thegyre.io/favicon.ico'
};
