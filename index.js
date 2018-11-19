const plugin = ({ types: t }) => {
  const replaceElement = path => {
    const { name } = path.node.openingElement.name

    if(name === 'path') {
      // Gets the element id
      const { value } = path.get('openingElement.attributes.0').node.value

      const fill = path.get('openingElement.attributes.2')

      if (fill) {
        // Replaces fill with id value
        fill.replaceWith(t.jsxAttribute(
          t.jsxIdentifier('fill'),
          t.StringLiteral(value),
        ))
      }
    }

    // Remove id
    path.get('openingElement.attributes.0').remove()
  }

  const svgElementVisitor = {
    JSXElement(path, state) {
      if (!path.get('openingElement.name').isJSXIdentifier({ name: 'svg' })) {
        return
      }

      replaceElement(path, state)
      path.traverse(jsxElementVisitor, state)
    },
  }

  const jsxElementVisitor = {
    JSXElement(path, state) {
      replaceElement(path, state)
    },
  }

  return {
    visitor: {
      Program(path, state) {
        path.traverse(svgElementVisitor, state)
      },
    },
  }
}

module.exports = plugin