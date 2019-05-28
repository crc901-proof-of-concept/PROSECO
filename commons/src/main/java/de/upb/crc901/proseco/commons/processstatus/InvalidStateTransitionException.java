package de.upb.crc901.proseco.commons.processstatus;

/**
 * Notifies that there was an attempt to transition to an invalid state
 *
 * @author kadirayk
 *
 */
public class InvalidStateTransitionException extends Exception {
	/**
	 *
	 */
	private static final long serialVersionUID = 4385610322796895379L;

	/**
	 * Default constructor
	 */
	public InvalidStateTransitionException() {
		super();
	}

	/**
	 * Constructor with message
	 * 
	 * @param msg
	 */
	public InvalidStateTransitionException(final String msg) {
		super(msg);
	}

}
