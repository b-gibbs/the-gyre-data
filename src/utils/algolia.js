const pageQuery = `{
  allMdx {
    edges {
      node {
        frontmatter {
          description
          title
          section
          category
          path
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
          path,
        } = node.frontmatter;
        const {
          slug,
        } = node.fields;        

        const base = { slug, section, category, title, path, description };
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