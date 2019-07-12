const svgElements = {
  path: "Path",
  g: "G",
  rect: "Rect",
  circle: "Circle",
  ellipse: "Ellipse",
  text: "Text",
  defs: "Defs",
  clipPath: "ClipPath",
  polygon: "Polygon",
  polyline: "Polyline",
  line: "Line"
};

const getElementId = path => {
  const id = path
    .get("openingElement.attributes")
    .find(node => node.get("name").node.name === "id");

  if (id) return id.node.value;

  return {};
};

const removeElementId = path => {
  if (!(path.get("openingElement.attributes").length === 0)) {
    path
      .get("openingElement.attributes")
      .find(node => (node.name = "id"))
      .remove();
  }
};

const plugin = ({ types: t }) => {
  const replaceElement = path => {
    const { name } = path.node.openingElement.name;

    if (name === "svg") {
      path.replaceWith(
        t.jsxElement(
          t.jsxOpeningElement(t.jsxIdentifier("Fragment"), []),
          t.jsxClosingElement(t.jsxIdentifier("Fragment")),
          path.get("openingElement").parent.children || []
        )
      );
    }

    if (Object.keys(svgElements).includes(name)) {
      path
        .get("openingElement.name")
        .replaceWith(t.jsxIdentifier(svgElements[name]));

      if (path.node.closingElement !== null) {
        path
          .get("closingElement.name")
          .replaceWith(t.jsxIdentifier(svgElements[name]));
      }
    }

    if (name === "path") {
      // Gets the element id
      const { value } = getElementId(path);

      const fill = path
        .get("openingElement.attributes")
        .find(node => node.get("name").node.name === "fill");

      if (fill && value) {
        // Replaces fill with id value
        fill.replaceWith(
          t.jsxAttribute(t.jsxIdentifier("fill"), t.StringLiteral(value))
        );

        // Remove id
        removeElementId(path);
      }
    } else {
      removeElementId(path);
    }
  };

  const svgElementVisitor = {
    JSXElement(path, state) {
      if (!path.get("openingElement.name").isJSXIdentifier({ name: "svg" })) {
        return;
      }

      replaceElement(path, state);
      path.traverse(jsxElementVisitor, state);
    }
  };

  const jsxElementVisitor = {
    JSXElement(path, state) {
      replaceElement(path, state);
    }
  };

  return {
    visitor: {
      Program(path, state) {
        path.traverse(svgElementVisitor, state);
      }
    }
  };
};

module.exports = plugin;
