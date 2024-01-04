import { useState } from 'react';

/**
 *
 * Handles setting a flag, visibility or boolean value for a UI element.
 * This hook allows to specify a time delay before setting its state.
 *
 * Suggested to rename these in context
 *
 * usage
 * ```typescript
 * Show a message when a save is successful
 * const { isOpen:justSaved, openFor:showSavedFor } = useTemporaryState();
 *
 * return <div>{justSaved && <p>saved!</p>}</div>
 * ```
 */
export type TemporaryDisclosureFunctionOpts = {
	/**
	 * The delay to apply before opening or closing
	 * @optional
	 * @default 0
	 */
	t?: number;
	/**
	 * Callback to run after the delay and the action is complete
	 * @optional
	 * @returns
	 */
	callBack?: () => void;
};

export type UseTemporaryDisclosureProps = () => {
	/**
	 * Current boolean state
	 */
	isOpen: boolean;
	/**
	 * Sets state to open after delay and calls back
	 */
	openIn: (opts: TemporaryDisclosureFunctionOpts) => void;
	/**
	 * Sets state to closed after delay and calls back
	 */
	closeIn: (opts: TemporaryDisclosureFunctionOpts) => void;
	/**
	 * Sets state to open, sets it to close after delay and calls back
	 */
	openFor: (opts: TemporaryDisclosureFunctionOpts) => void;
};

const useTemporaryDisclosure: UseTemporaryDisclosureProps = () => {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const openFor = (opts: TemporaryDisclosureFunctionOpts) => {
		setIsOpen(true);

		setTimeout(() => {
			setIsOpen(false);
			opts.callBack && opts.callBack();
		}, opts.t || 0);
	};

	const openIn = (opts: TemporaryDisclosureFunctionOpts) => action(true, opts);
	const closeIn = (opts: TemporaryDisclosureFunctionOpts) =>
		action(false, opts);

	const action = (
		nextState: boolean,
		opts: TemporaryDisclosureFunctionOpts
	) => {
		setTimeout(() => {
			setIsOpen(nextState), opts.callBack && opts.callBack();
		}, opts.t || 0);
	};

	return {
		isOpen,
		open,
		openIn,
		closeIn,
		openFor,
	};
};

export default useTemporaryDisclosure;
