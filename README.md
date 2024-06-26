# Tree Render


## About
This project is a React-based web application that features an advanced tree rendering component, designed to efficiently display hierarchical data.

It utilizes a virtual list technique to optimize rendering performance by only rendering visible items in the viewport, thus handling large datasets with minimal performance impact.

To further enhance performance and ensure a smooth user experience, the project employs a web worker for heavy processing tasks, such as sorting and filtering the tree data. This approach offloads intensive computations from the main thread, preventing UI freezes and improving responsiveness.

The tree component dynamically loads and displays assets and locations, supporting interactive filtering based on search criteria, type, and status, facilitated by services and stores for data management and state handling.

## Preview
You can acces the app using this [link](https://tree-render.vercel.app/)

<video src="./.github/app-preview.mp4" ></video>

## Future improvements
- Render child nodes dinamically, only when their branch is opened
- Improve the UI during load time and before a company is selected
- Fix test for webworker