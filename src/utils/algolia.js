const pageQuery = `{
  allMdx {
    edges {
      node {
        frontmatter {
          description
          title
          section
          category
        }
        rawBody
        fields {
          slug
        }
      }
    }
  }
}`


const queries = [
  {
    query: pageQuery,
    transformer: ({ data }) =>
      data.allMdx.edges.reduce((records, { node }) => {
        const {
          section,
          category,
          title,
          description,
        } = node.frontmatter;
        const {
          slug,
        } = node.fields;        

        const base = { slug, section, category, title, description };
        const chunks = node.rawBody.split('\n\n');

        return [
          ...records,
          ...chunks.map((text, index) => ({
            ...base,
            objectID: `${slug}-${index}`,
            text,
          })),
        ];
      },
        []),
    indexName: 'the-gyre-product',
  },
]

module.exports = queries