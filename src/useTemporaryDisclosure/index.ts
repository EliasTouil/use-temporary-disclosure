import { useState } from 'react';

/**
 *
 * Handles setting a flag, visibility or boolean value for a UI element.
 * This hook allows to specify a duration for the flag.
 *
 * @note
 * For more fine grained control you can also use openIn and closeIn with appropriate delays and callback.
 *
 *
 * @usage
 * Show a message to confirm something was saved
 *
 * ```typescript
 *
 * const { openFor } = useTemporaryState();
 *
 * const handleSave = () => {
 * 	... your db logic
 *
 * 	openFor({duration: 3000})
 * }
 *
 * return (
 * 		<div>
 * 		<Button onClick={handleSave}> Save </Button>
 * 		{justSaved && <Toast>Saved!</Toast>}
 * 		</div>
 * )
 * ```
 */
export type TemporaryDisclosureFunctionOpts = {
	/**
	 * The delay or duration to apply in milliseconds
	 * @optional
	 * @default 0
	 */
	duration?: number;

	/**
	 * Callback to run after the delay and the action is complete
	 * @optional
	 */
	callback?: () => void;
};

export type UseTemporaryDisclosureObj = {
	/**
	 * Current boolean state
	 */
	isOpen: boolean;
	/**
	 * Sets state to open after delay and calls back
	 *
	 * @usage
	 * openIn({t: 3000, callback: ()=>console.log("opened")})
	 */
	openIn: (opts: TemporaryDisclosureFunctionOpts) => void;
	/**
	 * Sets state to closed after delay and calls back
	 *
	 * @usage
	 * closeIn({t: 3000, callback: ()=>console.log("closed")})
	 */
	closeIn: (opts: TemporaryDisclosureFunctionOpts) => void;
	/**
	 * Sets state to open, sets it to close after delay and calls back
	 *
	 * @usage
	 * openFor({t: 5000, callback: ()=>console.log("UI was displayed for 5000ms")})
	 */
	openFor: (opts: TemporaryDisclosureFunctionOpts) => void;
};

const useTemporaryDisclosure = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const openFor = (opts: TemporaryDisclosureFunctionOpts) => {
		setIsOpen(true);

		setTimeout(() => {
			setIsOpen(false);
			opts.callback && opts.callback();
		}, opts.duration || 0);
	};

	const action = (
		nextState: boolean,
		opts: TemporaryDisclosureFunctionOpts
	) => {
		setTimeout(() => {
			setIsOpen(nextState), opts.callback && opts.callback();
		}, opts.duration || 0);
	};

	const openIn = (opts: TemporaryDisclosureFunctionOpts) => action(true, opts);
	const closeIn = (opts: TemporaryDisclosureFunctionOpts) =>
		action(false, opts);

	return {
		isOpen,
		openIn,
		closeIn,
		openFor,
	} as UseTemporaryDisclosureObj;
};

export default useTemporaryDisclosure;
