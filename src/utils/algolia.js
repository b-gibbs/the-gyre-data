const pageQuery = `{
  allMdx {
    edges {
      node {
        frontmatter {
          description
          title
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
          title,
          description,
        } = node.frontmatter;
        const {
          slug,
        } = node.fields;        

        const base = { slug, title, description };
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
    indexName: 'the-gyre-data',
  },
]

module.exports = queries