# use-temporary-disclosure

## Introduction

use-temporary-disclosure is a React hook that provides an easy way to manage the visibility of UI elements for a specific duration. It's perfect for temporary notifications, tooltips, or any component that should appear for a limited time. The hook offers simple yet powerful functions to show and hide elements with timing control and callback functionalities.

## Installation

To install the package, run the following command in your project directory:

```bash
npm install use-temporary-disclosure
```

## Example use

Here's a basic example of how to use use-temporary-disclosure in your React component to **display a notification component for 5000ms**.

```jsx
import useTemporaryDisclosure from 'use-temporary-disclosure';

const DemoComponent = () => {
	const { isOpen, openFor } = useTemporaryDisclosure();

	const handleShowNotification = () => {
		openFor({
			duration: 3000,
			callback: () => alert('Notification closes now'),
		});
	};

	return (
		<div
			style={{
				width: '100vw',
				height: '100vh',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}
		>
			<button onClick={handleShowNotification} style={{ cursor: 'pointer' }}>
				Show Notification
			</button>

			{isOpen && <div style={{ color: 'green' }}>Notification content.</div>}
		</div>
	);
};

export default DemoComponent;
```

## API Reference

useTemporaryDisclosure returns an object with the following properties

```typescript
const { openFor, isOpen, openIn, closeIn } = useTemporaryDisclosure();
```

### For easy use

**openFor(opts: TemporaryDisclosureFunctionOpts)**: void
Sets the state to open, then automatically closes it after a specified duration and executes a callback function.

**isOpen**: boolean
Indicates the current open state.

### If you want fine grain control

**openIn(opts: TemporaryDisclosureFunctionOpts)**: void
Sets the state to open after a delay and executes a callback function.

**closeIn(opts: TemporaryDisclosureFunctionOpts)**: void
Sets the state to closed after a delay and executes a callback function.

**TemporaryDisclosureFunctionOpts** take an optional **duration** in milliseconds and optional **callback**.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contribute

Feel free to suggest improvements or submit a PR!

### Gotchas if you run this locally

Given you have a create-react-app on the side to test the package locally:

- Use the same React versions, in order to do this you should link or import `react` and `react-dom` from use-temporary-disclosure.

example : `npm install ../../path-to/use-temporary-disclosure/node_modules/react`
