import React from "react";
import renderer from "react-test-renderer";
import App from "./components/App.jsx";

test("renders learn react link", () => {
	const tree = renderer.create(<App />).toJSON();
	expect(tree).toMatchSnapshot();
});
